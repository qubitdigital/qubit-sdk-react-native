require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "qubit-sdk-react-native"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  qubit-sdk-react-native
                   DESC
  s.homepage     = "https://github.com/qubitdigital/qubit-sdk-react-native"
  s.license      = "MIT"
  s.authors      = { "Qubit" => "info@qubit.com" }
  s.platforms    = { :ios => "9.0", :tvos => "10.0" }
  s.source       = { :git => "git@github.com:qubitdigital/qubit-sdk-react-native.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,swift}"
  s.requires_arc = true

  s.dependency "React"
  s.dependency "QubitSDK", "~> 2.0.3"
  s.swift_versions = ['4.0', '4.1', '4.2', '5.0', '5.1', '5.2', '5.3']
end
