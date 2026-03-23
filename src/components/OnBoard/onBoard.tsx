import React, { useRef, useState, useCallback } from 'react';
import {
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onboardingData } from "@/Data/onboardingData";

const { width, height } = Dimensions.get('window');

type SlideItem = typeof onboardingData[0];

const Slide = ({ item }: { item: SlideItem }) => (
  <View style={{ width }} className="items-center justify-center">
    <Lottie
      source={item.imagePath}
      style={{ height: '70%', width: '100%' }}
      autoPlay
      loop
      resizeMode="contain"
    />
    <View className="px-10">
      <Text className="text-black text-3xl font-bold text-center">{item.title}</Text>
      <Text className="text-black/70 text-base mt-3 text-center leading-6">{item.subtitle}</Text>
    </View>
  </View>
);

const Indicators = ({ currentIndex }: { currentIndex: number }) => (
  <View className="flex-row justify-center items-center h-5">
    {onboardingData.map((_, index) => (
      <View
        key={index}
        className={`h-1.5 mx-1 rounded-full ${
          currentIndex === index ? 'bg-primary w-6' : 'bg-primary/20 w-2'
        }`}
      />
    ))}
  </View>
);

export default function OnBoard() {
  const router = useRouter();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList<SlideItem>>(null);

  const isLastSlide = currentSlideIndex === onboardingData.length - 1;

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);
    setCurrentSlideIndex(index);
  }, []);

  const scrollTo = (index: number) => {
    flatListRef.current?.scrollToOffset({ offset: index * width, animated: true });
  };

  const handleDone = async () => {
    await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
    router.replace('/AuthScreen');
  };

  const currentBackgroundColor = onboardingData[currentSlideIndex]?.backgroundColor || '#ffffff';

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: currentBackgroundColor }}>
      <StatusBar barStyle="dark-content" backgroundColor={currentBackgroundColor} />
      
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <Slide item={item} />}
      />

      <View style={{ height: height * 0.2 }} className="px-6 justify-between pb-10">
        <Indicators currentIndex={currentSlideIndex} />

        <View className="flex-row gap-4">
          {!isLastSlide && (
            <TouchableOpacity 
              onPress={() => scrollTo(onboardingData.length - 1)}
              className="flex-1 h-14 items-center justify-center rounded-2xl border border-primary/60"
            >
              <Text className="font-semibold text-primary">SKIP</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            onPress={isLastSlide ? handleDone : () => scrollTo(currentSlideIndex + 1)}
            activeOpacity={0.8}
            className="flex-1 h-14 bg-primary items-center justify-center rounded-2xl"
          >
            <Text className="font-bold text-white tracking-widest">
              {isLastSlide ? 'GET STARTED' : 'NEXT'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
