import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const SkeletonLoader = () => {
  const shineValue = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    const startShineAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shineValue, {
            toValue: 200,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(shineValue, {
            toValue: -100,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    startShineAnimation();
  }, [shineValue]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.profileImage}>
          <Animated.View
            style={[styles.shine, { transform: [{ translateX: shineValue }] }]}
          />
        </View>
        <View style={styles.bottomGridContainer}>
            <View style={styles.horizontalGrid} />
            <Animated.View
                style={[styles.shine, { transform: [{ translateX: shineValue }] }, styles.horizontalGridShine]}
            />
            
        </View>
        
        <View style={styles.bottomGridContainer}>
          <View style={styles.bottomGrid} />
          <View style={styles.bottomGrid} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: 355,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#dddddd',
    marginBottom: 10,
    position: 'relative',
  },
  horizontalGrid: {
    width: '100%',
    height: 140,
    backgroundColor: '#dddddd',
    marginBottom: 10,
  },
  horizontalGridShine: {
    width: '100%',
    height: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 10,
  },
  bottomGridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomGrid: {
    width: '48%',
    height: 10,
    backgroundColor: '#dddddd',
  },
  shine: {
    position: 'absolute',
    left: -100,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default SkeletonLoader;
