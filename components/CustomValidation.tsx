import {
  TouchableOpacity,
  Image,
  View,
  Pressable,
  ActivityIndicator
} from 'react-native'
import React, { useState } from 'react'
import { Controller, FieldError } from 'react-hook-form'
import { Dropdown, MultiSelect } from 'react-native-element-dropdown'
import { AntDesign, Feather } from '@expo/vector-icons'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'
import { Input, CheckBox } from '@rneui/themed'
import { ms, mvs, ScaledSheet, vs } from 'react-native-size-matters'
import { Colors } from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import { useTheme } from '@/context/ThemeContext'
import { checkUrlFormat } from '@/utils/checkUrlFormat'
import CustomButton from './CustomButton'

type RequiredProps = {
  name: string
  type: 'input' | 'picker' | 'checkbox' | 'radio' | 'image' | 'datetime'
  control: any
}

interface TextInputProps extends RequiredProps {
  label?: string
  leftIcon?: any
  rightIcon?: any
  placeholder?: string | undefined
  disabled?: boolean
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send'
  onSubmitEditing?: () => void
  maxLength?: number
  multiline?: boolean
  onFocus?: () => void
  defaultValue?: any
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  autoCorrect?: boolean
  readOnly?: boolean
  onPressIcon?: () => void
  rules?: any
  searchPlaceholder?: string
  isSearch?: boolean
  keyToShowData?: string
  keyToCompareData?: string
  searchField?: string
  data?: any
  multiSelect?: boolean
  labelStyle?: any
  maxSelect?: number
  editable?: boolean
  secureTextEntry?: boolean
  numberOfChecked?: number
  onLongPress?: () => void
  onPress?: () => void
  keyboardType?:
  | 'default'
  | 'number-pad'
  | 'decimal-pad'
  | 'numeric'
  | 'email-address'
  | 'url'
  | 'phone-pad'
  mode?: 'dialog' | 'dropdown'
  inputMode?: 'outlined' | 'flat'
  position?: 'auto' | 'top' | 'bottom'
  checkBoxPosition?: 'leading' | 'trailing'
  labelVariant?:
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  size?: number
  uncheckedIcon?: string
  checkedIcon?: string
  checkedColor?: string
  iconType?: string
  uncheckedColor?: string
  inputContainerStyle?: any
  inputStyle?: any
  countryPicker?: boolean
  countryPickerPress?: () => void
  countryCode?: string
  showInputContainer?: boolean
  imageResponseHandler?: (response: any) => void | undefined
  containerStyle?: any
  mainInputContainerStyle?: any
  pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only'
  value?: any
  isLoading?: boolean
  hideStar?: boolean
  itemContainerStyle?: any
  wrapperStyle?: any
}

