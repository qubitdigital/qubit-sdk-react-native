package com.qubit.reactnative.sdk;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonNull;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import java.math.BigInteger;
import java.util.Map;

public class WritableMapConverter {

  static WritableMap convertJsonToMap(JsonObject jsonObject)  {
    WritableMap map = Arguments.createMap();
    jsonObject.entrySet();

    for (Map.Entry<String, JsonElement> jsonElementEntry : jsonObject.entrySet()) {
      String key = jsonElementEntry.getKey();
      JsonElement value = jsonElementEntry.getValue();
      if (value instanceof JsonObject) {
        map.putMap(key, convertJsonToMap((JsonObject) value));
      } else if (value instanceof JsonArray) {
        map.putArray(key, convertJsonToArray((JsonArray) value));
      } else if (value instanceof JsonPrimitive) {
        JsonPrimitive primitiveValue = (JsonPrimitive) value;
        if (primitiveValue.isBoolean()) {
          map.putBoolean(key, primitiveValue.getAsBoolean());
        } else if (primitiveValue.isString()) {
          map.putString(key, primitiveValue.getAsString());
        } else if (primitiveValue.isNumber()) {
          Number number = primitiveValue.getAsNumber();
          if (number instanceof Integer
              || number instanceof Long
              || number instanceof Short
              || number instanceof BigInteger) {
            map.putInt(key, number.intValue());
          } else {
            map.putDouble(key, number.doubleValue());
          }
        } else {
          map.putString(key, value.getAsString());
        }
      } else if (value instanceof JsonNull) {
        map.putNull(key);
      }
    }

    return map;
  }

  static WritableArray convertJsonToArray(JsonArray jsonArray) {
    WritableArray array = Arguments.createArray();

    for (int i = 0; i < jsonArray.size(); i++) {
      JsonElement value = jsonArray.get(i);
      if (value instanceof JsonObject) {
        array.pushMap(convertJsonToMap((JsonObject) value));
      } else if (value instanceof JsonArray) {
        array.pushArray(convertJsonToArray((JsonArray) value));
      } else if (value instanceof JsonPrimitive) {
        JsonPrimitive primitiveValue = (JsonPrimitive) value;
        if (primitiveValue.isBoolean()) {
          array.pushBoolean(primitiveValue.getAsBoolean());
        } else if (primitiveValue.isString()) {
          array.pushString(primitiveValue.getAsString());
        } else if (primitiveValue.isNumber()) {
          Number number = primitiveValue.getAsNumber();
          if (number instanceof Integer
              || number instanceof Long
              || number instanceof Short
              || number instanceof BigInteger) {
            array.pushInt(number.intValue());
          } else {
            array.pushDouble(number.doubleValue());
          }
        } else {
          array.pushString(value.getAsString());
        }
      } else if (value instanceof JsonNull) {
        array.pushNull();
      }
    }
    return array;
  }
}
