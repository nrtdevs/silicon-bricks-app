import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import CustomHeader from '@/components/CustomHeader';
import { ThemedView } from '@/components/ThemedView';
import { ms, ScaledSheet } from 'react-native-size-matters';
import { ThemedText } from '@/components/ThemedText';

const DynamicPage = () => {
  const { data } = useLocalSearchParams();
  const pageData = JSON.parse(data as string);
  const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };
  // <ThemedText>{stripHtmlTags(pageData?.content || '')}</ThemedText>
  const processContent = (html: string) => {
    const plainText = html.replace(/<[^>]*>/g, '');
    return plainText.split('🔹').filter(Boolean);
  };

  return (
    <CustomHeader>
      <ThemedView style={styles.contentContainer}>
        <View style={{width: '100%', alignItems: 'center', marginBottom: ms(20)}}>
          <ThemedText type='title' style={{}}>{pageData?.slug}</ThemedText>
          <ThemedText type='subtitle' style={{}}>{pageData?.description}</ThemedText>
        </View>
        {processContent(pageData?.content || '').map((line, index) => (
          <ThemedText key={index}>{index === 0 ? line.trim() : '🔹 ' + line.trim()}</ThemedText>
        ))}
      </ThemedView>
    </CustomHeader>
  )
}

const styles = ScaledSheet.create({
  contentContainer: {
    flex: 1,
    padding: "12@ms",
  },
})

export default DynamicPage