const CustomValidation = (props: TextInputProps) => {
  const { numberOfChecked = 1, inputMode = 'outlined' } = props
  const { theme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled) {
      return result.assets[0]
    }
    setLoading(false)

    return null
  }

  const dropIcon = (
    value: any,
    error: FieldError | undefined,
    onChange: { (...event: any[]): void; (arg0: null): void }
  ) => {
    if (props.isLoading) {
      return <ActivityIndicator size="small" color={Colors.primary} />
    }

    if (value && !props.disabled && !error && !props.multiSelect) {
      return (
        <AntDesign
          name="close"
          color={Colors.gray}
          size={ms(24)}
          onPress={() => {
            if (props.disabled) {
              return
            } else {
              onChange(null)
            }
          }}
        />
      )
    } else {
      return (
        <Feather
          name="chevron-down"
          size={ms(24)}
          color={error ? Colors.red : Colors.gray}
        />
      )
    }
  }

  const renderSelectedItem = (item: any, removeItem: any) => {
    return (
      <TouchableOpacity
        key={item[props?.keyToCompareData ?? 'value']}
        style={[styles.selectedItem, { backgroundColor: Colors.primary }]}
        onPress={() => removeItem?.(item)}
      >
        <ThemedText
          style={[styles.selectedItemText, { color: Colors[theme].text }]}
        >
          {item[props.keyToShowData ?? 'label']}
        </ThemedText>
        <AntDesign
          name="closecircle"
          color={Colors.gray}
          size={ms(16)}
          onPress={() => {
            removeItem?.(item)
          }}
        />
      </TouchableOpacity>
    )
  }

  const handleCheckbox = (
    temp: string[],
    item: any,
    onChange: (...event: any[]) => void
  ) => {
    if (numberOfChecked > 1) {
      if (temp?.length >= numberOfChecked && !temp.includes(item.value)) {
        temp.shift()
        temp.push(item.value)
      } else if (temp.includes(item.value)) {
        temp = temp.filter((val: string) => val !== item.value)
      } else {
        temp.push(item.value)
      }
      onChange(temp)
    } else if (!Array.isArray(temp) || temp.length === 0) {
      if (temp === item.value) {
        onChange(null)
      } else {
        onChange(item.value)
      }
    } else {
      if (temp.includes(item.value)) {
        onChange(null)
      } else {
        onChange(item.value)
      }
    }
  }

  return (
    <Controller
      control={props?.control}
      name={props?.name ? props?.name : ''}
      rules={props?.rules}
      defaultValue={props?.defaultValue}
      disabled={props?.disabled}
      key={props?.name ? props?.name : ''}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error }
      }: any) => {
        const errStyle = {
          backgroundColor: props.disabled ? Colors.gray : Colors[theme].cartBg,
          borderColor: error
            ? Colors.red
            : isFocused
              ? Colors.white
              : Colors.gray
        }
        return (
          <View style={[styles.container, props.wrapperStyle]}>
            {/* input validation  */}
            {props?.type === 'input' && (
              <Pressable
                style={{
                  width: '100%',
                  marginTop: error ? 0 : mvs(10),
                  // opacity: props.onPress ? 0 : 1,
                  ...props.inputContainerStyle
                }}
                disabled={props.disabled ? true : false}
                onPress={
                  props.onPress
                    ? props.onPress
                    : props.onPressIcon
                      ? props.onPressIcon
                      : () => {
                        console.log('onPress')
                      }
                }
              >
                {inputMode !== 'flat' && (
                  <View style={{ flexDirection: 'row' }}>
                    <ThemedText
                      style={[
                        styles.labelStyle,
                        props.labelStyle,
                        props.labelStyle ? {} : { color: Colors[theme].text }
                      ]}
                    >
                      {props.label}
                    </ThemedText>
                    {props.rules?.required &&
                      !props.hideStar &&
                      props.label && (
                        <ThemedText style={styles.star}>*</ThemedText>
                      )}
                  </View>
                )}

                {props.countryPicker && (
                  <Pressable
                    style={styles.countryView}
                    onPress={props.disabled ? null : props.countryPickerPress}
                  >
                    <ThemedText style={styles.countryText}>
                      {props.countryCode}
                    </ThemedText>
                    <AntDesign
                      name="down"
                      size={ms(18)}
                      color={Colors.black}
                      style={{ top: 3 }}
                    />
                  </Pressable>
                )}
                <Input
                  placeholder={props.placeholder ?? 'Enter ' + props.label}
                  leftIcon={!props.countryPicker && props.leftIcon}
                  onChangeText={onChange}
                  secureTextEntry={props.secureTextEntry}
                  value={props?.value ?? value}
                  numberOfLines={props.multiline ? 5 : 1}
                  keyboardType={props.keyboardType}
                  returnKeyType={props.returnKeyType}
                  returnKeyLabel="google"
                  onSubmitEditing={props.onSubmitEditing}
                  editable={!props.editable}
                  pointerEvents={props?.pointerEvents}
                  maxLength={props.maxLength}
                  multiline={props.multiline}
                  onFocus={() => {
                    props.onFocus?.()
                    setIsFocused(true)
                  }}
                  autoCapitalize={props.autoCapitalize}
                  autoCorrect={props.autoCorrect}
                  readOnly={props.readOnly}
                  onBlur={() => {
                    onBlur?.()
                    setIsFocused(false)
                  }}
                  placeholderTextColor={Colors[theme].placeholder}
                  rightIcon={
                    props.rightIcon
                      ? props.rightIcon
                      : value && !props.disabled && !props.editable
                        ? {
                          type: 'AntDesign ',
                          name: 'close',
                          color: Colors[theme].text,
                          size: ms(16),
                          onPress(event: any) {
                            props.disabled ? null : onChange(null)
                          }
                        }
                        : null
                  }
                  disabled={props.disabled}
                  inputStyle={[
                    styles.inputStyle,
                    {
                      color: Colors[theme].text,
                      left: props.countryPicker ? ms(65) : 0
                    },
                    props.inputStyle
                  ]}
                  inputContainerStyle={[
                    styles.inputContainerStyle,
                    props.inputContainerStyle
                  ]}
                  containerStyle={[
                    styles.containerIN,
                    errStyle,
                    props.containerStyle
                  ]}
                  leftIconContainerStyle={styles.leftIconContainerStyle}
                  renderErrorMessage={false}
                // defaultValue={props.defaultValue}
                />
              </Pressable>
            )}

            {/* dropdown validation  */}
            {props?.type === 'picker' && (
              <View
                style={{
                  marginTop: error ? 0 : mvs(10),
                  width: '100%',
                  ...props.inputContainerStyle
                }}
              >
                <View style={{ flexDirection: 'row', marginTop: vs(5) }}>
                  <ThemedText
                    style={[
                      styles.labelStyle,
                      props.labelStyle,
                      props.labelStyle ? {} : { color: Colors[theme].text }
                    ]}
                  >
                    {props.label}
                  </ThemedText>
                  {props.rules?.required && !props.hideStar && (
                    <ThemedText style={styles.errorText}>*</ThemedText>
                  )}
                </View>
                {!props.multiSelect ? (
                  <Dropdown
                    style={[
                      styles.dropDownContainer,
                      errStyle,
                      props.inputStyle,
                      {
                        backgroundColor: Colors[theme].cartBg,
                        shadowColor: Colors[theme].cartBg
                      }
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={[
                      styles.selectedTextStyle,
                      { color: Colors[theme].text }
                    ]}
                    inputSearchStyle={[
                      styles.inputSearchStyle,
                      {
                        color: Colors[theme].text,
                        backgroundColor: Colors[theme].cartBg
                      }
                    ]}
                    itemTextStyle={[
                      styles.showText,
                      {
                        color: Colors[theme].text
                      }
                    ]}
                    iconColor={
                      error
                        ? Colors.red
                        : props.disabled
                          ? Colors.gray
                          : Colors.primary
                    }
                    mode="auto" //default,modal
                    dropdownPosition={props.position ?? 'auto'}
                    onFocus={() => {
                      props.onFocus?.()
                      setIsFocused(true)
                    }}
                    renderRightIcon={() => dropIcon(value, error, onChange)}
                    search={props.isSearch ?? false}
                    // renderItem={renderItem}
                    searchField={
                      props.searchField ?? props.keyToShowData ?? 'label'
                    }
                    data={props.data}
                    maxHeight={300}
                    labelField={
                      props.keyToShowData ? props.keyToShowData : 'label'
                    }
                    valueField={
                      props.keyToCompareData ? props.keyToCompareData : 'value'
                    }
                    placeholder={props.placeholder}
                    searchPlaceholder={props.searchPlaceholder ?? 'Search'}
                    disable={props.disabled}
                    activeColor={Colors.gray}
                    iconStyle={styles.iconStyle}
                    containerStyle={{
                      backgroundColor: Colors[theme].cartBg,
                      borderRadius: ms(8),
                      marginTop: vs(5)
                    }}
                    showsVerticalScrollIndicator={false}
                    value={value}
                    onChange={onChange}
                    onBlur={() => {
                      onBlur?.()
                      setIsFocused(false)
                    }}
                    itemContainerStyle={props.itemContainerStyle}
                    key={props.keyToCompareData}
                  />
                ) : (
                  <MultiSelect
                    mode={'auto'}
                    style={[
                      styles.dropDownContainer,
                      errStyle,
                      props.inputStyle,
                      {
                        backgroundColor: Colors[theme].cartBg,
                        shadowColor: Colors[theme].cartBg
                      }
                    ]}
                    inputSearchStyle={[
                      styles.inputSearchStyle,
                      {
                        color: Colors[theme].text,
                        backgroundColor: Colors[theme].cartBg
                      }
                    ]}
                    itemTextStyle={[
                      styles.showText,
                      {
                        color: Colors[theme].text
                      }
                    ]}
                    dropdownPosition={props.position ?? 'auto'}
                    placeholderStyle={[styles.placeholderStyle]}
                    selectedTextStyle={styles.selectedTextStyle}
                    disable={props.disabled}
                    iconStyle={styles.iconStyle}
                    onFocus={() => {
                      props.onFocus?.()
                      setIsFocused(true)
                    }}
                    iconColor={
                      error
                        ? Colors.red
                        : props.disabled
                          ? Colors.gray
                          : Colors.primary
                    }
                    renderRightIcon={() => dropIcon(value, error, onChange)}
                    search={props.isSearch ?? false}
                    data={props?.data ?? []}
                    labelField={
                      props.keyToShowData ? props.keyToShowData : 'label'
                    }
                    valueField={
                      props.keyToCompareData ? props.keyToCompareData : 'value'
                    }
                    maxHeight={300}
                    placeholder={props.placeholder}
                    activeColor={Colors.gray}
                    maxSelect={props.maxSelect}
                    searchField={
                      props.searchField ?? props.keyToShowData ?? 'label'
                    }
                    searchPlaceholder={props.searchPlaceholder ?? 'Search'}
                    containerStyle={{
                      backgroundColor: Colors[theme].cartBg,
                      borderRadius: ms(8),
                      marginTop: vs(5)
                    }}
                    showsVerticalScrollIndicator={false}
                    value={value ?? []}
                    keyboardAvoiding={true}
                    onChange={onChange}
                    onBlur={() => {
                      onBlur?.()
                      setIsFocused(false)
                    }}
                    selectedStyle={styles.selectedStyle}
                    renderSelectedItem={renderSelectedItem}
                    key={props.keyToCompareData}
                  />
                )}
              </View>
            )}

            {/* checkbox button validation */}
            {props?.type === 'checkbox' && (
              <>
                <ThemedView
                  style={[styles.checkboxContainer, errStyle, props.inputStyle]}
                >
                  {props?.data?.map((item: any, index: number) => {
                    let temp: Array<string> = value ? value : []
                    return (
                      <CheckBox
                        key={index}
                        checked={temp?.includes(item?.value)}
                        onLongPress={props.onLongPress}
                        onPress={() => handleCheckbox(temp, item, onChange)}
                        disabled={props.disabled || props.editable}
                        title={item.label}
                        checkedTitle={item.label}
                        size={props.size ?? ms(25)}
                        checkedIcon={props.checkedIcon ?? 'checkbox-marked'}
                        uncheckedIcon={
                          props.uncheckedIcon ?? 'checkbox-blank-outline'
                        }
                        checkedColor={
                          props.disabled
                            ? Colors.gray
                            : (props.checkedColor ?? Colors[theme].text)
                        }
                        uncheckedColor={
                          props.disabled || props.editable
                            ? Colors.gray
                            : error
                              ? Colors.red
                              : (props.uncheckedColor ?? Colors[theme].text)
                        }
                        iconType={props.iconType ?? 'material-community'}
                        // disabledStyle={{ backgroundColor: colors.disabled }}
                        // disabledTitleStyle={{ color: colors.gray }}

                        fontFamily="medium"
                        textStyle={[
                          styles.labelStyle,
                          props.labelStyle,
                          props.labelStyle ? {} : { color: Colors[theme].text }
                        ]}
                        center={false}
                        iconRight={false}
                        right={false}
                        containerStyle={{
                          backgroundColor: Colors.transparent,
                          padding: 0,
                          margin: 5
                        }}
                        wrapperStyle={{}}
                      />
                    )
                  })}
                </ThemedView>
              </>
            )}

            {/* image validation  */}
            {props?.type === 'image' && (
              <ThemedView
                style={{
                  marginTop: error ? 0 : mvs(10),
                  ...props.inputContainerStyle,
                  backgroundColor: Colors[theme].cartBg
                }}
              >
                <ThemedText
                  style={[styles.labelStyle, { color: Colors[theme].text }]}
                >
                  {props.label}{' '}
                  {props.rules?.required ? (
                    <ThemedText style={styles.errorText}>*</ThemedText>
                  ) : (
                    ''
                  )}
                </ThemedText>
                <ThemedView
                  style={[
                    styles.imgContainer,
                    {
                      shadowColor: Colors[theme].cartBg
                    }
                  ]}
                >
                  <Image
                    resizeMode="contain"
                    source={{
                      uri: checkUrlFormat(value?.uri)
                        ? value.uri
                        : 'https://randomuser.me/api/portraits/men/28.jpg'
                    }}
                    style={styles.image}
                  />
                  <ThemedView
                    style={[
                      styles.btnView,
                      {
                        //  backgroundColor: colors.background
                      }
                    ]}
                  >
                    <ThemedText style={styles.placeholderStyle}>
                      {value ? value.fileName : props.placeholder}
                    </ThemedText>

                    <CustomButton
                      title="Upload"
                      isLoading={loading}
                      onPress={async () => {
                        setLoading(true)
                        const res = await pickImage()
                        if (res) {
                          onChange(res)
                          props.imageResponseHandler?.(res)
                          setLoading(false)
                        }
                      }}
                    />
                  </ThemedView>
                </ThemedView>
              </ThemedView>
            )}

            {error && (
              <ThemedText type="default" style={styles.errorText}>
                {error?.message ?? error?.type ?? 'This field is required'}
              </ThemedText>
            )}
          </View>
        )
      }}
    />
  )
}

