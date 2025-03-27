import React, { useEffect, useState } from 'react'
import { SearchBar } from '@rneui/themed'
import { FlatList, Image, Keyboard, View } from 'react-native'
import { Colors } from '@/constants/Colors'
import { Pressable } from 'react-native'
import { ThemedText } from './ThemedText'
import { ms, ScaledSheet } from 'react-native-size-matters'
import { useTheme } from '@/context/ThemeContext'

interface CustomSearchBarProps {
  searchQuery: string
  setSearchQuery?: (search: string) => void
  placeholder: string
  containerStyle?: any
  inputContainerStyle?: any
  loading?: boolean
  suggestionData?: any
  setSuggestionData?: any
  onChangeText: (text: string) => void
  setSearchStore?: (store: any) => void
  onClear?: () => void
  onSubmitEditing?: () => void
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
}

const CustomSearchBar = (props: CustomSearchBarProps) => {
  const { theme } = useTheme()

  const onClear = (item: any) => {
    Keyboard?.dismiss()
    props.setSuggestionData([])
    props.setSearchQuery?.(item?.name)
    props.setSearchStore?.(item)
  }
  // Helper Methods
  const renderItem = (item: any, index: number) => {
    return (
      <Pressable
        onPress={() => onClear(item)}
        style={{
          borderBottomWidth: index == props.suggestionData?.length - 1 ? 0 : 1,
          borderColor: Colors.gray
        }}
      >
        <ThemedText type="default" style={{ paddingVertical: ms(10) }}>
          {item?.name}
          {item?.address ? ', ' + item?.address : ''}
        </ThemedText>
      </Pressable>
    )
  }

  return (
    <View style={{ width: '100%' }}>
      <SearchBar
        onSubmitEditing={props.onSubmitEditing}
        keyboardAppearance="dark"
        keyboardType={props.keyboardType ?? 'default'}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        focusable={true}
        onBlur={() => Keyboard.dismiss()}
        value={props.searchQuery}
        containerStyle={[
          styles.containerStyle,
          { ...props.containerStyle, backgroundColor: Colors[theme].cartBg }
        ]}
        inputContainerStyle={[
          styles.inputContainerStyle,
          props.inputContainerStyle,
          {
            backgroundColor: Colors[theme].cartBg
          }
        ]}
        inputStyle={[styles.inputStyle, { color: Colors[theme].text }]}
        leftIconContainerStyle={styles.leftIconContainerStyle}
        rightIconContainerStyle={styles.rightIconContainerStyle}
        searchIcon={{ size: ms(25) }}
        leftIcon={false}
        onClear={() => {
          if (props.searchQuery) {
            props.setSuggestionData?.([])
            props.setSearchQuery?.('')
            props.onClear?.()
          }
        }}
        platform="default"
        round={true}
        showLoading={props.loading}
        loadingProps={{
          color: Colors.primary
        }}
        lightTheme={false}
      />
      {/* Suggestion List */}
      {props.suggestionData?.length > 0 ? (
        <FlatList
          data={props.suggestionData}
          keyExtractor={(item, index) => index.toString()}
          style={[
            styles.suggestionContainer,
            { backgroundColor: Colors[theme].cartBg }
          ]}
          renderItem={({ item, index }) => renderItem(item, index)}
        />
      ) : null}
    </View>
  )
}

export default CustomSearchBar
const styles = ScaledSheet.create({
  containerStyle: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRadius: '10@ms',
    elevation: 5,
    height: '45@mvs',
    paddingHorizontal: '5@s',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainerStyle: {
    height: '45@mvs',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10@ms'
  },
  inputStyle: {
    fontSize: '16@ms'
  },
  leftIconContainerStyle: {},
  rightIconContainerStyle: {},

  suggestionContainer: {
    position: 'absolute',
    top: '45@vs',
    alignSelf: 'flex-start',
    left: '6@s',
    zIndex: 100,
    width: '85%',
    borderRadius: '10@ms',
    padding: '10@ms'
  }
})
