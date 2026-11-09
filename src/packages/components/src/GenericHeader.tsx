import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image, Platform } from "react-native"
export const GenericHeader = (props: any) => {
  const {
    labelTitle,
    imgBackArrow,
    btnGoBack,
    testID,
    isOtherMsg,
    rightSide,
    clickedRightView,
    thiredImg,
    secImg,
    isImgAvatar,
    UserName,
    onSecImageClick,
    onthiredImageClick
  } = props;

  return (
    <View style={[styles.headerView, { paddingBottom: isOtherMsg ? 30 : 0 }]}>
      <TouchableOpacity style={styles.backImg} testID={testID} {...btnGoBack}>
        {isImgAvatar ?
          imgBackArrow !== null ?
            <Image source={{ uri: imgBackArrow }} style={styles.avatarImgView} />
            :
            <View style={styles.userProfile}>
              <Text style={[styles.userFirstCharView]}>{UserName}</Text>
            </View>
          : <Image style={styles.imgArrowBack} source={imgBackArrow} />
        }
      </TouchableOpacity>
      <Text style={styles.titleView}>{labelTitle}</Text>
      {rightSide && <TouchableOpacity onPress={clickedRightView && clickedRightView} style={styles.rightView}>
        <Text style={styles.rightTitleView}>{rightSide}</Text>
      </TouchableOpacity>}

      {(thiredImg || secImg) && <View style={[styles.rightView, styles.directionIcon]}>
        <TouchableOpacity style={styles.rightSpace} {...onSecImageClick}>
          <Image style={styles.imgArrowBack} source={secImg} />
        </TouchableOpacity>
        <TouchableOpacity {...onthiredImageClick}>
          <Image style={styles.imgArrowBack} source={thiredImg} />
        </TouchableOpacity>
      </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: '#012275',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 30
  },
  backImg: {
    position: 'absolute',
    left: 16,
    top: Platform.OS === 'ios' ? 60 : 30
  },

  rightView: {
    position: 'absolute',
    right: 16,
    top: Platform.OS === 'ios' ? 60 : 30
  },
  directionIcon: {
    flexDirection: 'row'
  },
  rightSpace: {
    marginRight: 20
  },
  imgArrowBack: {
    height: 24,
    width: 24
  },
  avatarImgView: {
    height: 32,
    width: 32,
    borderRadius: 100
  },
  titleView: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24
  },
  rightTitleView: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 16.94
  },
  userFirstCharView: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 'bold',
    color: '#012275',
    textAlign: 'center',
    top: 4
  },
  userProfile: {
    height: 32,
    width: 32,
    borderRadius: 100,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: "#F0E5FF",
  },

  userProfileDetail: {
    height: 24,
    width: 24,
    borderRadius: 80,
    backgroundColor: '#012275',
    borderWidth: 2,
    borderColor: "#F0E5FF",
  },
})