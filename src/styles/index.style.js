import { StyleSheet, Dimensions } from 'react-native';
import { getHeaderHeight } from './utilities';
export const viewportHeight = Dimensions.get('window').height - getHeaderHeight();

export const colors = {
    chwTrackingBlue: '#dcf0fd',
    chwBlueGray: '#94aeba',
    chwGradientBlue: '#ddf1fd',
    chwDarkTextBlue: '#273746',
    chwNotificationTimeGrey: '#afc1cb',
    white: '#fff',
    black: '#000',
    lightGray: '#ddd',
    shadowColor: '#afafaf',
    chwLightGreyBackground: '#fafafc',
    chwDarkBlue: '#011d38',
    chwLightBlue: '#5fa4d7',
    chwBlue: '#1f2022',
    chwHeaderText: '#021426',
    chwText: '#748088',
    chwDisabledButton: '#b3c4d2',
    chwErrorBackground: '#cc3a04',
    chwSuccessBackground: '#011d38',
    chwGreenCheck: '#008001',
    chwRedX: '#e8044f',
    chwScheduleBlue: '#2b8fd5',
    chwAcceptButtonBlue: '#4aadf5',
    chwCalendarRed: '#de2d43',
    chwCalendarOrange: '#e6852a',
    chwNotificationRed: '#e90258',
};
export default StyleSheet.create({
    safeArea: {
        flex: 1,
        //backgroundColor: colors.black
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.chwLightGreyBackground,
      },
      loading: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
      },
    containerInner: {
        flex: 1,
        paddingHorizontal: 25,
    },
    tabNavContainer: {
        flex:1,
        alignItems: 'center',
        padding: 5,
        textAlign:'center'
    },
    scrollview: {
        flex: 1
    },
    logoContainer: {
        marginTop:15,
        alignItems:'center',
        textAlign:'center',
        maxHeight: 150,
    },
    logo: {
        width:Dimensions.get('window').width - 50,
        height:'100%',
        maxHeight:150
    },
    logoSmall: {
        width:Dimensions.get('window').width - 50,
        height:'100%',
        maxHeight:100
    },
    smallTitle: {
        marginVertical: 15,
        color: colors.chwHeaderText,
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    title: {
        //marginTop: 30,
        color: colors.chwHeaderText,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    subtitle: {
        lineHeight:25,
        marginTop: 25,
        color: colors.chwText,
        fontSize: 15,
        textAlign: 'left'
    },
    text: {
        textAlign: 'left',
        fontSize: 15,
        color: colors.chwText
    },
    smallText: {
        textAlign: 'center',
        fontSize: 10,
        color: colors.chwText,
    },
    modal: {
        marginTop: 22,
        marginHorizontal: 22,
        backgroundColor: colors.white,
        padding: 15
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.chwHeaderText
    },
    modalText: {
        fontSize: 15,
        color: colors.chwText
    },
    textInput: {
        height: 40,
        marginVertical:5,
        backgroundColor: colors.white,
        paddingHorizontal: 15
    },
    textInputShadow: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
    },
    checkbox: {
        height: 25,
        width:25,
        borderRadius: 5,
        borderColor: colors.chwText
    },

    // Settings Screen
    containerSettings: {
        flex: 1,
        backgroundColor: colors.chwLightGreyBackground,
    },
    settingsMenuItem: {
        flex: 1,
        flexDirection:'row',
        padding:10,
        maxHeight: 50,
        alignItems:'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray
    },
    settingsMenuTitle: {
        flex:1,
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.black
    },
    settingsMenuArrow: {
        flex:0,
        color: colors.black
    },
    settingsVendorTopContainer: {
        margin: 15,
        padding: 20,
        flex:0,
        backgroundColor: colors.white,
        borderRadius: 5,
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
    },
    settingsVendorBottomContainer: {
        flex:1,
        height:'100%',
        backgroundColor:colors.white
    },
    settingsUCPContainer: {
        flex:0,
        marginTop: 10,
        marginBottom: 30,
        alignItems: 'center',
        textAlign: 'center',
    },
    settingsUpdateCompanyText: {
        fontSize:13,
        color: colors.chwLightBlue
    },
    settingsUpdateCompanyProfile: {
        color: colors.chwScheduleBlue,
        textDecorationLine:'underline',
    },
    settingsContainerInner: {
        paddingHorizontal:25,
        flex:0
    },
    avatarContainer: {
        backgroundColor:colors.lightGray,
        height:40,
        width:40,
        borderRadius:80,
        marginHorizontal:10
    },
    userInfoContainer: {
        borderRadius: 5,
        marginVertical:5,
        padding:10,
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        backgroundColor:colors.white
    },
    userInfoTextContainer: {
        flexDirection:'column',
        flex:1
    },
    userInfoTextName: {
        fontWeight:'500',
        color:colors.black,
        fontSize:14
    },
    userInfoText: {
        color:colors.hwText,
        fontSize:12
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
      },
      buttonViewLight: {
        backgroundColor: colors.chwAcceptButtonBlue,
        paddingVertical:5
      },
      buttonView: {
        marginHorizontal:5,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
        overflow: 'hidden',
        marginVertical: 15,
        backgroundColor: colors.chwDarkBlue
      },
      requestContainer: {
        flexDirection:'row',
      },
      requestContainerOutter: {
        borderRadius: 5,
        marginVertical:5,
        padding:10,
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        backgroundColor:colors.white
    },
    requestIcon: {
        alignItems: 'center',
        justifyContent:'center',
        margin: 5,
        width:45,
        height:45,
        borderRadius: 5,
    },
    requestHeadline: {
        color: colors.chwDarkTextBlue,
        fontSize: 17,
        fontWeight:'bold'
    }, 
    requestSubtext: {
        color: colors.chwLightBlue,
        fontSize: 15,
        paddingVertical:5,
    },
    pendingContainer: {
        flex:1,
        flexDirection:'row',
        marginVertical: 5,
        borderRadius:10,
        padding:10,
        backgroundColor:colors.white,
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },  
    pendingCalendarContainer: {
        flex:0,
        margin:5,
        marginRight:15,
        width:50,
        flexDirection:'column',
        borderTopLeftRadius:5,
        borderTopRightRadius:5
    },
    pendingCalendarHead: {
        backgroundColor: colors.chwCalendarOrange,
        alignItems:'center',
        paddingVertical:3,
        borderTopLeftRadius:5,
        borderTopRightRadius:5
    },
    pendingCalendarCenter: {
        alignItems:'center',
        textAlign:'center',
        paddingVertical:5,
        backgroundColor: colors.white,
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        alignContent:'center',
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5
    },
    pendingCalendarTime: {
        alignItems:'center'
    },
    pendingWorkordersToAssign: {
        flexDirection:'row',
        borderRadius: 10,
        marginVertical:10,
        padding:12,
        backgroundColor:colors.chwBlue,
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        alignContent:'center',
        alignItems:'center'
    },
    pendingHeading: {
        fontWeight:'bold',
        marginTop:5,
        fontSize:16
    },  
    pendingSub1: {
        color:colors.chwBlueGray,
        marginVertical:3
    },
    pendingSub2: {
        color:colors.chwLightBlue,
        fontWeight:'bold',
        fontSize:14
    },
    pendingThreedots: {
        flex:0
    },
    pendingTime: {
        fontSize:12,
        fontWeight:'500'
    },  
    activeWorkOrderContainer: {
        flex:1,
        padding:10,
        backgroundColor: colors.white,
        borderRadius: 5,
        marginVertical:7,
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    activeWorkOrderRow: {
        flexDirection:'row',
        paddingHorizontal:5,
        marginBottom:7
    },
    activeWorkorderCol: {
        flexDirection:'column',
        flex:1,
        //padding:5
    },
    activeWorkorderButtonView: {
        backgroundColor: colors.white,
        borderColor: colors.chwLightBlue,
        borderWidth: 1,
        padding: 5,
        alignItems:'center',
        marginVertical: 5
    },
    activeWorkorderButtonViewDisabled: {
        backgroundColor: colors.lightGray,
        padding: 5,
        alignItems:'center',
        marginVertical: 5
    },
    activeWorkorderButtonText: {
        color: colors.chwLightBlue,
        fontWeight:'bold'
    },
    activeWorkorderButtonTextDisabled: {
        color: colors.white,
        fontWeight:'bold'
    },
    boldText: {
        fontWeight: 'bold',
        fontSize:15
        //marginTop:6
    },
    heavyText: {
        fontWeight: '500',
        fontSize:12
        //marginTop:6
    },
    activeTitle: {
        fontSize: 17,
        marginTop:0
    },
    activeSmallGrayText: {
        fontSize: 12,
        marginBottom:3,
        color: '#a0a0a0'
    },
    activeSmallBlueText: {
        fontSize: 13,
        color: colors.chwDarkBlue
    },

    // Work order screen
    workorderHeader: {
        borderBottomColor: '#5fa4d7ff',
        borderBottomWidth:1,
        
    },
    workorderHeaderTitle: {
        fontSize:25,
        fontWeight:'600',
        flex:1,
        paddingHorizontal:15
    },
    workorderHeaderIcon: {
        alignItems:'center',
        textAlign:'center',
        fontSize:25,
        fontWeight:'600',
        paddingHorizontal:10
    },
    workorderSearchBar: {
        flexDirection:'row',
    },
    workorderTopTabs: {
        flexDirection:'row',
        marginHorizontal:25
    },
    workorderTopTabItem: {
        flex:1,
        alignItems:'center',
        textAlign:'center',
        paddingVertical:15
    },
    workorderTopTabItemText: {
        color: colors.shadowColor,
        fontWeight:'bold'
    },
    workorderTopTabItemActive: {
        borderBottomColor: colors.chwLightBlue,
        borderBottomWidth: 3,
    },
    workorderTopTabItemTextActive: {
        color: colors.chwLightBlue,
        fontWeight:'bold'
    },
    workorderTopTabIcon: {
        flex:0,
        paddingVertical:15,
        paddingHorizontal:10
    },
    workorderExpanded: {
        padding: 5,
        paddingBottom: 10,
        marginTop: 10,
        //borderBottomColor: colors.lightGray,
        //borderBottomWidth: 2,
        //borderTopColor: colors.lightGray,
        //borderTopWidth: 2,
        borderWidth:2,
        borderColor:colors.lightGray,
        borderStyle:'dashed'
    },
    underLine: {
        textDecorationStyle:'solid',
        textDecorationLine:'underline',
        color:colors.chwLightBlue
    },
    activeWorkorderTrackingMarker: {
        position:'absolute',
        top:0,
        right:0,
        backgroundColor:colors.chwTrackingBlue,
        paddingHorizontal:5,
        paddingVertical:3,
        borderRadius: 5,
    },
    activeWorkorderTracking: {
        backgroundColor: colors.chwTrackingBlue,
        padding: 10,
        borderColor:colors.white,
        borderWidth:2,
        borderStyle:'dashed'
    },
    redBubble: {
        backgroundColor: colors.chwRedX,
        padding: 4,
        marginHorizontal:4,
        borderRadius: 10,
        flex:0
    },
    redBubbleText: {
        color: colors.white,
        fontSize: 10,
        flex:0
    },

    // Notifications
    nontificationsNone: {
        justifyContent: 'center',
        flex:1,
        textAlign:'center',
        alignItems:'center',
    },
    noticationContainer: {
        backgroundColor:colors.white,
        padding:15,
        marginVertical:5,
        shadowColor:colors.shadowColor,
        shadowOffset: { width: 0, height: 5 },  
        shadowRadius: 5,
        borderRadius:5      
    },
    notificationTitle: {
        color:colors.chwBlue,
        fontWeight:'bold',
        marginBottom:5,
        fontSize:15
    },
    notificationMessage: {
        marginVertical: 10,
        fontWeight:'bold', 
        color:colors.chwScheduleBlue
    },
    notificationTime: {
        fontWeight:'600', 
        fontSize: 12,
        color: colors.chwNotificationTimeGrey
    }
});
