package com.qubit.reactnative.sdk;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.qubit.android.sdk.api.QubitSDK;
import com.qubit.android.sdk.api.logging.QBLogLevel;
import com.qubit.android.sdk.api.placement.PlacementMode;
import com.qubit.android.sdk.api.placement.PlacementPreviewOptions;
import com.qubit.android.sdk.api.tracker.event.QBEvent;
import com.qubit.android.sdk.api.tracker.event.QBEvents;
import com.qubit.android.sdk.internal.experience.Experience;
import com.qubit.android.sdk.internal.experience.callback.ExperienceCallbackConnector;
import com.qubit.android.sdk.internal.experience.callback.ExperienceCallbackConnectorImpl;
import com.qubit.android.sdk.internal.experience.model.ExperiencePayload;
import com.qubit.android.sdk.internal.lookup.LookupData;

import java.util.ArrayList;
import java.util.List;

import androidx.annotation.NonNull;


public class QubitSDKModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;
  private Gson gson;

  public QubitSDKModule(@NonNull ReactApplicationContext reactContext) {
    super(reactContext);
    QubitSDKModule.reactContext = reactContext;
  }


  @NonNull
  @Override
  public String getName() {
    return "QubitSDK";
  }

  @ReactMethod
  public void init(String trackingId, String logLevel) {
    QBLogLevel qbLogLevel = parseLogLevel(logLevel);
    try {
      QubitSDK.initialization()
          .inAppContext(reactContext)
          .withTrackingId(trackingId)
          .withLogLevel(qbLogLevel)
          .start();
    } catch (Exception e) {
      Log.w("Bridge", "Exception occurred during sdk initialization: " + e.getMessage());
    }
  }

  @ReactMethod
  public void sendEvent(String eventType, ReadableMap eventBody) {
    QBEvent event = QBEvents.fromMap(eventType, eventBody.toHashMap());
    // TODO Temporary logging. Remove it.
    Log.d("Bridge", "EventType: " + event.getType());
    Log.d("Bridge", "EventBody: " + event.toJsonObject());
    QubitSDK.tracker().sendEvent(event);
  }

  @ReactMethod
  public void enableTracker(boolean enable) {
    QubitSDK.tracker().enable(enable);
  }

  @ReactMethod
  public void getTrackingId(Promise trackingIdPromise) {
    try {
      String trackingId = QubitSDK.getTrackingId();
      trackingIdPromise.resolve(trackingId);
    } catch (Exception e) {
      trackingIdPromise.reject("QUBIT_SDK_NOT_INITIALIZED", e);
    }
  }

  @ReactMethod
  public void getDeviceId(Promise trackingIdPromise) {
    try {
      String deviceId = QubitSDK.getDeviceId();
      trackingIdPromise.resolve(deviceId);
    } catch (Exception e) {
      trackingIdPromise.reject("QUBIT_SDK_NOT_INITIALIZED", e);
    }
  }

  @ReactMethod
  public void getLookupData(Promise lookupDataPromise) {
    try {
      LookupData lookupData = QubitSDK.tracker().getLookupData();
      JsonObject jsonObject = (JsonObject) getGson().toJsonTree(lookupData);
      WritableMap writeableMap = WritableMapConverter.convertJsonToMap(jsonObject);
      lookupDataPromise.resolve(writeableMap);
    } catch (Exception e) {
      lookupDataPromise.reject("LOOKUP_DATA_NOT_AVAILABLE_YET", e);
    }
  }

  @ReactMethod
  public void getExperiences(ReadableArray experienceIds,
                             Boolean isVariationSet,
                             Integer variation,
                             Boolean isPreviewSet,
                             Boolean preview,
                             Boolean isIgnoreSegmentsSet,
                             Boolean ignoreSegments,
                             Promise experiencesPromise) {
    List<Integer> experienceIdsInts = new ArrayList<>();
    if (experienceIds != null) {
      for (int i = 0; i < experienceIds.size(); i++) {
        experienceIdsInts.add(experienceIds.getInt(i));
      }
    }

    QubitSDK.tracker().getExperiences(experienceIdsInts,
        experiences -> {
          List<ExperiencePayload> experiencePayloads = new ArrayList<>(experiences.size());
          for (Experience experience : experiences) {
            experiencePayloads.add(experience.getExperiencePayload());
          }
          JsonArray experiencePayloadsJsonArray = (JsonArray) getGson().toJsonTree(experiencePayloads);
          experiencesPromise.resolve(WritableMapConverter.convertJsonToArray(experiencePayloadsJsonArray));
          return null;
        },
        throwable -> {
          experiencesPromise.reject(throwable);
          return null;
        },
        isVariationSet ? variation : null,
        isPreviewSet ? preview : null,
        isIgnoreSegmentsSet ? ignoreSegments : null
    );
  }

  @ReactMethod
  public void experienceShown(String callback) {
    ExperienceCallbackConnector callbackConnector = new ExperienceCallbackConnectorImpl(callback, QubitSDK.getDeviceId());
    callbackConnector.shown();
  }

  @ReactMethod
  public void getPlacement(
      String placementId,
      String mode,
      String attributes,
      String campaignId,
      String experienceId,
      Promise placementPromise
  ) {
    QubitSDK.getPlacement(
        placementId,
        matchMode(mode),
        getAttributesJson(attributes),
        new PlacementPreviewOptions(campaignId, experienceId),
        placement -> {
          WritableMap placementContentMap = WritableMapConverter.convertJsonToMap(placement.getContent());
          placementPromise.resolve(placementContentMap);
          return null;
        },
        throwable -> {
          placementPromise.reject(throwable);
          return null;
        }
    );
  }

  private PlacementMode matchMode(String value) {
    switch (value) {
      case "SAMPLE":
        return PlacementMode.SAMPLE;
      case "PREVIEW":
        return PlacementMode.PREVIEW;
      case "LIVE":
      default:
        return PlacementMode.LIVE;
    }
  }

  private JsonObject getAttributesJson(String attributes) {
    try {
      return new JsonParser().parse(attributes).getAsJsonObject();
    } catch (Exception e) {
      return null;
    }
  }

  private static QBLogLevel defaultLogLevel = QBLogLevel.WARN;

  private QBLogLevel parseLogLevel(String logLevel) {
    if (logLevel == null || logLevel.isEmpty()) {
      return defaultLogLevel;
    }
    for (QBLogLevel level : QBLogLevel.values()) {
      if (level.toString().equalsIgnoreCase(logLevel))
        return level;
    }
    return defaultLogLevel;
  }

  private Gson getGson() {
    if (gson == null) {
      gson = new Gson();
    }
    return gson;
  }

}
