npm install

react-native link

react-native run-ios/android

If you can not install because of netowrk exception try this
export _JAVA_OPTIONS=-Djava.net.preferIPv4Stack=true

cd android && ./gradlew clean && cd .. && react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res && cd android && ./gradlew assembleRelease