export default CustomValidation
const styles = ScaledSheet.create({
  container: {
    width: '100%'
  },
  errorText: {
    color: Colors.red,
    left: '5@ms'
  },
  star: {
    color: Colors.red,
    fontSize: '16@ms',
    fontFamily: 'medium',
    bottom: '5@ms'
  },
  selectedItem: {
    borderRadius: '10@ms',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '8@vs',
    paddingVertical: '5@vs',
    margin: '5@ms',
    gap: '5@ms'
  },
  selectedItemText: {
    fontSize: '14@s',
    fontFamily: 'medium',
    color: Colors.black
  },
  inputStyle: {
    height: '48@vs',
    fontSize: '16@s',
    fontFamily: 'medium',
    borderRadius: '10@ms'
  },
  inputContainerStyle: {
    width: '100%',
    height: '50@vs',
    borderBottomWidth: 0
  },
  containerIN: {
    width: '100%',
    borderRadius: '10@ms',
    borderWidth: 1
  },
  dropDownContainer: {
    height: '52@vs',
    paddingHorizontal: '10@ms',
    borderRadius: '10@ms',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1
  },
  leftIconContainerStyle: {
    marginRight: '10@ms'
  },
  icon: {
    marginRight: '10@ms'
  },
  placeholderStyle: {
    fontSize: '14@s',
    textTransform: 'capitalize',
    fontFamily: 'medium',
    color: Colors.grayText
  },

  selectedTextStyle: {
    fontSize: '14@s'
  },
  iconStyle: {
    width: '20@ms',
    height: '20@vs'
    // alignSelf: "flex-end"
  },
  inputSearchStyle: {
    fontSize: '14@s',

    borderRadius: '5@ms',
    paddingHorizontal: '10@ms',
    paddingVertical: '5@vs'
  },
  selectedStyle: {
    borderRadius: '10@ms'
  },
  showText: {
    fontSize: '14@s',
    fontFamily: 'medium'
  },
  itemTextStyle: {
    fontSize: '14@s'
  },
  labelStyle: {
    fontSize: '14@s',
    fontFamily: 'medium',
    textTransform: 'capitalize'
  },
  image: {
    width: '100@ms',
    height: '100@ms',
    borderRadius: '100@ms'
  },
  btnView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: '10@ms'
  },
  imgContainer: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: '10@ms',
    marginTop: '5@ms',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: '10@ms',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  countryText: {
    fontSize: '14@s',
    fontFamily: 'medium',
    color: Colors.black
  },
  countryView: {
    position: 'absolute',
    top: '40%',
    left: '1%',
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: '8@ms',
    paddingHorizontal: '5@ms'
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingVertical: '8@ms',
    borderRadius: '6@ms',
    minHeight: '50@ms'
  }
})
