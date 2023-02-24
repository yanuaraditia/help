let tapliveApiBaseURL = "https://taplive-cstd.taptalk.io/api/visitor/v1", setTapliveApiBaseURL = e => {
        tapliveApiBaseURL = e
    }, tapliveStorageBaseURL = "https://storage.googleapis.com/f8a350-taplive-prd-public/static/launcher/web/v0.0",
    setTapliveStorageBaseURL = e => {
        tapliveStorageBaseURL = e
    }, tapliveChatOpener = !1, tapliveCreateCaseInput = {fullname: "", email: "", topic: "", message: ""},
    tapliveCheckEmailFormat = e => {
        var a;
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)
    }, tapliveConvertHexToRGBA = (e, a) => {
        let t = e.replace("#", "");
        3 === t.length && (t = `${t[0]}${t[0]}${t[1]}${t[1]}${t[2]}${t[2]}`);
        let i = parseInt(t.substring(0, 2), 16), l = parseInt(t.substring(2, 4), 16), p = parseInt(t.substring(4, 6), 16);
        return `rgba(${i},${l},${p},${a / 100})`
    }, tapliveRoomListData = null, tapliveRoomListData2 = null, tapliveChatRoomData = {
        adminName: "",
        case: {caseID: null, caseName: null},
        room: {},
        chatRoomDataChat: null,
        hasMore: !1
    }, tapliveSendTextMessageVal = "", tapliveFileData = {}, tapliveSelectOptionValue = {topic: ""},
    tapliveLauncherReady = !1;

let dc = document
const CHAT_ICON_URL = `https://help.kiriminaja.com/assets/icon-chat.svg`
const CHAT_ICON_CLOSE_URL = `https://help.kiriminaja.com/assets/close-chat.svg`

const renderIntro = (className = 'taplive-start-new-chat-top-content') => {
    return `            <div class="${className} graders">
                <h2 class="init-new-chat">Hai Sahabat 👋</h2>
                <h3 class="init-new-chat">Kamu perlu bantuan?</h3>
                <div class="taplive-close-widget-button">
                    <img src="${tapliveStorageBaseURL}/image/icon-close.svg">
                </div>
            </div>`
}

const CHAT_TYPE = {
    TAPChatMessageTypeText: 1001,
    TAPChatMessageTypeImage: 1002,
    TAPChatMessageTypeVideo: 1003,
    TAPChatMessageTypeFile: 1004,
    TAPChatMessageTypeLocation: 1005,
    TAPChatMessageTypeContact: 1006,
    TAPChatMessageTypeSticker: 1007,
    TAPChatMessageTypeSystemMessage: 9001,
    TAPChatMessageTypeUnreadMessageIdentifier: 9002,
    TAPChatMessageTypeCaseClosed: 3001,
    TAPChatMessageTypeCaseReOpen: 3002,
    TAPChatMessageTypeLeaveReview: 3003,
    TAPChatMessageTypeLeaveReviewDisabled: 3004,
    TAPChatMessageTypeCaseCreated: 3005,
    TAPChatMessageTypeCaseUpdate: 3006,
    TAPChatMessageTypeCase3007: 3007
};
var customTapliveIdentifier = {}, tapliveOmnichannelList = [], tapliveOmnichannelChShow = 0, tapliveTopicList = [],
    tapliveRefreshAccessTokenCallbackArray = [], isTapliveRunRefreshToken = !1, hideTaptalkPower = !1,
    tapliveFileMediaValue = null, tapliveCaptionValue = "", tapliveCounterBadge = 0, tapliveHandleSound = !0,
    tapliveMainThemeColor = "#ff7d00", tapliveLanguage = "en", tapliveReplyMessage = {message: !1},
    tapliveCallback = {tapliveOnCreateCase: null, tapliveOnSendMessage: null}, isPermissionAskReady = !1;
!function () {
    let css = dc.createElement('link');
    css.rel = 'stylesheet'; css.href = '../css/taptalk.css';
    dc.getElementsByTagName('head')[0].appendChild(css)


    var e, a = dc.getElementById("taplive-launcher-script");
    if (a) {
        tapliveStorageBaseURL = a.getAttribute("data-storage-baseURL") || tapliveStorageBaseURL
    }
    var t = dc.createElement("script");
    t.type = "text/javascript", t.src = `${tapliveStorageBaseURL}/crypto-js-min.js`, t.onload = () => s();
    var i = dc.getElementsByTagName("script")[0];
    i.parentNode.insertBefore(t, i);
    var r = dc.getElementsByTagName("head")[0];
    var p = dc.createElement("script");
    p.type = "text/javascript", p.src = `${tapliveStorageBaseURL}/lang/taplive-lang-en.js`;
    var r = dc.getElementsByTagName("script")[0];
    r.parentNode.insertBefore(p, r);
    var o = dc.createElement("script");
    o.type = "text/javascript", o.src = `${tapliveStorageBaseURL}/lang/taplive-lang-id.js`;
    var n = dc.getElementsByTagName("script")[1];
    n.parentNode.insertBefore(o, n);
    let s = () => {
        var e = dc.createElement("script");
        e.type = "text/javascript", e.src = `${tapliveStorageBaseURL}/taptalk-core.js`, e.onload = () => {
            m(), c()
        };
        var a = dc.getElementsByTagName("script")[1];
        a.parentNode.insertBefore(e, a)
    };
    if (null === dc.querySelector('meta[name="viewport"]')) {
        var v = dc.createElement("meta");
        v.id = "viewport", v.name = "viewport", v.content = "width=device-width, initial-scale=1.0", dc.getElementsByTagName("head")[0].appendChild(v)
    }
    let c = () => {
        var e = dc.createElement("script");
        e.type = "text/javascript", e.src = `https://help.kiriminaja.com/js/taptalk-faq.js`, e.onload = () => {
            buildLauncher()
        };
        var a = dc.getElementsByTagName("script")[2];
        a.parentNode.insertBefore(e, a)
    }, m = () => {
        var e = dc.createElement("script");
        e.type = "text/javascript", e.src = `${tapliveStorageBaseURL}/tapliveRoomListAction.js`;
        var a = dc.getElementsByTagName("script")[2];
        a.parentNode.insertBefore(e, a)
    }
}();

class tapliveCore {
    constructor() {
        this.chatType = {
            TAPChatMessageTypeText: 1001,
            TAPChatMessageTypeImage: 1002,
            TAPChatMessageTypeVideo: 1003,
            TAPChatMessageTypeFile: 1004,
            TAPChatMessageTypeLocation: 1005,
            TAPChatMessageTypeContact: 1006,
            TAPChatMessageTypeSticker: 1007,
            TAPChatMessageTypeSystemMessage: 9001,
            TAPChatMessageTypeUnreadMessageIdentifier: 9002,
            TAPChatMessageTypeCaseClosed: 3001,
            TAPChatMessageTypeLeaveReview: 3003,
            TAPChatMessageTypeLeaveReviewDisabled: 3004
        }, this.tapliveSecretKey = "", this.isReadStatusHidden = !1
    }

    setBaseApiUrl(e) {
        tapliveApiBaseURL = e
    }

    isAuthenticated() {
        return !!localStorage.getItem("taplive.auth")
    }

    init(e) {
        this.tapliveSecretKey = e
    }

    tapliveGetDeviceID() {
        let e = localStorage.getItem("tapTalk.DeviceID"),
            a = md5(navigator.userAgent + "@" + new Date().valueOf()).substring(0, 16) + "-" + guid();
        return null !== e ? e : (localStorage.setItem("tapTalk.DeviceID", a), a)
    }

    tapliveConnectWebsocket(e) {
        let a = JSON.parse(tapliveHelper.tapliveGetLocalStorage("taplive.data"));
        taptalk.init(a.appKeyID, a.appKeySecret, a.apiURL), window.addEventListener("offline", function (e) {
            taptalk.disconnect()
        }), window.addEventListener("online", function (e) {
            TapTalkLive.tapliveDoConnect({
                onSuccess() {
                    console.log("Reconnecting to TapTalk.io server"), tapliveGetCaseList({
                        onSuccess(e) {
                            tapliveHelper.renderRoomlistWithOmnichannel(tapliveRoomListData2 ? tapliveRoomListData2[Object.keys(tapliveRoomListData2)[0]] : null, "taplive-room-list-with-omnichannel-chatlist-wrapper"), tapliveView.tapliveLoopRenderRoomListContent(), tapliveHelper.renderOmnichannelList()
                        }, onError(e) {
                            tapliveSnackBar.tapliveSetSnackBar("fail", e)
                        }
                    }), "{}" !== JSON.stringify(tapliveChatRoomData.room) && tapliveGetMessageAfter()
                }
            })
        }), TapTalkLive.tapliveDoConnect(e)
    }

    onExpiredTokenListener() {
        taptalk.addTapListener({
            onTapTalkRefreshTokenExpired() {
                tapliveHelper.onKickSessionBackToFormLogin(), tapliveSnackBar.tapliveSetSnackBar("fail", "Your token is expired")
            }
        })
    }

    tapliveDoConnect(e) {
        TapTalkLive.onExpiredTokenListener(), null !== tapliveHelper.tapliveGetLocalStorage("taplive.auth") && taptalk.connect({
            onSuccess(a) {
                console.log(a), e.onSuccess()
            }, onError(e, a) {
            }, onClose(e) {
                console.log(e), navigator.onLine
            }
        })
    }

    authenticateWithAuthTicket(e, a) {
        TapTalkLive.isAuthenticated() ? console.log("Taplive is Authenticated") : setTimeout(() => {
            tapliveHelper.tapliveToggleLoadingScreen("Authenticating...");
            let t = tapliveApiBaseURL + "/auth/access_token/request";
            var i = {
                Authorization: "",
                "Device-Identifier": this.tapliveGetDeviceID(),
                "Device-Model": navigator.appName,
                "Device-Platform": "web",
                "Secret-Key": TapTalkLive.tapliveSecretKey
            };
            i.Authorization = `Bearer ${e}`, tapliveHelper.tapliveDoXMLHTTPRequest("POST", i, t, null, !1).then(function (e) {
                "" === e.error.code ? (tapliveHelper.tapliveSetLocalStorage("taplive.auth", e.data), TapTalkLive.tapliveRequestAuthTicketWithoutCase(() => {
                    dc.querySelectorAll(".taplive-start-new-message-header img")[0] && (dc.querySelectorAll(".taplive-start-new-message-header")[0].innerHTML = `
                                        <img src="${tapliveStorageBaseURL}/image/chat-room/icon-close.svg" class="taplive-close-widget-button-2">
                                        <b>${TapTalkLive.getTapliveLanguageVar().screenNewMessage.text1}</b>
                                    `, window.innerWidth > 767 && dc.querySelectorAll(".taplive-start-new-message-header img")[0].remove()), dc.querySelectorAll(".taplive-start-new-case-with-omnichannel")[0].classList.remove("taplive-active-start-new-case-wrapper"), dc.querySelectorAll(".taplive-start-new-case-without-omnichannel")[0].classList.remove("taplive-active-start-new-case-wrapper"), tapliveFaq && tapliveFaq.tapliveGetFaqListApi(), a()
                })) : (console.log(t, e.error.message), tapliveSnackBar.tapliveSetSnackBar("fail", e.error.message)), tapliveHelper.tapliveToggleLoadingScreen()
            }).catch(function (e) {
                console.log(e)
            })
        }, 3e3)
    }

    tapliveRequestAuthTicketWithoutCase(e) {
        var a = {
            Authorization: "",
            "Device-Identifier": this.tapliveGetDeviceID(),
            "Device-Model": navigator.appName,
            "Device-Platform": "web",
            "Secret-Key": TapTalkLive.tapliveSecretKey
        };
        let t = tapliveApiBaseURL + "/client/taptalk/request_auth_ticket",
            i = JSON.parse(tapliveHelper.tapliveGetLocalStorage("taplive.auth")).accessToken;
        a.Authorization = `Bearer ${i}`, tapliveHelper.tapliveDoXMLHTTPRequest("POST", a, t, null, !1).then(function (a) {
            "" === a.error.code ? taptalk.authenticateWithAuthTicket(a.data.ticket, {
                onSuccess(a) {
                    tapliveView.tapliveRenderRoomListWithOmnichannel(), dc.querySelectorAll(".taplive-room-list-wrapper")[0] || tapliveView.tapliveRenderRoomList(), TapTalkLive.tapliveConnectWebsocket({
                        onSuccess() {
                            tapliveGetCaseList({
                                onSuccess(e) {
                                    tapliveHelper.renderRoomlistWithOmnichannel(tapliveRoomListData2 ? tapliveRoomListData2[Object.keys(tapliveRoomListData2)[0]] : null, "taplive-room-list-with-omnichannel-chatlist-wrapper"), tapliveView.tapliveLoopRenderRoomListContent(), tapliveHelper.renderOmnichannelList();
                                    let a = dc.querySelectorAll(".taplive-room-list-omnichannel-all-message")[0];
                                    a && tapliveRoomListData2 && Object.keys(tapliveRoomListData2).length > 0 ? a.click() : tapliveHelper.tapliveCustomFadeIn("taplive-start-new-message-wrapper")
                                }, onError(e) {
                                    tapliveSnackBar.tapliveSetSnackBar("fail", e)
                                }
                            }), tapliveMessageListener({
                                onNewMessage(e) {
                                    if (e.isHidden || (tapliveHelper.taplivePlaySound(e), tapliveHelper.tapliveShowNotifation(e)), e.type !== CHAT_TYPE.TAPChatMessageTypeCaseCreated || tapliveRoomListData2[e.room.roomID]) {
                                        if (tapliveRoomListAction.setRoomListLastMessage(e, tapliveRoomListData2, !1, e => {
                                            tapliveRoomListData2 = e
                                        }), e.type === CHAT_TYPE.TAPChatMessageTypeCaseUpdate && tapliveChatRoomData.case.caseID === e.data.id) {
                                            let a = dc.querySelectorAll(".taplive-main-chat-room-case-id");
                                            a.length > 0 && (a[0].innerHTML = `${e.data.topicName} (#${e.data.stringID})`)
                                        }
                                    } else tapliveRoomListData2 = tapliveRoomListAction.pushNewToRoomList(e, tapliveRoomListData2);
                                    tapliveHelper.renderRoomlistWithOmnichannel(tapliveRoomListData2[Object.keys(tapliveRoomListData2)[0]], "taplive-room-list-with-omnichannel-chatlist-wrapper"), tapliveView.tapliveLoopRenderRoomListContent(), tapliveHelper.tapliveShowCounterBadge(tapliveRoomListData2)
                                }, onUpdateMessage(e) {
                                    tapliveRoomListAction.setRoomListLastMessage(e, tapliveRoomListData2, !0, e => {
                                        tapliveRoomListData2 = e, tapliveHelper.renderRoomlistWithOmnichannel(tapliveRoomListData2[Object.keys(tapliveRoomListData2)[0]], "taplive-room-list-with-omnichannel-chatlist-wrapper"), tapliveView.tapliveLoopRenderRoomListContent(), tapliveHelper.tapliveShowCounterBadge(tapliveRoomListData2)
                                    })
                                }
                            }), tapliveMessageListener({
                                onNewMessage(e) {
                                    if (null !== tapliveChatRoomData.room && tapliveChatRoomData.room.roomID === e.room.roomID) {
                                        e.room.isLocked && tapliveHelper.tapliveChatRoomRemoveInputMessageField();
                                        let a = dc.querySelectorAll(".taplive-main-chat-room-bubble-container")[0];
                                        a.scrollHeight - a.scrollTop === a.clientHeight && tapliveHelper.tapliveScrollChatViewToBottom(), e.user.userID === taptalk.getTaptalkActiveUser().userID ? (tapliveChatRoomData.chatRoomDataChat[e.localID] ? tapliveHelper.updateMessageBubble(e) : tapliveHelper.generateMessageBubble(e), tapliveChatRoomData.chatRoomDataChat[e.localID] = e) : (tapliveChatRoomData.chatRoomDataChat[e.localID] = e, tapliveUnreadMessageAction([e]), tapliveHelper.generateMessageBubble(e), tapliveHelper.tapliveScrollChatViewToBottom())
                                    }
                                }, onUpdateMessage(e) {
                                    null !== tapliveChatRoomData.room && tapliveChatRoomData.room.roomID === e.room.roomID && (e.room.isLocked && tapliveHelper.tapliveChatRoomRemoveInputMessageField(), e.isDelivered && !e.isRead && (tapliveChatRoomData.chatRoomDataChat[e.localID] = e), e.isRead && Object.keys(tapliveChatRoomData.chatRoomDataChat).map(e => {
                                        tapliveChatRoomData.chatRoomDataChat[e].isRead || (tapliveChatRoomData.chatRoomDataChat[e].isRead = !0)
                                    }), tapliveHelper.updateMessageBubble(e))
                                }
                            }), roomStatusListener({
                                onStartTyping(e, a) {
                                    tapliveTyping.runActionTypingFromRoomList(e, "show"), clearTimeout(tapliveTyping.roomListTypingHashmap[e]), tapliveTyping.roomListTypingHashmap[e] = setTimeout(function () {
                                        tapliveTyping.runActionTypingFromRoomList(e, "hide")
                                    }, 1e4), null !== tapliveChatRoomData.room && tapliveChatRoomData.room.roomID === e && (dc.querySelectorAll(".taplive-main-chat-room-case-id")[0].innerHTML = `
                                                        Typing<span class="typing-dot-one">.</span><span class="typing-dot-two">.</span><span class="typing-dot-three">.</span>
                                                    `, clearTimeout(tapliveTyping.chatRoomTypingTimeout), tapliveTyping.chatRoomTypingTimeout = setTimeout(function () {
                                        tapliveChatRoomData.room.roomID === e && dc.querySelectorAll(".taplive-main-chat-room-case-id").html(tapliveChatRoomData.case.caseName)
                                    }, 1e4))
                                }, onStopTyping(e, a) {
                                    tapliveTyping.runActionTypingFromRoomList(e, "hide"), null !== tapliveChatRoomData.room && tapliveChatRoomData.room.roomID === e && (dc.querySelectorAll(".taplive-main-chat-room-case-id")[0].innerHTML = tapliveChatRoomData.case.caseName, clearTimeout(tapliveTyping.chatRoomTypingTimeout))
                                }
                            })
                        }, onError(e) {
                            tapliveSnackBar.tapliveSetSnackBar("fail", e)
                        }
                    }), e()
                }, onError(e, a) {
                    console.log(e, a)
                }
            }) : tapliveSnackBar.tapliveSetSnackBar("fail", a.error.message)
        }).catch(function (e) {
            console.log(e)
        })
    }

    setVisible(e) {
        let a = dc.querySelectorAll(".taplive-chat-widget-opener-button")[0],
            t = dc.querySelectorAll(".taplive-outer-container")[0];
        e ? (a.classList.remove("taplive-force-hide"), t.classList.remove("taplive-force-hide")) : (a.classList.add("taplive-force-hide"), t.classList.add("taplive-force-hide"))
    }

    setTapliveLanguage(e) {
        tapliveLanguage = e
    }

    setHideTaplivePower() {
        hideTaptalkPower = !0
    }

    setBrandColor(e, a, t) {
        console.log("TapTalkLive.setBrandColor method is no longer required. Please remove this method from your script")
    }

    setBrandColorWithHex(e) {
        dc.documentElement.style.setProperty("--main-brand-color-darker", tapliveConvertHexToRGBA(((e, a, t, i) => {
            let l, p, r, o, n, s, v, c = parseInt, m = Math.round, d = "string" == typeof t;
            return "number" != typeof e || e < -1 || e > 1 || "string" != typeof a || "r" != a[0] && "#" != a[0] || t && !d ? null : (this.pSBCr || (this.pSBCr = e => {
                let a = e.length, t = {};
                if (a > 9) {
                    if ([l, p, r, d] = e = e.split(","), (a = e.length) < 3 || a > 4) return null;
                    t.r = c("a" == l[3] ? l.slice(5) : l.slice(4)), t.g = c(p), t.b = c(r), t.a = d ? parseFloat(d) : -1
                } else {
                    if (8 == a || 6 == a || a < 4) return null;
                    a < 6 && (e = "#" + e[1] + e[1] + e[2] + e[2] + e[3] + e[3] + (a > 4 ? e[4] + e[4] : "")), e = c(e.slice(1), 16), 9 == a || 5 == a ? (t.r = e >> 24 & 255, t.g = e >> 16 & 255, t.b = e >> 8 & 255, t.a = m((255 & e) / .255) / 1e3) : (t.r = e >> 16, t.g = e >> 8 & 255, t.b = 255 & e, t.a = -1)
                }
                return t
            }), v = a.length > 9, v = d ? t.length > 9 || "c" == t && !v : v, n = this.pSBCr(a), o = e < 0, s = t && "c" != t ? this.pSBCr(t) : o ? {
                r: 0,
                g: 0,
                b: 0,
                a: -1
            } : {
                r: 255,
                g: 255,
                b: 255,
                a: -1
            }, o = 1 - (e = o ? -1 * e : e), n && s) ? (l = m((o * n.r ** 2 + e * s.r ** 2) ** .5), p = m((o * n.g ** 2 + e * s.g ** 2) ** .5), r = m((o * n.b ** 2 + e * s.b ** 2) ** .5), d = n.a, s = s.a, d = (n = d >= 0 || s >= 0) ? d < 0 ? s : s < 0 ? d : d * o + s * e : 0, v) ? "rgb" + (n ? "a(" : "(") + l + "," + p + "," + r + (n ? "," + m(1e3 * d) / 1e3 : "") + ")" : "#" + (4294967296 + 16777216 * l + 65536 * p + 256 * r + (n ? m(255 * d) : 0)).toString(16).slice(1, n ? void 0 : -2) : null
        })(-.2, e), 100)), dc.documentElement.style.setProperty("--main-brand-color", tapliveConvertHexToRGBA(e, 100)), dc.documentElement.style.setProperty("--main-brand-color-90", tapliveConvertHexToRGBA(e, 90)), dc.documentElement.style.setProperty("--main-brand-color-80", tapliveConvertHexToRGBA(e, 80)), dc.documentElement.style.setProperty("--main-brand-color-70", tapliveConvertHexToRGBA(e, 70)), dc.documentElement.style.setProperty("--main-brand-color-60", tapliveConvertHexToRGBA(e, 60)), dc.documentElement.style.setProperty("--main-brand-color-50", tapliveConvertHexToRGBA(e, 50)), dc.documentElement.style.setProperty("--main-brand-color-40", tapliveConvertHexToRGBA(e, 40)), dc.documentElement.style.setProperty("--main-brand-color-30", tapliveConvertHexToRGBA(e, 30)), dc.documentElement.style.setProperty("--main-brand-color-20", tapliveConvertHexToRGBA(e, 20)), dc.documentElement.style.setProperty("--main-brand-color-10", tapliveConvertHexToRGBA(e, 10))
    }

    setReadStatusHidden(e) {
        "boolean" == typeof e && (this.isReadStatusHidden = e)
    }

    getTapliveLanguageVar() {
        return "en" === tapliveLanguage ? tapliveLangEN : tapliveLangID
    }

    launcherLogout(e) {
        if (tapliveLauncherReady) {
            var a = {
                Authorization: "",
                "Device-Identifier": this.tapliveGetDeviceID(),
                "Device-Model": navigator.appName,
                "Device-Platform": "web",
                "Secret-Key": TapTalkLive.tapliveSecretKey
            };
            let t = JSON.parse(tapliveHelper.tapliveGetLocalStorage("taplive.auth")).accessToken;
            a.Authorization = `Bearer ${t}`, tapliveHelper.tapliveToggleLoadingScreen("Logging out..."), dc.querySelectorAll(".taplive-room-list-wrapper")[0].classList.remove("taplive-active-room-list-wrapper"), dc.querySelectorAll(".taplive-room-list-with-omnichannel")[0].classList.remove("taplive-active-start-new-case-wrapper"), tapliveHelper.onClickBackFromChatRoom(), tapliveHelper.onClickCloseNewMessage(), tapliveOmnichannelList.length < 1 ? tapliveHelper.goToFormFirstStartNewCase() : (dc.querySelectorAll(".taplive-start-new-case-without-omnichannel")[0].classList.add("taplive-active-start-new-case-with-omnichannel"), tapliveHelper.goToOmnichannelFirstStartNewCase()), tapliveHelper.tapliveDoXMLHTTPRequest("POST", a, tapliveApiBaseURL + "/client/logout", null, !1).then(function (e) {
                "" === e.error.code ? console.log("Logout Successfully") : (console.log(e.error.message), tapliveSnackBar.tapliveSetSnackBar("fail", e.error.message))
            }).catch(function (e) {
                console.log(e)
            }), tapliveChatRoomData = {
                adminName: "",
                case: {caseID: null, caseName: null},
                room: {},
                chatRoomDataChat: null,
                hasMore: !1
            }, tapliveCounterBadge = 0, dc.querySelectorAll(".taplive-chat-badge")[0].style.display = "none", localStorage.removeItem("taplive.auth"), taptalk.logoutAndClearAllTapTalkData({
                onSuccess(e) {
                    console.log("Logout from Tapcore")
                }
            }), tapliveHelper.tapliveToggleLoadingScreen(), e()
        } else setTimeout(() => {
            this.launcherLogout(e)
        }, 2e3)
    }
}

var TapTalkLive = new tapliveCore;

class tapliveApiCore extends tapliveCore {
    constructor() {
        super(), this.tapliveBaseApiUrl = tapliveApiBaseURL, this.tapliveGuid = "6c5a75d-2ca6-f48b-0257-0de9808ed486", this.tapliveProjectConfig = {
            apiURL: "",
            appKeyID: "",
            appKeySecret: ""
        }, this.tapliveOmnichannelListSecretKey = ""
    }
}

var tapliveApi = new tapliveApiCore;

class tapliveHelperCore extends tapliveCore {
    constructor() {
        super()
    }

    tapliveAddEventForChild(e, a, t) {
        dc.addEventListener(a, function (a) {
            for (var i = a.target; i && i != this; i = i.parentNode) if (i.matches(e)) {
                t.call(i, a);
                break
            }
        }, !1)
    }

    tapliveReverseMessagesObject(e) {
        var a = {}, t = [];
        for (var i in e) t.push(i);
        for (var l = t.length - 1; l >= 0; l--) {
            var p = e[t[l]];
            a[t[l]] = p
        }
        return a
    }

    tapliveRenderUserAvatarWord(e, a) {
        let t = "", i = e.split(" "), l = i.length > 1 ? i[1] : "";
        return a ? t = i[0].substr(0, 1) : (t = i[0].substr(0, 1), t += l.substr(0, 1)), t.toUpperCase()
    }

    tapliveIsToday(e) {
        let a = new Date, t = new Date(e);
        return t.getDate() === a.getDate() && t.getMonth() === a.getMonth() && t.getFullYear() === a.getFullYear()
    }

    tapliveIsYerterday(e) {
        let a = new Date(e), t = new Date(new Date().setDate(new Date().getDate() - 1));
        return a.getDate() === t.getDate() && a.getMonth() === t.getMonth() && a.getFullYear() === t.getFullYear()
    }

    tapliveGetDateMonthYear(e) {
        var a = new Date(e);
        return a.getDate() + "/" + (a.getMonth() + 1) + "/" + a.getFullYear()
    }

    tapliveGetHourMinute(e) {
        var a = new Date(e);
        return a.getHours() + ":" + (10 > a.getMinutes() ? "0" + a.getMinutes() : a.getMinutes())
    }

    tapliveBytesToSize(e) {
        if (0 == e) return "0 Byte";
        var a = parseInt(Math.floor(Math.log(e) / Math.log(1024)));
        return (e / Math.pow(1024, a)).toFixed(2).replace(".00", "") + " " + ["Bytes", "KB", "MB", "GB", "TB"][a]
    }

    tapliveGetFileFromDB(e, a) {
        tapCoreChatRoomManager.getFileFromDB(e.data.fileID, function (e) {
            e ? a.isExist(e) : a.notExist()
        })
    }

    generateMessageBubble(e) {
        let a = taptalk.getTaptalkActiveUser().userID;
        switch (e.type) {
            case this.chatType.TAPChatMessageTypeText:
                e.user.userID !== a ? tapliveView.tapliveRenderChatBubbleMessageIn(e) : tapliveView.tapliveRenderChatBubbleMessageOut(e);
                break;
            case this.chatType.TAPChatMessageTypeImage:
                e.user.userID !== a ? e.isDeleted ? tapliveView.tapliveRenderChatBubbleMessageIn(e) : tapliveView.tapliveRenderChatBubbleMessageImageIn(e) : e.isDeleted ? tapliveView.tapliveRenderChatBubbleMessageOut(e) : tapliveView.tapliveRenderChatBubbleMessageImageOut(e);
                break;
            case this.chatType.TAPChatMessageTypeVideo:
                e.user.userID !== a ? e.isDeleted ? tapliveView.tapliveRenderChatBubbleMessageIn(e) : tapliveView.tapliveRenderChatBubbleMessageVideoIn(e) : e.isDeleted ? tapliveView.tapliveRenderChatBubbleMessageOut(e) : tapliveView.tapliveRenderChatBubbleMessageVideoOut(e);
                break;
            case this.chatType.TAPChatMessageTypeLeaveReview:
            case this.chatType.TAPChatMessageTypeLeaveReviewDisabled:
                tapliveView.tapliveRenderChatBubbleReview(e);
                break;
            case this.chatType.TAPChatMessageTypeSystemMessage:
            case this.chatType.TAPChatMessageTypeCaseClosed:
                tapliveView.tapliveRenderChatBubbleInfo(e);
                break;
            case this.chatType.TAPChatMessageTypeFile:
                e.user.userID !== a ? e.isDeleted ? tapliveView.tapliveRenderChatBubbleMessageIn(e) : tapliveView.tapliveRenderChatBubbleMessageFileIn(e) : e.isDeleted ? tapliveView.tapliveRenderChatBubbleMessageOut(e) : tapliveView.tapliveRenderChatBubbleMessageFileOut(e)
        }
    }

    updateMessageBubble(e) {
        let a = taptalk.getTaptalkActiveUser().userID;
        switch (e.type) {
            case this.chatType.TAPChatMessageTypeText:
                e.user.userID !== a ? tapliveView.tapliveRenderChatBubbleMessageIn(e, e.localID) : tapliveView.tapliveRenderChatBubbleMessageOut(e, e.localID);
                break;
            case this.chatType.TAPChatMessageTypeImage:
                e.user.userID !== a ? e.isDeleted ? tapliveView.tapliveRenderChatBubbleMessageIn(e, e.localID) : tapliveView.tapliveRenderChatBubbleMessageImageIn(e, e.localID) : e.isDeleted ? tapliveView.tapliveRenderChatBubbleMessageOut(e, e.localID) : tapliveView.tapliveRenderChatBubbleMessageImageOut(e, e.localID);
                break;
            case this.chatType.TAPChatMessageTypeVideo:
                e.user.userID !== a ? e.isDeleted ? tapliveView.tapliveRenderChatBubbleMessageIn(e, e.localID) : tapliveView.tapliveRenderChatBubbleMessageVideoIn(e, e.localID) : e.isDeleted ? tapliveView.tapliveRenderChatBubbleMessageOut(e, e.localID) : tapliveView.tapliveRenderChatBubbleMessageVideoOut(e, e.localID);
                break;
            case this.chatType.TAPChatMessageTypeLeaveReview:
            case this.chatType.TAPChatMessageTypeLeaveReviewDisabled:
                tapliveView.tapliveRenderChatBubbleReview(e, e.localID);
                break;
            case this.chatType.TAPChatMessageTypeSystemMessage:
            case this.chatType.TAPChatMessageTypeCaseClosed:
                tapliveView.tapliveRenderChatBubbleInfo(e, e.localID);
                break;
            case this.chatType.TAPChatMessageTypeFile:
                e.user.userID !== a ? e.isDeleted ? tapliveView.tapliveRenderChatBubbleMessageIn(e, e.localID) : tapliveView.tapliveRenderChatBubbleMessageFileIn(e, e.localID) : e.isDeleted ? tapliveView.tapliveRenderChatBubbleMessageOut(e, e.localID) : tapliveView.tapliveRenderChatBubbleMessageFileOut(e, e.localID)
        }
    }

    tapliveDownloadFileToStorage(e, a) {
        fetch(e).then(e => e.blob()).then(e => {
            let t = window.URL.createObjectURL(e), i = dc.createElement("a"), l = `file-${new Date().valueOf()}`;
            i.style.display = "none", i.href = t, i.id = l, i.download = a, dc.body.appendChild(i), i.click(), window.URL.revokeObjectURL(t), i.remove()
        })
    }

    tapliveDownloadFileSetDB(e, a, t) {
        t.onStartDownloadFileSetDB(), tapCoreChatRoomManager.downloadMessageFile(tapliveChatRoomData.chatRoomDataChat[e], {
            onSuccess(t) {
                switch (a) {
                    case"file-out":
                        tapliveView.tapliveRenderChatBubbleMessageFileOut(tapliveChatRoomData.chatRoomDataChat[e], e);
                        break;
                    case"file-in":
                        tapliveView.tapliveRenderChatBubbleMessageFileIn(tapliveChatRoomData.chatRoomDataChat[e], e)
                }
            }, onProgress(e, a, i) {
                t.onProgressDownloadFileSetDB(e, a, i)
            }, onError(e, a) {
                console.log(e, a), tapliveSnackBar.tapliveSetSnackBar("fail", a)
            }
        })
    }

    tapliveOnClickCancelReply() {
        if (tapliveReplyMessage.message) {
            let e = parseInt(getComputedStyle(dc.querySelectorAll(".taplive-main-chat-room-container")[0]).maxHeight.split("-")[1].replace("px", "")) - 68;
            this.tapliveSetChatRoomMaxMinHeight(e)
        }
        tapliveReplyMessage.message = !1;
        let a = dc.querySelectorAll(".taplive-reply-message-wrapper");
        0 !== a.length && a[0].remove()
    }

    tapliveChatRoomReplyInputContent() {
        return `
                <div class="taplive-reply-message-wrapper-inner">
                    <img 
                        src="${tapliveStorageBaseURL}/image/icon-close-black.svg" 
                        class="cancel-taplive-reply-button" 
                        onclick="tapliveHelper.tapliveOnClickCancelReply()"
                    >

                    <div class="taplive-reply-content-outer-wrapper ${tapliveReplyMessage.message.type === CHAT_TYPE.TAPChatMessageTypeText ? "with-border" : ""}">
                        ${tapliveReplyMessage.message.type !== CHAT_TYPE.TAPChatMessageTypeText ? `
                                <div class="taplive-reply-file-media-wrapper">
                                    ${tapliveReplyMessage.message.type === CHAT_TYPE.TAPChatMessageTypeImage ? `
                                            <img 
                                                src="${tapliveReplyMessage.message.data.url ? tapliveReplyMessage.message.data.url : tapliveReplyMessage.message.data.fileURL}"
                                                alt="reply" 
                                                class="taplive-reply-message-image"
                                            />
                                        ` : ""}

                                    ${tapliveReplyMessage.message.type === CHAT_TYPE.TAPChatMessageTypeVideo ? `
                                            <video
                                                src="${tapliveReplyMessage.message.data.url ? tapliveReplyMessage.message.data.url : tapliveReplyMessage.message.data.fileURL}"
                                                class="taplive-reply-message-video"
                                            />
                                        ` : ""}

                                    ${tapliveReplyMessage.message.type === CHAT_TYPE.TAPChatMessageTypeFile ? `
                                            <div class="taplive-reply-message-file">
                                                <img src="${tapliveStorageBaseURL}/image/chat-room/bubble/icon-paper.svg"></img>
                                            </div>
                                        ` : ""}
                                </div>
                            ` : ""}
                        
                        <div class="taplive-reply-name-text-wrapper with-image-or-video-or-file">
                            <p class="taplive-reply-name">
                                <b>
                                    ${tapliveReplyMessage.message.type === CHAT_TYPE.TAPChatMessageTypeFile ? tapliveReplyMessage.message.data.fileName.split(".")[0] : tapliveReplyMessage.message.user.userID === taptalk.getTaptalkActiveUser().userID ? "You" : tapliveReplyMessage.message.user.fullname}
                                </b>
                            </p>

                            <p class="taplive-reply-text">
                                ${tapliveReplyMessage.message.type === CHAT_TYPE.TAPChatMessageTypeFile ? tapliveHelper.tapliveBytesToSize(tapliveReplyMessage.message.data.size) + " " + tapliveReplyMessage.message.data.fileName.split(".")[tapliveReplyMessage.message.data.fileName.split(".").length - 1].toUpperCase() : tapliveView.tapliveReplaceTagHTML(tapliveReplyMessage.message.body)}
                            </p>
                        </div>
                    </div>
                </div> 
            `
    }

    tapliveChatRoomReplyInput() {
        this.taplivePrepend(".taplive-main-chat-room-send-message-panel-wrapper", "div", ".taplive-reply-message-wrapper", this.tapliveChatRoomReplyInputContent())
    }

    tapliveChatRoomRemoveInputMessageField() {
        dc.querySelectorAll(".taplive-main-chat-room-container")[0].classList.add("taplive-chat-room-is-locked"), dc.querySelectorAll(".taplive-main-chat-room-send-message-panel-wrapper")[0] && dc.querySelectorAll(".taplive-main-chat-room-send-message-panel-wrapper")[0].remove(), dc.querySelectorAll(".taplive-main-chat-room-solve-wrapper")[0] && dc.querySelectorAll(".taplive-main-chat-room-solve-wrapper")[0].remove()
    }

    tapliveChatRoomAddInputMessageField() {
        dc.querySelectorAll(".taplive-main-chat-room-container")[0].classList.remove("taplive-chat-room-is-locked"), dc.querySelectorAll(".taplive-main-chat-room-send-message-panel-wrapper").length < 1 && tapliveHelper.tapliveAppend("div", "taplive-main-chat-room-send-message-panel-wrapper", !0, ".taplive-main-chat-room-wrapper", `
                <div class="taplive-main-chat-room-send-message-hamburger" title="Mark as resolved" id="taplive-chat-room-mark-as-solved-button">
                    <img src="../assets/icon-resolve.svg">
                </div>

                <div class="taplive-main-chat-room-send-message-input">
                    <textarea tabindex="-1" type="text" class="taplive-input-text" rows="1" placeholder="Send Message..."></textarea>

                    <img src="${tapliveStorageBaseURL}/image/chat-room/icon-attach.svg" id="taplive-icon-attach-input-message">

                    <div class="taplive-input-file-media-wrapper">
                        <input type="file" id="taplive-input-file-document">

                        <label for="taplive-input-file-document">
                            <div class="taplive-input-file-media-list">
                                <img src="${tapliveStorageBaseURL}/image/chat-room/bubble/icon-paper-black.svg">
                                Document
                            </div>
                        </label>

                        <input type="file" id="taplive-input-file-media" accept="image/*, video/*" />

                        <label for="taplive-input-file-media">
                            <div class="taplive-input-file-media-list">
                                <img src="${tapliveStorageBaseURL}/image/chat-room/icon-media-black.svg">
                                Media
                            </div>
                        </label>
                    </div>
                </div>

                <div class="submit-chat-icon-wrapper input-message-wrapper">
                    <img src="${tapliveStorageBaseURL}/image/chat-room/icon-airplane-white.svg">
                </div>
            `, [{attribute: "tabindex", value: "-1"}])
    }

    tapliveRemoveMessageInBubble(e) {
        dc.querySelectorAll(`.taplive-chat-room-message-in-wrapper[data-chat-id="${e}"]`)[0].remove()
    }

    tapliveScrollChatViewToBottom() {
        setTimeout(function () {
            let e = dc.querySelectorAll(".taplive-main-chat-room-bubble-container")[0].scrollHeight;
            dc.querySelectorAll(".taplive-main-chat-room-bubble-container")[0].scrollTop = e
        }, 0)
    }

    tapliveSetLocalStorage(e, a) {
        let t = a;
        "object" == typeof a && (t = JSON.stringify(a)), localStorage.setItem(e, encryptKey(t, tapliveApi.tapliveGuid))
    }

    tapliveGetLocalStorage(e) {
        return decryptKey(localStorage.getItem(e), tapliveApi.tapliveGuid)
    }

    tapliveDoXMLHTTPRequest(e, a, t, i, l = !1) {
        return new Promise(function (p, r) {
            let o = new XMLHttpRequest;
            for (let n in o.open(e, t, !0), a) o.setRequestHeader(n, a[n]);
            o.send("POST" === e && l ? i : JSON.stringify(i)), o.onload = function () {
                200 === o.status ? p(JSON.parse(o.response)) : r({status: o.status, statusText: o.statusText})
            }, o.onerror = function () {
                r({status: o.status, statusText: o.statusText})
            }
        })
    }

    tapliveGetDeviceID() {
        let e = localStorage.getItem("tapTalk.DeviceID"),
            a = md5(navigator.userAgent + "@" + new Date().valueOf()).substring(0, 16) + "-" + guid();
        return null !== e ? e : (localStorage.setItem("tapTalk.DeviceID", a), a)
    }

    tapliveCustomSelectOption(e, a, t = !0) {
        customTapliveIdentifier[a] = {}, customTapliveIdentifier[a].placeholder = e;
        let i = dc.querySelectorAll(`${t ? "." : "#"}${a}-container`);
        for (let l = 0; l < i.length; l++) i[l].innerHTML = `
                <div class="taplive-custom-select-option" data="${a}">
                    <div class="taplive-custom-select-option-value-box taplive-custom-select-option-value-box-${a}">
                        ${e}
                    </div>
                    <div class="taplive-custom-select-option-wrapper taplive-custom-select-${a}">
                        
                    </div>
                </div>
            `;
        tapliveHelper.tapliveAppendOptionIntoSelectBox(tapliveTopicList, a, "topic")
    }

    tapliveAppendOptionIntoSelectBox(e, a, t) {
        let i = dc.querySelectorAll(`.taplive-custom-select-${a}`), l = "";
        for (let p in e) l += `
                <div class="taplive-custom-select-option-list"
                     data-value="${e[p].id}"
                     data-value-to="${t}"
                     data-select="${a}"
                     data-label="${e[p].name}"
                >
                    ${e[p].name}
                </div>
            `;
        for (let r = 0; r < i.length; r++) i[r].innerHTML = "", i[r].innerHTML = l
    }

    tapliveCustomSelectOptionClearSelected() {
        Object.keys(customTapliveIdentifier).map(e => {
            dc.querySelectorAll(`.taplive-custom-select-option-value-box-${e}`)[0].innnerHTML = customTapliveIdentifier[e].placeholder
        });
        let e = dc.querySelectorAll(".taplive-custom-select-option-list");
        for (let a = 0; a < e.length; a++) e[a].classList.remove("taplive-selected-option")
    }

    goToFormFirstStartNewCase() {
        dc.querySelectorAll(".taplive-start-new-case-with-omnichannel")[0].classList.remove("taplive-active-start-new-case-wrapper"), dc.querySelectorAll(".taplive-start-new-case-without-omnichannel")[0].classList.add("taplive-active-start-new-case-wrapper")
    }

    goToOmnichannelFirstStartNewCase() {
        dc.querySelectorAll(".taplive-start-new-case-without-omnichannel")[0].classList.remove("taplive-active-start-new-case-wrapper"), dc.querySelectorAll(".taplive-start-new-case-with-omnichannel")[0].classList.add("taplive-active-start-new-case-wrapper")
    }

    renderOmnichannelList() {
        let e = () => {
            let e = "", a = e => (e - length > 21 && (e = e.substring(0, 20) + "..."), e);
            if (tapliveOmnichannelList.map(t => {
                t.url = t.url.replace(/'/g, "+I%27"), t.isEnabled && (tapliveOmnichannelChShow++, e += `
                        <div class="option-image-wrapper">
                            ${"" !== t.title ? `
                                    <div class="option-title-wrapper">
                                        ${a(t.title)}
                                    </div>
                                ` : ""}
    
                            <img 
                                src="${tapliveStorageBaseURL}/image/omnichannel-${t.channel}-home.svg" 
                                width="45" 
                                height="45" 
                                onclick='tapliveHelper.tapliveOnclickOmnichannelContact(${JSON.stringify({
                    channel: t.channel,
                    sendPageURL: t.sendPageURL,
                    url: t.url
                })})'
                            />
                        </div>
                    `)
            }), 0 === tapliveOmnichannelChShow) {
                let t = dc.querySelectorAll(".taplive-roomlist-withomnichannel-omnichannel-list-wrapper")[0],
                    i = (dc.querySelectorAll(".taplive-start-new-case-without-omnichannel")[0], dc.querySelectorAll(".first-start-new-case-back-button")[0], dc.querySelectorAll(".taplive-room-list-omnichannel-all-message")[0]);
                t && (t.style.display = "none"), this.initStartFirstCaseView(), i && tapliveRoomListData && Object.keys(tapliveRoomListData).length > 0 && i.click()
            }
            return e
        }, a = dc.querySelectorAll(".omnichannel-option-image-wrapper");
        for (let t = 0; t < a.length; t++) a[t].innerHTML = `
                <div class="omnichannel-option-image-content">
                    ${e()}
                </div>
            `
    }

    initStartFirstCaseView() {
    }

    hideLoadingView() {
        dc.querySelectorAll(".taplive-full-loading")[0].style.visibilty = "hidden"
    }

    goToRoomlistWithOmnichannel() {
        let e = dc.querySelectorAll(".taplive-room-list-wrapper")[0],
            a = dc.querySelectorAll(".taplive-room-list-with-omnichannel")[0];
        e && e.classList.remove("taplive-active-room-list-wrapper"), a && a.classList.add("taplive-active-start-new-case-wrapper")
    }

    goToRoomlistWithoutOmnichannel() {
        let e = dc.querySelectorAll(".taplive-room-list-wrapper")[0],
            a = dc.querySelectorAll(".taplive-room-list-with-omnichannel")[0];
        e && e.classList.add("taplive-active-room-list-wrapper"), a && a.classList.remove("taplive-active-start-new-case-wrapper")
    }

    renderRoomlistWithOmnichannel(e, a) {
        dc.querySelectorAll(".taplive-room-list-with-omnichannel-chatlist-wrapper").innerHTML = "", e && tapliveView.tapliveRenderRoomListContent(e, a)
    }

    removeAttrStyle(e, a = !0) {
        if (a) {
            let t = dc.querySelectorAll(`.${e}`);
            for (let i = 0; i < t.length; i++) t[i].removeAttribute("style")
        } else dc.querySelector(`#${e}`).removeAttribute("style")
    }

    onClickBackFromChatRoom(e = !1) {
        tapliveChatRoomData.room = {}, tapliveSendTextMessageVal = "", dc.querySelectorAll(".taplive-input-text").length > 0 && (dc.querySelectorAll(".taplive-input-text")[0].value = ""), e && dc.querySelectorAll(".taplive-room-list-wrapper").length > 0 && dc.querySelectorAll(".taplive-room-list-wrapper")[0].classList.toggle("taplive-active-room-list-wrapper"), dc.querySelectorAll(".taplive-main-chat-room-wrapper")[0].classList.remove("taplive-active-main-chat-room-wrapper"), dc.querySelectorAll(".taplive-main-chat-room-container")[0].classList.remove("taplive-active-mark-as-solved"), dc.querySelectorAll(".taplive-main-chat-room-solve-wrapper").length > 0 && dc.querySelectorAll(".taplive-main-chat-room-solve-wrapper")[0].classList.remove("taplive-main-chat-room-solve-wrapper-hide"), tapliveChatRoomData.chatRoomDataChat = []
    }

    onClickCloseNewMessage() {
        tapliveHelper.tapliveResetTopicListOption(), tapliveHelper.tapliveCustomFadeOut("taplive-start-new-message-wrapper")
    }

    onKickSessionBackToFormLogin() {
        tapliveRefreshAccessTokenCallbackArray = [], isTapliveRunRefreshToken = !1, taptalk.logoutAndClearAllTapTalkData({
            onSuccess(e) {
                console.log(e)
            }
        }), localStorage.removeItem("taplive.auth"), dc.querySelectorAll(".taplive-room-list-wrapper")[0].classList.remove("taplive-active-room-list-wrapper"), dc.querySelectorAll(".taplive-room-list-with-omnichannel")[0].classList.remove("taplive-active-start-new-case-wrapper"), this.onClickBackFromChatRoom(), this.onClickCloseNewMessage(), tapliveOmnichannelList.length < 1 ? tapliveHelper.goToFormFirstStartNewCase() : (dc.querySelectorAll(".taplive-start-new-case-without-omnichannel")[0].classList.add("taplive-active-start-new-case-with-omnichannel"), tapliveHelper.goToOmnichannelFirstStartNewCase())
    }

    resetFormLoginValue() {
        tapliveCreateCaseInput = {
            fullname: "",
            email: "",
            topic: "",
            message: ""
        }, tapliveSelectOptionValue.topic = "", tapliveHelper.tapliveCustomSelectOptionClearSelected(), dc.getElementsByClassName("taplive-start-new-case-form")[0].reset()
    }

    msToTime(e) {
        parseInt(e % 1e3 / 100);
        var a = Math.floor(e / 1e3 % 60), t = Math.floor(e / 6e4 % 60), i = Math.floor(e / 36e5 % 24);
        return (i = i < 10 ? "0" + i : i) + ":" + (t = t < 10 ? "0" + t : t) + ":" + (a = a < 10 ? "0" + a : a)
    }

    downloadFileToStorage(e, a) {
        fetch(e).then(e => e.blob()).then(e => {
            let t = window.URL.createObjectURL(e), i = dc.createElement("a"), l = `file-${new Date().valueOf()}`;
            i.style.display = "none", i.href = t, i.id = l, i.download = a, dc.body.appendChild(i), i.click(), window.URL.revokeObjectURL(t), i.remove()
        })
    }

    onClosePreuploadPanel() {
        tapliveHelper.tapliveCustomFadeOut("taplive-image-preupload-panel"), tapliveHelper.tapliveCustomFadeOut("taplive-video-preupload-panel");
        let e = dc.querySelectorAll(".taplive-caption-limit");
        for (let a = 0; a < e.length; a++) e[a].innerHTML = "0/100";
        dc.querySelector("#taplive-input-file-media").value = null;
        let t = dc.querySelectorAll(".taplive-caption-input");
        for (let i = 0; i < t.length; i++) t[i].value = "";
        tapliveFileMediaValue = null, tapliveCaptionValue = ""
    }

    taplivePlaySound(e) {
        let a = dc.getElementById("taplive-sound-new-message");
        e.user.userID !== taptalk.getTaptalkActiveUser().userID && tapliveHandleSound && (tapliveHandleSound = !1, a.play(), setTimeout(() => {
            tapliveHandleSound = !0
        }, 3e3))
    }

    tapliveShowCounterBadge(e) {
        let a = 0;
        Object.keys(e).map(t => {
            e[t].tapTalkRoom.lastMessage.user.userID !== taptalk.getTaptalkActiveUser().userID && (a += e[t].tapTalkRoom.unreadCount)
        }), 0 === (tapliveCounterBadge = a) ? dc.querySelectorAll(".taplive-chat-badge")[0].style.display = "none" : (dc.querySelectorAll(".taplive-chat-badge")[0].style.display = "flex", dc.querySelectorAll(".taplive-chat-badge")[0].innerHTML = `<b>${tapliveCounterBadge}</b>`)
    }

    tapliveShowNotifation(e) {
        if (e.user.userID !== taptalk.getTaptalkActiveUser().userID) try {
            let a = new Notification(e.user.fullname, {
                body: e.body,
                icon: `${tapliveStorageBaseURL}/image/taptalk-icon.jpg`
            });
            a.onclick = function () {
                window.focus()
            }
        } catch (t) {
            console.log(t)
        }
    }

    tapliveCheckBrowser() {
        var e;
        let a = !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0,
            t = "undefined" != typeof InstallTrigger,
            i = /constructor/i.test(window.HTMLElement) || "[object SafariRemoteNotification]" === (e = !window.safari || "undefined" != typeof safari && safari.pushNotification).toString(),
            l = !!dc.documentMode, p = !l && !!window.StyleMedia,
            r = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime),
            o = r && -1 != navigator.userAgent.indexOf("Edg"), n = (r || a) && !!window.CSS;
        return {isOpera: a, isFirefox: t, isSafari: i, isIE: l, isEdge: p, isChrome: r, isEdgeChromium: o, isBlink: n}
    }

    tapliveCustomFadeOut(e, a = !0) {
        let t = a ? dc.querySelectorAll(`.${e}`)[0] : dc.querySelector(`#${e}`);
        t.classList.remove("taplive-fade-in"), setTimeout(() => {
            t.style.visibility = "hidden"
        }, 200)
    }

    tapliveCustomFadeIn(e, a = !0) {
        let t = a ? dc.querySelectorAll(`.${e}`)[0] : dc.querySelector(`#${e}`);
        t.style.visibility = "visible", t.classList.add("taplive-fade-in")
    }

    tapliveSetZIndex(e, a, t = !0) {
        (t ? dc.querySelectorAll(`.${e}`)[0] : dc.querySelector(`#${e}`)).style.zIndex = a
    }

    tapliveHasClass(e, a) {
        let t = !1;
        return "." === e[0] ? dc.querySelectorAll(e)[0].className.includes(a) : dc.querySelector(e).className.includes(a)
    }

    taplivePrepend(e, a, t, i, l = !1) {
        let p = dc.createElement(a), r = "." === t[0], o = "", n = "." === e[0];
        r ? p.className = "." !== t[0] || "#" !== t[0] ? t.substr(1, t.length) : t : p.id = "." !== t[0] || "#" !== t[0] ? t.substr(1, t.length) : t, p.innerHTML = i, n ? (o = dc.querySelectorAll(e)[0]).insertBefore(p, o.firstChild) : (o = dc.querySelector(e)).insertBefore(p, o.firstChild)
    }

    tapliveAppend(e, a, t, i, l, p = null, r = !1) {
        let o = dc.createElement(e), n = "." === i[0], s = "";
        if (o.innerHTML = l, t ? o.className = a : o.id = a, r && (o.id = r), null !== p) for (let v = 0; v < p.length; v++) o.setAttribute(p[v].attribute, p[v].value);
        if (n) {
            s = dc.querySelectorAll(i);
            for (let c = 0; c < s.length; c++) s[c].appendChild(o)
        } else (s = dc.querySelector(i)).appendChild(o)
    }

    tapliveHTML(e, a, t, i, l, p = null, r = !1) {
        let o = dc.createElement(e), n = "." === i[0], s = "";
        if (o.innerHTML = l, t ? o.className = a : o.id = a, r && (o.id = r), null !== p) for (let v = 0; v < p.length; v++) o.setAttribute(p[v].attribute, p[v].value);
        if (n) {
            s = dc.querySelectorAll(i);
            for (let c = 0; c < s.length; c++) s[c].innerHTML = o.outerHTML
        } else (s = dc.querySelector(i)).innerHTML = o.outerHTML
    }

    tapliveOnClickReply(e) {
        let a = dc.querySelectorAll(".taplive-reply-message-wrapper");
        if (tapliveChatRoomData.chatRoomDataChat[e].body = this.tapliveSHTML(tapliveChatRoomData.chatRoomDataChat[e].body), tapliveReplyMessage = {message: tapliveChatRoomData.chatRoomDataChat[e]}, 0 === a.length) {
            this.tapliveChatRoomReplyInput();
            let t = parseInt(getComputedStyle(dc.querySelectorAll(".taplive-main-chat-room-container")[0]).maxHeight.split("-")[1].replace("px", "")) + 68;
            this.tapliveSetChatRoomMaxMinHeight(t)
        } else a[0].innerHTML = this.tapliveChatRoomReplyInputContent()
    }

    tapliveSetChatRoomMaxMinHeight(e) {
        let a = dc.querySelectorAll(".taplive-main-chat-room-container")[0];
        null !== a && (a.style.cssText = `max-height: calc(100% - ${e}px); min-height: calc(100% - ${e}px);`)
    }

    tapliveOnclickOmnichannelContact(e) {
        let a = e.channel, t = e.sendPageURL, i = e.url, l = encodeURIComponent(window.location.href);
        if (("whatsapp" === a || "whatsappba" === a) && (i = `${i}${t ? `%0A%0AFrom URL: ${l}` : ""}`), "twitter" === a) {
            let p = `${i.split("&")[0]}${t ? `%0A%0AFrom URL: ${l}` : ""}`;
            i = i.replace(i.split("&")[0], p)
        }
        window.open(i, "_blank")
    }

    tapliveZoomImageIn(e) {
        var a = dc.querySelectorAll(".taplive-zoom-figure")[0];
        a.style.backgroundSize = "200%";
        var t = e.offsetX, i = e.offsetY, l = t / a.offsetWidth * 100, p = i / a.offsetHeight * 100;
        a.style.backgroundPosition = l + "% " + p + "%"
    }

    tapliveZoomImageOut(e) {
        dc.querySelectorAll(".taplive-zoom-figure")[0].style.backgroundSize = "0%"
    }

    tapliveToogleTapliveBlockingLoading(e) {
        dc.querySelectorAll(".taplive-blocking-loading")[0].style.display = e ? "block" : "none"
    }

    tapliveOnChangeReview() {
        let e = dc.querySelectorAll(".taplive-review-comment")[0].value;
        dc.querySelectorAll(".taplive-review-text-length")[0].innerHTML = `(${e.length}/1000)`
    }

    tapliveToggleLoadingScreen(e = "") {
        let a = dc.querySelectorAll(".taplive-full-loading-screen")[0];
        if (a) {
            let t = dc.querySelectorAll(".loading-text")[0];
            "" === e ? t.innerHTML = "Loading..." : t.innerHTML = e, a.classList.toggle("taplive-force-hide")
        }
    }

    tapliveResetTopicListOption() {
        tapliveSelectOptionValue.topic = "", tapliveHelper.tapliveCustomSelectOption(TapTalkLive.getTapliveLanguageVar().selectTopic.text1, "taplive-start-new-case"), tapliveHelper.tapliveAppendOptionIntoSelectBox(tapliveTopicList, "taplive-start-new-case", "topic")
    }

    tapliveClearCreateNewMessageValue() {
        tapliveHelper.tapliveCustomSelectOption(TapTalkLive.getTapliveLanguageVar().selectTopic.text1, "taplive-start-new-case"), tapliveSelectOptionValue.topic = "", tapliveHelper.tapliveCustomSelectOptionClearSelected(), tapliveCreateCaseInput.message = "", dc.querySelectorAll(".taplive-new-message-input")[0].value = ""
    }

    tapliveCheckIsFileorMedia(e) {
        if (JSON.stringify(tapliveChatRoomData.room) === {}) return !1;
        {
            let a = Array.from(e), t = null;
            a.map(e => {
                "video" === e.type.split("/")[0] || "image" === e.type.split("/")[0] ? null === t && (t = !0) : t = !1
            }), null !== t && (t ? tapliveHelper.tapliveRunOnChangeMedia(a[0]) : tapliveHelper.tapliveRunSendFileMessage(a[0]))
        }
    }

    tapliveRunSendFileMessage(e) {
        let a = e => {
            e.percentageUpload = 0, e.bytesUpload = 0, tapliveChatRoomData.chatRoomDataChat[e.localID] = e, tapliveRoomListAction.setRoomListLastMessage(e, tapliveRoomListData2, !1, e => {
                tapliveRoomListData2 = e
            }), tapliveHelper.renderRoomlistWithOmnichannel(tapliveRoomListData2[Object.keys(tapliveRoomListData2)[0]], "taplive-room-list-with-omnichannel-chatlist-wrapper"), tapliveView.tapliveLoopRenderRoomListContent(), tapliveView.tapliveRenderChatBubbleMessageFileOut(e), tapliveHelper.tapliveScrollChatViewToBottom()
        }, t = (e, a, t) => {
            dc.querySelectorAll(`.taplive-chat-room-message-file-out-wrapper[data-chat-id="${e}"] .taplive-message-filesize-progress`)[0].innerHTML = `${tapliveHelper.tapliveBytesToSize(t)} / `
        };
        tapCoreMessageManager.sendFileMessage(e, tapliveChatRoomData.room, {
            onStart(e) {
                a(e), tapliveHelper.tapliveOnClickCancelReply()
            }, onProgress(e, a, i) {
                t(e, a, i)
            }, onSuccess(e) {
                if ("function" == typeof tapliveCallback.tapliveOnSendMessage) {
                    let a = JSON.parse(tapliveHelper.tapliveGetLocalStorage("taplive.auth")).user;
                    tapliveCallback.tapliveOnSendMessage(e, a.fullName, a.email, window.location.href)
                }
            }, onError(e, a) {
                "90302" === e ? tapliveSnackBar.tapliveSetSnackBar("fail", a) : console.log(e, a)
            }
        }, tapliveReplyMessage.message)
    }

    tapliveRunOnChangeMedia(e) {
        let a = e.type.split("/")[0];
        var t = new FileReader;
        tapliveFileMediaValue = e, t.onload = e => {
            "image" === a ? (tapliveHelper.tapliveCustomFadeIn("taplive-image-preupload-panel"), dc.querySelectorAll(".taplive-image-preupload-value")[0].src = e.target.result) : (tapliveHelper.tapliveCustomFadeIn("taplive-video-preupload-panel"), dc.querySelectorAll(".taplive-video-preupload-value")[0].src = e.target.result)
        }, t.readAsDataURL(e)
    }

    tapliveSHTML = function (e) {
        return e
    }
}

var tapliveHelper = new tapliveHelperCore;

class tapliveViewCore {
    tapliveRenderLauncherButton() {
        tapliveHelper.tapliveAppend("div", "taplive-chat-widget-opener-button", !0, "body", `
            <audio id="taplive-sound-new-message" tabindex="-1">
                <source src="${tapliveStorageBaseURL}/sound/new-message.mp3" type="audio/mpeg" />
            </audio>
            <div class="taplive-chat-badge">
                <b></b>
            </div>
            <img src="${CHAT_ICON_URL}" id="taplive-chat-opener-icon" alt="Widget Opener" tabindex="-1">`)
    }

    tapliveRenderMainChatWrapper() {
        tapliveHelper.tapliveAppend("div", `taplive-outer-container ${hideTaptalkPower ? "" : "active-taplive-power"} taplive-fade-element`, !0, "body", `
            <div class="taplive-full-loading-screen taplive-force-hide">
                <div class="taplive-full-loading-screen-content">
                    <div class="taplive-lds-ring">
                        <div></div><div></div><div></div><div></div>
                    </div>

                    <b class="loading-text">Loading...</b>
                </div>
            </div>
            <div class="taplive-main-chat-wrapper"></div>
            <div class="taplive-footer grid grid-cols-3">
                <div class="div">
                   <a href="#">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.3609 4C6.58066 4 2.64251 9.85685 4.82339 15.2099L5.75573 17.4984C5.83916 17.7032 5.77817 17.9384 5.60576 18.0769L3.63427 19.6602C3.46884 19.793 3.40528 20.0158 3.4757 20.2159C3.54611 20.4161 3.73518 20.55 3.94735 20.55H11.7676C16.5904 20.55 20.5 16.6404 20.5 11.8176C20.5 7.50008 16.9999 4 12.6823 4H12.3609Z" fill="currentColor"/>
                        </svg>
                        <span>Live Chat</span>
                    </a>
                </div>
                <div class="div">
                   <a href="https://help.kiriminaja.com" target="_blank">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 3.5C6.01472 3.5 4 5.51472 4 8V18H4.03544C4.27806 19.6961 5.73676 21 7.5 21H19C19.5523 21 20 20.5523 20 20V5C20 4.17157 19.3284 3.5 18.5 3.5H8.5ZM7.5 15.5H18.5V19.5H7.5C6.39543 19.5 5.5 18.6046 5.5 17.5C5.5 16.3954 6.39543 15.5 7.5 15.5ZM15.5194 8.54104C15.8182 8.25419 15.8279 7.77941 15.541 7.4806C15.2542 7.18179 14.7794 7.1721 14.4806 7.45896L11.875 9.96034L10.5194 8.65896C10.2206 8.3721 9.74582 8.38179 9.45896 8.6806C9.1721 8.97941 9.18179 9.45419 9.4806 9.74104L11.3556 11.541C11.6458 11.8197 12.1042 11.8197 12.3944 11.541L15.5194 8.54104Z" fill="currentColor"/>
                        </svg>
                        <span>Help</span>
                    </a>
                </div>
                <div class="div">
                   <a href="https://dashboard.kiriminaja.com">
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3.75C9.92893 3.75 8.25 5.42893 8.25 7.5C8.25 9.57107 9.92893 11.25 12 11.25C14.0711 11.25 15.75 9.57107 15.75 7.5C15.75 5.42893 14.0711 3.75 12 3.75Z" fill="currentColor"/>
                        <path d="M8 13.25C5.92893 13.25 4.25 14.9289 4.25 17V18.1883C4.25 18.9415 4.79588 19.5837 5.53927 19.7051C9.8181 20.4037 14.1819 20.4037 18.4607 19.7051C19.2041 19.5837 19.75 18.9415 19.75 18.1883V17C19.75 14.9289 18.0711 13.25 16 13.25H15.6591C15.4746 13.25 15.2913 13.2792 15.1159 13.3364L14.2504 13.6191C12.7881 14.0965 11.2119 14.0965 9.74959 13.6191L8.88407 13.3364C8.70869 13.2792 8.52536 13.25 8.34087 13.25H8Z" fill="currentColor"/>
                        </svg>
                        <span>Dashboard</span>
                    </a>
                </div>
            </div>
        `, [{
            attribute: "tabindex",
            value: "-1"
        }]), dc.querySelectorAll(".taplive-outer-container")[0].addEventListener("keydown", e => {
            9 === e.which && e.preventDefault()
        })
    }

    tapliveRenderSnackBar() {
        tapliveHelper.tapliveAppend("div", "taplive-snack-bar-wrapper taplive-fade-element", !0, ".taplive-main-chat-wrapper", `
            <img src="${tapliveStorageBaseURL}/image/snackbar/exclamation-red.svg"
                class="taplive-snack-bar-icon taplive-red-snack-bar-icon"
            >

            <img src="${tapliveStorageBaseURL}/image/snackbar/exclamation-orange.svg"
                class="taplive-snack-bar-icon taplive-orange-snack-bar-icon"
            >

            <b class="taplive-snack-bar-message">Unable To Connect</b>

            <img src="${tapliveStorageBaseURL}/image/snackbar/close-red.svg"
                class="taplive-close-snack-bar taplive-red-snack-bar-icon"
            >

            <img src="${tapliveStorageBaseURL}/image/snackbar/close-orange.svg"
                class="taplive-close-snack-bar taplive-orange-snack-bar-icon"
            >
        `)
    }

    tapliveRenderStartNewCase() {
        tapliveHelper.tapliveAppend("div", "taplive-start-new-chat-wrapper taplive-start-new-case-wrapper taplive-start-new-case-without-omnichannel", !0, ".taplive-main-chat-wrapper", `
            <div class="taplive-start-new-chat-top-content graders">
                <img class="first-start-new-case-back-button" src="${tapliveStorageBaseURL}/image/chat-room/icon-chevron-left.svg">
                <h2 class="init-new-chat">Pesan Baru 🥰</h2>
                <h3 class="init-new-chat">Isi form dulu ya kak</h3>
                <div class="taplive-close-widget-button">
                    <img src="${tapliveStorageBaseURL}/image/icon-close.svg">
                </div>
            </div>

            <div class="taplive-start-new-chat-bottom-content">
                <div class="taplive-start-new-chat-form-wrapper taplive-start-new-case-form-wrapper card">
                    <form class="taplive-start-new-case-form">
                            <label><b>${TapTalkLive.getTapliveLanguageVar().screenLoginForm.text5}</b></label>
                            <input type="text" class="taplive-new-case-email taplive-new-case-fullname" placeholder="${TapTalkLive.getTapliveLanguageVar().screenLoginForm.text6}" />

                            <label><b>${TapTalkLive.getTapliveLanguageVar().screenLoginForm.text7}</b></label>
                            <div class="taplive-start-new-case-container">
                            </div>

                            <label><b>${TapTalkLive.getTapliveLanguageVar().screenLoginForm.text9}</b></label>
                            <textarea rows="2" class="taplive-new-case-message" placeholder="${TapTalkLive.getTapliveLanguageVar().screenLoginForm.text10}"></textarea>

                            <button class="taplive-submit-new-chat btn btn-2 taplive-submit-new-case" tabindex="-1">
                                <b>${TapTalkLive.getTapliveLanguageVar().screenLoginForm.text11}</b>
                            </button>
                    </form>
                </div>
            </div>
        `, [{
            attribute: "tabindex",
            value: "-1"
        }]), tapliveHelper.tapliveCustomSelectOption(TapTalkLive.getTapliveLanguageVar().selectTopic.text1, "taplive-start-new-case")
    }

    tapliveRenderStartNewCaseWithOmnichannel() {
        tapliveHelper.tapliveAppend("div", "taplive-start-new-chat-wrapper taplive-start-new-case-wrapper taplive-start-new-case-with-omnichannel", !0, ".taplive-main-chat-wrapper", `
            ${renderIntro()}
            <div class="taplive-start-new-chat-bottom-content">
                <div class="taplive-start-new-case-with-omnichannel-box card">
                    <div class="omnichannel-option-wrapper">
                        ${tapliveOmnichannelList.length > 0 ? `<p class="omnichannel-option-description">
                                <b>${TapTalkLive.getTapliveLanguageVar().screenLogin.text3}</b>
                            </p>` : ""}

                        ${tapliveOmnichannelList.length > 0 ? '<div class="omnichannel-option-image-wrapper"></div>' : ""}
                    </div>
                    
                    ${tapliveOmnichannelList.length > 0 ? `<div class="omnichannel-option-separator ${"en" === tapliveLanguage ? "omnichannel-option-separator-en" : "omnichannel-option-separator-id"}">
                        </div>` : ""}

                    <button class="taplive-first-message-us-directly btn btn-2" tabindex="-1">
                        <b>${TapTalkLive.getTapliveLanguageVar().screenLogin.text4}</b>
                    </button>
                </div>
            </div>
        `, [{
            attribute: "tabindex",
            value: "-1"
        }]), tapliveFaq.taplivePrepareFaqBox(""), tapliveFaq.taplivePrintFaqOnRoomListWithOmnichannelShimmer(), tapliveFaq.tapliveGetFaqListApi()
    }

    tapliveRenderNewMessage() {
        tapliveHelper.tapliveAppend("div", "taplive-start-new-chat-wrapper taplive-start-new-message-wrapper taplive-fade-element", !0, ".taplive-main-chat-wrapper", `
            <div class="taplive-start-new-chat-top-content taplive-start-new-chat-top-content-color-background">
                <div class="taplive-start-new-message-header">
                    <img src="${tapliveStorageBaseURL}/image/chat-room/icon-chevron-left.svg" id="taplive-close-new-message">
                    <b>${TapTalkLive.getTapliveLanguageVar().screenNewMessage.text1}</b>
                </div>
            </div>

            <div class="taplive-start-new-chat-bottom-content taplive-start-new-chat-bottom-content-new-message new-conversation-form-wrapper">
                <div class="taplive-start-new-chat-form-wrapper">
                        <label><b>${TapTalkLive.getTapliveLanguageVar().screenNewMessage.text2}</b></label>
                        <div class="taplive-start-new-case-container">
                        </div>
                        
                        <label><b>${TapTalkLive.getTapliveLanguageVar().screenNewMessage.text3}</b></label>
                        <textarea tabindex="-1" rows="2" class="taplive-new-message-input" placeholder="${TapTalkLive.getTapliveLanguageVar().screenNewMessage.text4}"></textarea>

                        <button class="taplive-submit-new-chat taplive-main-brand-button taplive-submit-new-message" tabindex="-1">
                            <b>${TapTalkLive.getTapliveLanguageVar().screenNewMessage.text5}</b>
                        </button>
                </div>
            </div>
        `, [{
            attribute: "tabindex",
            value: "-1"
        }]), tapliveHelper.tapliveCustomSelectOption(TapTalkLive.getTapliveLanguageVar().selectTopic.text1, "taplive-start-new-case")
    }

    tapliveRenderRoomListWithOmnichannel() {
        tapliveHelper.tapliveAppend("div", "taplive-room-list-with-omnichannel taplive-start-new-chat-wrapper taplive-start-new-case-wrapper", !0, ".taplive-main-chat-wrapper", `
            ${renderIntro()}
            <div class="taplive-start-new-chat-bottom-content">
                <div class="taplive-roomlist-withomnichannel-omnichannel-list-wrapper card taplive-start-new-case-form-wrapper">
                    <div class="omnichannel-option-wrapper">
                        <p class="omnichannel-option-description">
                            <b>${TapTalkLive.getTapliveLanguageVar().screenRoomListWithOmnichannel.text3}</b>
                        </p>

                        <div class="omnichannel-option-image-wrapper">

                        </div>
                    </div>
                </div>

                <div class="taplive-room-list-with-omnichannel-wrapper card">
                    <p class="taplive-room-list-omnichannel-your-message">
                        <b>${TapTalkLive.getTapliveLanguageVar().screenRoomListWithOmnichannel.text4}</b>
                    </p>

                    <p class="taplive-room-list-omnichannel-all-message">
                        <b>${TapTalkLive.getTapliveLanguageVar().screenRoomListWithOmnichannel.text5}</b>
                    </p>

                    <div class="taplive-room-list-with-omnichannel-chatlist-wrapper">
                        <div class="taplive-shimmer-room-list">
                            <div class="taplive-shimmer-room-list-chat-content">
                                <div class="taplive-avatar-shimmer-room-list taplive-shine">
                                </div>

                                <div class="taplive-shimmer-right-wrapper">
                                    <div class="taplive-shimmer-room-list-top taplive-shine">
                                    </div>

                                    <div class="taplive-shimmer-room-list-bottom taplive-shine">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="taplive-room-list-with-omnichannel-button-wrapper">
                        <button class="taplive-room-list-bottom-new-message btn btn-2" tabindex="-1">
                            <b>${TapTalkLive.getTapliveLanguageVar().screenRoomListWithOmnichannel.text6}</b>
                        </button>
                    </div>
                </div>
            </div>
        `, [{attribute: "tabindex", value: "-1"}]), tapliveFaq.taplivePrintFaqOnRoomListWithOmnichannel("talk_to_agent")
    }

    tapliveRenderRoomList() {
        tapliveHelper.tapliveAppend("div", "taplive-room-list-wrapper", !0, ".taplive-main-chat-wrapper", `
            <div class="taplive-room-list-top-content graders">
                <!--<img src="${tapliveStorageBaseURL}/image/taptalk-icon.jpg" />-->
                <img class="taplive-room-list-back-button" src="${tapliveStorageBaseURL}/image/chat-room/icon-chevron-left.svg" />
                <b>${TapTalkLive.getTapliveLanguageVar().screenRoomListAll.text1}</b>

                <div class="taplive-close-widget-button">
                    <img src="${tapliveStorageBaseURL}/image/icon-close.svg">
                </div>
            </div>

            <div class="taplive-room-list-bottom-content card">
                <div class="taplive-room-list-outer-container">
                    <div class="taplive-shimmer-room-list">
                        <div class="taplive-shimmer-room-list-chat-content">
                            <div class="taplive-avatar-shimmer-room-list taplive-shine">
                            </div>

                            <div class="taplive-shimmer-right-wrapper">
                                <div class="taplive-shimmer-room-list-top taplive-shine">
                                </div>

                                <div class="taplive-shimmer-room-list-bottom taplive-shine">
                                </div>

                                <div class="taplive-shimmer-room-list-line taplive-shine">
                                </div>
                            </div>
                        </div>

                        <div class="taplive-shimmer-room-list-chat-content">
                            <div class="taplive-avatar-shimmer-room-list taplive-shine">
                            </div>

                            <div class="taplive-shimmer-right-wrapper">
                                <div class="taplive-shimmer-room-list-top taplive-shine">
                                </div>

                                <div class="taplive-shimmer-room-list-bottom taplive-shine">
                                </div>

                                <div class="taplive-shimmer-room-list-line taplive-shine">
                                </div>
                            </div>
                        </div>

                        <div class="taplive-shimmer-room-list-button-wrapper">
                            <div class="taplive-shimmer-room-list-button-content taplive-shine">

                            </div>
                        </div>
                    </div>
                </div>

                <div class="taplive-room-list-bottom-new-message-wrapper">
                    <button class="taplive-room-list-bottom-new-message btn btn-2">
                        <b>${TapTalkLive.getTapliveLanguageVar().screenRoomListAll.text2}</b>
                    </button>
                </div>
            </div>
        `)
    }

    tapliveReplaceTagHTML(e) {
        var a = {"<": "&lt;", ">": "&gt;"};
        let t = e => a[e] || e;
        return e.replace(/[&<>]/g, t)
    }

    tapliveRoomListLineBreakBody(e) {
        let a = this.tapliveReplaceTagHTML(e);
        if (null !== a) {
            let t = a.trim().split("\n");
            if (t.length > 1) return t[0] + "..."
        }
        return a
    }

    tapliveRenderRoomListContent(e, a) {
        if (e.tapTalkRoom && e.tapTalkRoom.lastMessage && dc.querySelectorAll(`.${a}`).length > 0) {
            let t = `
                    <div class="taplive-chat-avatar-wrapper">
                        <div class="taplive-user-avatar-name">
                            ${"" === e.tapTalkRoom.lastMessage.room.imageURL.thumbnail ? `<b>${tapliveHelper.tapliveRenderUserAvatarWord(e.tapTalkRoom.lastMessage.room.name, !0)}</b>` : `<img src="${e.tapTalkRoom.lastMessage.room.imageURL.thumbnail}" alt="" />`}
    
                        </div>
                    </div>
    
                    <div class="taplive-dialog-message-wrapper">
                        <div class="taplive-dialog-top">
                            <b><p>${e.topicName} (#${e.stringID})</p></b>
                            
                            <span class="taplive-dialog-date">
                                ${tapliveHelper.tapliveIsToday(e.tapTalkRoom.lastMessage.created) ? new Date(e.tapTalkRoom.lastMessage.created).getHours() + ":" + (10 > new Date(e.tapTalkRoom.lastMessage.created).getMinutes() ? "0" : "") + new Date(e.tapTalkRoom.lastMessage.created).getMinutes() : tapliveHelper.tapliveIsYerterday(e.tapTalkRoom.lastMessage.created) ? "Yesterday" : new Date(e.tapTalkRoom.lastMessage.created).getDate() + "/" + (new Date(e.tapTalkRoom.lastMessage.created).getMonth() + 1) + "/" + new Date(e.tapTalkRoom.lastMessage.created).getFullYear()}
                            </span>
                        </div>
                        <div class="taplive-dialog-bottom">
                            <p>
                                ${e.tapTalkRoom.lastMessage.user.userID === taptalk.getTaptalkActiveUser().userID ? "You" : e.tapTalkRoom.lastMessage.user.fullname}
                            </p>
    
                            <p class="last-message-room-list">
                                ${this.tapliveRoomListLineBreakBody(e.tapTalkRoom.lastMessage.body)}
                            </p>
    
                            <p class="typing-room-list">
                                Typing<span class="typing-dot-one">.</span><span class="typing-dot-two">.</span><span class="typing-dot-three">.</span>
                            </p>
    
                            <div class="taplive-message-status">
                                ${e.tapTalkRoom.lastMessage.user.userID !== taptalk.getTaptalkActiveUser().userID && e.tapTalkRoom.unreadCount > 0 ? `
                                    <div class="taplive-unread-count-wrapper">
                                        <b>${e.tapTalkRoom.unreadCount > 99 ? "99+" : e.tapTalkRoom.unreadCount}</b>
                                    </div>
                                    ` : ""}
    
                                ${e.tapTalkRoom.lastMessage.user.userID === taptalk.getTaptalkActiveUser().userID ? `
                                    <img src="${tapliveStorageBaseURL}/image/room-list/${(() => {
                let a;
                if (9001 !== e.tapTalkRoom.lastMessage.type) switch (e.tapTalkRoom.lastMessage.isSending && (a = "sending"), e.tapTalkRoom.lastMessage.isSending || e.tapTalkRoom.lastMessage.isDelivered || (a = "sent"), e.tapTalkRoom.lastMessage.isSending || !e.tapTalkRoom.lastMessage.isDelivered || e.tapTalkRoom.lastMessage.isRead || (a = "receive"), e.tapTalkRoom.lastMessage.isRead && (a = "read"), e.tapTalkRoom.lastMessage.isDeleted && (a = "deleted"), a) {
                    case"sending":
                        return "icon-airplane-dark.svg";
                    case"sent":
                        return "icon-checkmark-grey-1-room.svg";
                    case"receive":
                        return "icon-checkmark-grey-2-room.svg";
                    case"deleted":
                        return "icon-notallowed-room.svg";
                    case"read":
                        return TapTalkLive.isReadStatusHidden ? "icon-checkmark-grey-2-room.svg" : "icon-checkmark-green-2-room.svg";
                    default:
                        return "icon-alertexclamation-room.svg"
                }
            })()}" alt="" />
                                    ` : ""}
                            </div>
                        </div>
                    </div>
                `;
            "taplive-room-list-outer-container" === a ? tapliveHelper.tapliveAppend("div", "taplive-chat-list-wrapper", !0, `.${a}`, t, [{
                attribute: "data-room-id",
                value: JSON.stringify(e.tapTalkRoom.lastMessage.room.roomID)
            }]) : tapliveHelper.tapliveHTML("div", "taplive-chat-list-wrapper", !0, `.${a}`, t, [{
                attribute: "data-room-id",
                value: JSON.stringify(e.tapTalkRoom.lastMessage.room.roomID)
            }])
        }
    }

    tapliveLoopRenderRoomListContent() {
        setTimeout(() => {
            dc.querySelectorAll(".taplive-room-list-outer-container").length > 0 && (dc.querySelectorAll(".taplive-room-list-outer-container")[0].innerHTML = ""), null !== tapliveRoomListData2 && Object.keys(tapliveRoomListData2).length > 0 && Object.keys(tapliveRoomListData2).map(e => {
                this.tapliveRenderRoomListContent(tapliveRoomListData2[e], "taplive-room-list-outer-container")
            })
        }, 1e3)
    }

    tapliveRenderReview() {
        tapliveHelper.tapliveAppend("div", "taplive-review-wrapper", !0, ".taplive-main-chat-wrapper", `
            <div class="taplive-review-content-wrapper">
                <div class="taplive-review-content-head">
                    <img src="${tapliveStorageBaseURL}/image/review/icon-close.svg" id="taplive-close-review-button" />
                    <b>${TapTalkLive.getTapliveLanguageVar().review.text1}</b>
                </div>

                <div class="taplive-review-content-body">
                    <div class="taplive-review-content-body-star-wrapper">
                        <div class="taplive-star-image-wrapper">
                            <img src="${tapliveStorageBaseURL}/image/review/stars-0.svg" class="taplive-star-image">

                            <div class="taplive-star-image-click-wrapper">
                                <div class="taplive-star-image-click-content" data-star="1"></div>
                                <div class="taplive-star-image-click-content" data-star="2"></div>
                                <div class="taplive-star-image-click-content" data-star="3"></div>
                                <div class="taplive-star-image-click-content" data-star="4"></div>
                                <div class="taplive-star-image-click-content" data-star="5"></div>
                            </div>
                        </div>

                        <p class="taplive-star-word">
                            <b>No Rating</b>
                        </p>
                    </div>

                    <label>
                        <b>${TapTalkLive.getTapliveLanguageVar().review.text4}</b><span class="taplive-grey-text taplive-font-14">(${TapTalkLive.getTapliveLanguageVar().review.text5})</span>
                    </label>
                    <textarea tabindex="-1" rows="3" maxlength="1000" placeholder="${TapTalkLive.getTapliveLanguageVar().review.text2}" class="taplive-review-comment" onkeyup="tapliveHelper.tapliveOnChangeReview()" ></textarea>
                    <p class="taplive-review-text-length taplive-grey-text">
                        (1/1000)
                    </p>
                </div>

                <div class="taplive-review-content-foot">
                    <button class="taplive-main-brand-button taplive-submit-review-button" id="taplive-submit-review" tabindex="-1">
                        <b>${TapTalkLive.getTapliveLanguageVar().review.text3}</b>
                    </button>
                </div>
            </div>
        `)
    }

    tapliveRenderChatRoomMessageState(e) {
        let a = "";
        return e.isSending && (a = "icon-airplane-dark.svg"), e.isSending || e.isDelivered || e.isRead || (a = "icon-check-dark.svg"), e.isSending || !e.isDelivered || e.isRead || (a = "icon-double-check-dark.svg"), e.isRead && (a = TapTalkLive.isReadStatusHidden ? "icon-double-check-dark.svg" : "icon-double-check-white.svg"), a
    }

    tapliveRenderChatRoomMessageStateLight(e) {
        let a = "";
        return e.isSending && (a = "icon-airplane-light.svg"), e.isSending || e.isDelivered || e.isRead || (a = "icon-check-light.svg"), e.isSending || !e.isDelivered || e.isRead || (a = "icon-double-check-light.svg"), e.isRead && (a = TapTalkLive.isReadStatusHidden ? "icon-double-check-light.svg" : "icon-double-check-white.svg"), a
    }

    tapliveRenderChatRoom() {
        tapliveHelper.tapliveAppend("div", "taplive-main-chat-room-wrapper", !0, ".taplive-main-chat-wrapper", `
            <div class="taplive-main-chat-room-header">
                <img 
                    class="taplive-main-chat-room-back-button" 
                    src="../assets/arrow-left.svg"
                    onclick="tapliveHelper.tapliveOnClickCancelReply()"
                >
                <p class="taplive-main-chat-room-case-id">
                    <b>Case ID #123445</b>
                </p>
            </div>

            <div class="taplive-main-chat-room-container" tabindex="-1">
                <div class="taplive-blocking-loading">
                    <div class="taplive-lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

                <div class="taplive-main-chat-room-bubble-container">

                </div>

            </div>
        `, [{attribute: "tabindex", value: "-1"}])
    }

    tapliveLineBreakCheck(e) {
        let a = this.tapliveReplaceTagHTML(e);
        return null !== a ? a.trim().replace(RegExp("\n", "g"), "<br />") : a
    }

    tapliveConvertUrl(e) {
        var a;
        let t = /(\?)+$/, i = e => "http://" === e.substring(0, 7), l = e => "https://" === e.substring(0, 8),
            p = e => "www." === e.substring(0, 4), r;
        return r = /^[A-Za-z0-9]/, (a = e).replace(/((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi, function (e) {
            let a = e, o = e, n = "", s = e => {
                r.test(e) && v()
            }, v = () => {
                l(e) || i(e) || (o = "http://" + e);
                let p = null !== o.match(t) ? e.match(t) : "";
                a = `<a tabindex="-1" class="taplive-hyperlink" target="_blank" href="${o = o.replace(t, "")}">${e = e.replace(t, "")}</a>${"" === p ? "" : p[0]}`
            };
            return r.test(e) && !tapliveCheckEmailFormat(e) && (p(e) ? s(n = e.replace("www.", "")) : i(e) ? s(n = e.replace("http://", "")) : l(e) ? s(n = e.replace("https://", "")) : v()), a
        })
    }

    tapliveRenderChatBubbleInfo(e, a = null) {
        let t, i, l;
        var p, r = `
            <div class="taplive-chat-room-info-wrapper" data-chat-id="${e.localID}"]>
                <div class="taplive-chat-room-info-content">
                    <b>${(t = (p = e).user.userID === taptalk.getTaptalkActiveUser().userID ? "You" : p.user.fullname, i = p.target.targetID === taptalk.getTaptalkActiveUser().userID ? "you" : p.target.targetName, l = p.body.replace("{{sender}}", t).replace("{{target}}", i))}</b>
                </div>
            </div>
        `;
        null === a ? e.isHidden || tapliveHelper.tapliveAppend("div", "taplive-chat-room-info-wrapper", !0, ".taplive-main-chat-room-bubble-container", r, [{
            attribute: "data-chat-id",
            value: e.localID
        }]) : dc.querySelectorAll(`[data-chat-id="${a}"]`).length > 0 && (dc.querySelectorAll(`[data-chat-id="${a}"]`)[0].innerHTML = `${r}`)
    }

    tapliveRenderChatBubbleReview(e, a = null) {
        var t = `
            <div class="taplive-group-sender-avatar-wrapper" style="background: ${taptalk.getRandomColor(e.user.fullname)};">
                ${"" === e.user.imageURL.thumbnail ? `<b>${tapliveHelper.tapliveRenderUserAvatarWord(e.user.fullname)}</b>` : `<img src="${e.user.imageURL.thumbnail}" alt="">`}
            </div>

            <div class="taplive-message-in-bubble taplive-message-review-bubble">
                <p class="taplive-group-sender-name-wrapper">
                    <b>${e.user.fullname}</b>
                </p>

                <span class="taplive-message-body">${this.tapliveConvertUrl(this.tapliveLineBreakCheck(e.body))}</span>

                ${e.type !== TapTalkLive.chatType.TAPChatMessageTypeLeaveReviewDisabled ? `
                            <button class="taplive-main-brand-button taplive-review-button-bubble" tabindex="-1">
                                <b>${TapTalkLive.getTapliveLanguageVar().review.text1}</b>
                            </button>
                            ` : ""}

                <!-- "messageActionView(props.singleChatDataProps.body)" -->
            </div>
        `;
        null === a ? tapliveHelper.tapliveAppend("div", "taplive-chat-room-message-in-wrapper", !0, ".taplive-main-chat-room-bubble-container", t, [{
            attribute: "data-chat-id",
            value: e.localID
        }]) : e.isHidden && tapliveHelper.tapliveRemoveMessageInBubble(e.localID)
    }

    tapliveRenderImageForBubbleReply(e, a) {
        let t = dc.querySelectorAll(`[data-chat-id="${a}"] .taplive-reply-file-media-wrapper`);
        for (let i = 0; i < t.length; i++) t[i].innerHTML = `
                <img 
                    src="data:image/png;base64, ${e}"
                    alt="reply"  
                    class="taplive-reply-message-image"
                ></img>
            `
    }

    tapliveRenderVideoForBubbleReply(e, a) {
        let t = dc.querySelectorAll(`[data-chat-id="${a}"] .taplive-reply-file-media-wrapper`);
        for (let i = 0; i < t.length; i++) t[i].innerHTML = `
                <video
                    src="data:video/mp4;base64, ${e}"
                    class="taplive-reply-message-video"
                    tabindex="-1"
                ></video>
            `
    }

    tapliveRenderReplyMedia(e, a) {
        e.replyTo.messageType === CHAT_TYPE.TAPChatMessageTypeVideo && this.tapliveRenderVideoForBubbleReply(a, e.localID), e.replyTo.messageType === CHAT_TYPE.TAPChatMessageTypeImage && this.tapliveRenderImageForBubbleReply(a, e.localID)
    }

    tapliveRenderChatBubbleReplyMessageIn(e) {
        let a = this, t = taptalk.getTaptalkActiveUser().userID, i = "", l = () => {
            tapCoreChatRoomManager.getFileFromDB(e.quote.fileID, function (t) {
                t ? a.tapliveRenderReplyMedia(e, t.file) : p()
            })
        }, p = async () => {
            let t = {room: {roomID: tapliveChatRoomData.room.roomID}, data: {fileID: e.quote.fileID}};
            tapCoreChatRoomManager.downloadMessageFile(t, {
                onSuccess(t) {
                    a.tapliveRenderReplyMedia(e, t.base64)
                }, onProgress(e, a, t) {
                }, onError(e, a) {
                    console.log(e, a)
                }
            })
        };
        return e.replyTo.messageType === CHAT_TYPE.TAPChatMessageTypeImage && (e.quote.imageURL && "" !== e.quote.imageURL ? i = e.quote.imageURL : l()), e.replyTo.messageType === CHAT_TYPE.TAPChatMessageTypeVideo && (e.quote.videoURL && "" !== e.quote.videoURL ? i = e.quote.videoURL : l()), `
                <div class="taplive-reply-message-in-bubble ${e.replyTo.messageType === CHAT_TYPE.TAPChatMessageTypeText ? "" : "taplive-with-media-or-file"} taplive-reply-bubble" data-local-id="${e.replyTo.localID}">
                    <div class="taplive-reply-message-in-bubble-name-text-wrapper taplive-with-border ${e.replyTo.messageType !== CHAT_TYPE.TAPChatMessageTypeText ? "taplive-with-media-file" : ""}">
                        ${e.replyTo.messageType !== CHAT_TYPE.TAPChatMessageTypeText ? `
                                <div class="taplive-reply-file-media-wrapper">
                                    ${e.replyTo.messageType === CHAT_TYPE.TAPChatMessageTypeImage ? "" !== i ? `
                                                <img 
                                                    src="${i}"
                                                    alt="reply"  
                                                    class="taplive-reply-message-image"
                                                ></img>
                                            ` : "" : e.replyTo.messageType === CHAT_TYPE.TAPChatMessageTypeVideo ? "" !== i ? `
                                                <video
                                                    src="${i}"
                                                    class="taplive-reply-message-video"
                                                    tabindex="-1"
                                                ></video>
                                                ` : "" : e.replyTo.messageType === CHAT_TYPE.TAPChatMessageTypeFile ? `
                                                <div class="taplive-reply-message-file">
                                                    <img src="${tapliveStorageBaseURL}/image/chat-room/bubble/icon-paper.svg">
                                                </div>
                                            ` : ""}
                                </div>
                            ` : ""}
                        
                        <div class="taplive-reply-message-in-bubble-reply-name-wrapper">
                            <p class="taplive-reply-message-in-bubble-reply-name">
                                <b>${e.replyTo.userID === t ? "You" : e.quote.title}</b>
                            </p>

                            <p class="taplive-reply-message-in-bubble-reply-text">
                                ${e.quote.content}
                            </p>
                        </div>
                    </div>
                </div>
            `
    }

    tapliveRenderChatBubbleReplyMessageOut(e) {
        let a = this, t = taptalk.getTaptalkActiveUser().userID, i = "", l = () => {
            tapCoreChatRoomManager.getFileFromDB(e.quote.fileID, function (t) {
                t ? a.tapliveRenderReplyMedia(e, t.file) : p()
            })
        }, p = async () => {
            let t = {room: {roomID: tapliveChatRoomData.room.roomID}, data: {fileID: e.quote.fileID}};
            tapCoreChatRoomManager.downloadMessageFile(t, {
                onSuccess(t) {
                    a.tapliveRenderReplyMedia(e, t.base64)
                }, onProgress(e, a, t) {
                }, onError(e, a) {
                    console.log(e, a)
                }
            })
        };
        return e.replyTo.messageType === CHAT_TYPE.TAPChatMessageTypeImage && (e.quote.imageURL && "" !== e.quote.imageURL ? i = e.quote.imageURL : l()), e.replyTo.messageType === CHAT_TYPE.TAPChatMessageTypeVideo && (e.quote.videoURL && "" !== e.quote.videoURL ? i = e.quote.videoURL : l()), `
                <div class="taplive-reply-message-out-bubble ${e.replyTo.messageType === CHAT_TYPE.TAPChatMessageTypeText ? "" : "taplive-with-media-or-file"} taplive-reply-bubble" data-local-id="${e.replyTo.localID}">
                    <div class="taplive-reply-message-out-bubble-name-text-wrapper taplive-with-border ${e.replyTo.messageType !== CHAT_TYPE.TAPChatMessageTypeText ? "taplive-with-media-file" : ""}">
                        ${e.replyTo.messageType !== CHAT_TYPE.TAPChatMessageTypeText ? `
                                <div class="taplive-reply-file-media-wrapper">
                                    ${e.replyTo.messageType === CHAT_TYPE.TAPChatMessageTypeImage ? "" !== i ? `
                                                <img 
                                                    src="${i}"
                                                    alt="reply"  
                                                    class="taplive-reply-message-image"
                                                ></img>
                                            ` : "" : e.replyTo.messageType === CHAT_TYPE.TAPChatMessageTypeVideo ? "" !== i ? `
                                                <video
                                                    src="${i}"
                                                    class="taplive-reply-message-video"
                                                    tabindex="-1"
                                                ></video>
                                                ` : "" : e.replyTo.messageType === CHAT_TYPE.TAPChatMessageTypeFile ? `
                                                <div class="taplive-reply-message-file">
                                                    <img src="${tapliveStorageBaseURL}/image/chat-room/bubble/icon-paper.svg">
                                                </div>
                                            ` : ""}
                                </div>
                            ` : ""}
                        
                        <div class="taplive-reply-message-out-bubble-reply-name-wrapper">
                            <p class="taplive-reply-message-out-bubble-reply-name">
                                <b>${e.replyTo.userID === t ? "You" : e.quote.title}</b>
                            </p>

                            <p class="taplive-reply-message-out-bubble-reply-text">
                                ${e.quote.content}
                            </p>
                        </div>
                    </div>
                </div>
            `
    }

    tapliveRenderTooltipView(e, a, t) {
        return `
                <div class="taplive-tooltip-view ${a} ${t}">
                    ${e}
                </div>
            `
    }

    tapliveRenderBubbleActionView(e, a) {
        return `
                <div class="taplive-bubble-action-view-wrapper ${e}">
                    <div class="taplive-action-button taplive-action-reply" onclick="tapliveHelper.tapliveOnClickReply('${a.localID}')">
                        <img src="${tapliveStorageBaseURL}/image/icon-reply.svg" class="taplive-icon-reply">
                        <img src="${tapliveStorageBaseURL}/image/icon-reply-hover.svg" class="taplive-icon-reply-hover">
                        ${this.tapliveRenderTooltipView("Reply", e, "taplive-tooltip-reply")}
                    </div>
                </div>
            `
    }

    tapliveRenderChatBubbleMessageIn(e, a = null) {
        let t = `
            <div class="taplive-group-sender-avatar-wrapper" style="background: ${taptalk.getRandomColor(e.user.fullname)};">
                ${"" === e.room.imageURL.thumbnail ? `<b>${tapliveHelper.tapliveRenderUserAvatarWord(e.user.fullname)}</b>` : `<img src="${e.room.imageURL.thumbnail}" alt="">`}
            </div>

            ${e.isDeleted ? `<div class="taplive-message-in-bubble taplive-deleted-bubble">
                        <p class="taplive-group-sender-name-wrapper">
                            <b>Admin</b>
                        </p>

                        <img src="${tapliveStorageBaseURL}/image/chat-room/icon-notallowed-grey.svg" style="position: relative; top: 4px;" class="deleted-icon" />
                        This message was deleted.
                    </div>` : `<div class="taplive-message-in-bubble">
                        ${this.tapliveRenderBubbleActionView("taplive-action-bubble-in", e)}
                        <p class="taplive-group-sender-name-wrapper">
                            <b>${e.user.fullname}</b>
                        </p>

                        ${"" !== e.replyTo.localID ? this.tapliveRenderChatBubbleReplyMessageIn(e) : ""}

                        <span class="taplive-message-body">${this.tapliveConvertUrl(this.tapliveLineBreakCheck(e.body))}</span>
                        <p class="taplive-message-info">
                            ${tapliveHelper.tapliveGetDateMonthYear(e.created)}<span class="taplive-centered-dot"></span>${tapliveHelper.tapliveGetHourMinute(e.created)}
                        </p>

                        <!-- "messageActionView(props.singleChatDataProps.body)" -->
                    </div>`}
        `;
        null === a ? e.isHidden || tapliveHelper.tapliveAppend("div", "taplive-chat-room-message-in-wrapper", !0, ".taplive-main-chat-room-bubble-container", t, [{
            attribute: "data-chat-id",
            value: e.localID
        }]) : dc.querySelectorAll(`[data-chat-id="${a}"]`).length > 0 && (dc.querySelectorAll(`[data-chat-id="${a}"]`)[0].innerHTML = `${t}`)
    }

    tapliveRenderChatBubbleMessageOut(e, a = null) {
        let t = `
            ${e.isDeleted ? `<div class="taplive-message-out-bubble taplive-deleted-bubble">
                            <img src="${tapliveStorageBaseURL}/image/chat-room/icon-notallowed-white.svg" class="taplive-deleted-icon" />
                            This message was deleted.
                    </div>` : `<div class="taplive-message-out-bubble">
                        ${this.tapliveRenderBubbleActionView("taplive-action-bubble-out", e)}
                        ${"" !== e.replyTo.localID ? this.tapliveRenderChatBubbleReplyMessageOut(e) : ""}
                        <span class="taplive-message-body">
                            ${this.tapliveConvertUrl(this.tapliveLineBreakCheck(e.body))}
                        </span>

                        <p class="taplive-message-info">
                            ${tapliveHelper.tapliveGetDateMonthYear(e.created)}<span class="taplive-centered-dot taplive-centered-dot-white"></span>${tapliveHelper.tapliveGetHourMinute(e.created)}

                            <img src="${tapliveStorageBaseURL}/image/chat-room/${tapliveView.tapliveRenderChatRoomMessageState(e)}" />
                        </p>
                    </div>`}
        `;
        null === a ? e.isHidden || tapliveHelper.tapliveAppend("div", "taplive-chat-room-message-out-wrapper", !0, ".taplive-main-chat-room-bubble-container", t, [{
            attribute: "data-chat-id",
            value: e.localID
        }]) : dc.querySelectorAll(`[data-chat-id="${a}"]`).length > 0 && (dc.querySelectorAll(`[data-chat-id="${a}"]`)[0].innerHTML = `${t}`)
    }

    tapliveRenderChatBubbleMessageImageIn(e, a = null) {
        let t = `
            <div class="taplive-group-sender-avatar-wrapper" style="background: ${taptalk.getRandomColor(e.user.fullname)};">
                ${"" === e.room.imageURL.thumbnail ? `<b>${tapliveHelper.tapliveRenderUserAvatarWord(e.user.fullname)}</b>` : `<img src="${e.room.imageURL.thumbnail}" alt="">`}
            </div>

            <div class="taplive-message-in-bubble taplive-not-sent-message-bubble">
                ${this.tapliveRenderBubbleActionView("taplive-action-bubble-in", e)}
                <div class="taplive-bubble-image-wrapper ${"" === e.data.caption ? "taplive-bubble-wrapper-without-caption" : "taplive-bubble-wrapper-with-caption"}">
                    ${"" !== e.replyTo.localID ? this.tapliveRenderChatBubbleReplyMessageIn(e) : ""}

                    <div class="taplive-image-inner-wrapper">
                        <img src="${e.data.fileURL}" class="taplive-main-image-message taplive-main-image-message-clicker" data-image-url="${e.data.fileURL}" data-image-id="${e.data.fileID}" />
                    </div>
                </div>

                ${"" !== e.data.caption && `<p class="taplive-caption-text">
                        ${e.data.caption}
                    </p>`}

                <p class="taplive-message-info ${"" === e.data.caption ? "taplive-message-info-dark" : "taplive-message-info-with-caption"}">
                    ${tapliveHelper.tapliveGetDateMonthYear(e.created)}<span class="taplive-centered-dot taplive-centered-dot-white"></span>${tapliveHelper.tapliveGetHourMinute(e.created)}
                </span>
            </div>
        `;
        null === a ? e.isHidden || tapliveHelper.tapliveAppend("div", "taplive-chat-room-message-image-in-wrapper", !0, ".taplive-main-chat-room-bubble-container", t, [{
            attribute: "data-chat-id",
            value: e.localID
        }]) : dc.querySelectorAll(`[data-chat-id="${a}"]`).length > 0 && (dc.querySelectorAll(`[data-chat-id="${a}"]`)[0].innerHTML = `${t}`)
    }

    tapliveRenderChatBubbleMessageImageOut(e, a = null) {
        let t = e.data.fileURL, i = `
            <!-- <div class="taplive-message-out-bubble $"props.status !== 'uploaded' ? 'taplive-not-sent-message-bubble' : ''"'" -->
            <div class="taplive-message-out-bubble taplive-not-sent-message-bubble">
                ${this.tapliveRenderBubbleActionView("taplive-action-bubble-out", e)}
                <div class="taplive-bubble-image-wrapper ${"" === e.data.caption ? "taplive-bubble-wrapper-without-caption" : "taplive-bubble-wrapper-with-caption"}">
                    ${"" !== e.replyTo.localID ? this.tapliveRenderChatBubbleReplyMessageOut(e) : ""}
                    <div class="taplive-image-inner-wrapper">
                        ${t ? `
                                <img src="${e.data.fileURL}" alt="" class="taplive-main-image-message taplive-main-image-message-clicker" data-image-url="${e.data.fileURL}" data-image-id="${e.data.fileID}" />
                            ` : `
                                <img src="data:image/jpeg;base64,${e.data.thumbnail}" alt="" class="taplive-main-image-message" />
                            `}

                        ${!t && `
                                <div class="taplive-icon-status-wrapper">
                                    <img src="${tapliveStorageBaseURL}/image/chat-room/bubble/icon-upload-white.svg">

                                    <div class="taplive-lds-ring">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                            `}
                    </div>
                </div>

                ${"" !== e.data.caption && `<p class="taplive-caption-text">
                        ${e.data.caption}
                    </p>`}

                <p class="taplive-message-info ${"" === e.data.caption ? "taplive-message-info-dark" : "taplive-message-info-with-caption"}">
                    ${tapliveHelper.tapliveGetDateMonthYear(e.created)}<span class="taplive-centered-dot taplive-centered-dot-white"></span>${tapliveHelper.tapliveGetHourMinute(e.created)}

                    <img src="${tapliveStorageBaseURL}/image/chat-room/${"" === e.data.caption ? tapliveView.tapliveRenderChatRoomMessageStateLight(e) : tapliveView.tapliveRenderChatRoomMessageState(e)}" />
                </p>
            </div>

            <!-- "messageActionView(props.singleChatDataProps)" -->

            <!--<br />-->
            <!--<b class="taplive-failed-sending-file-warning">Failed to send tap to retry</b>-->
        `;
        null === a ? e.isHidden || tapliveHelper.tapliveAppend("div", "taplive-chat-room-message-image-out-wrapper", !0, ".taplive-main-chat-room-bubble-container", i, [{
            attribute: "data-chat-id",
            value: e.localID
        }]) : dc.querySelectorAll(`[data-chat-id="${a}"]`).length > 0 && (dc.querySelectorAll(`[data-chat-id="${a}"]`)[0].innerHTML = `${i}`)
    }

    tapliveRenderChatBubbleMessageVideoIn(e, a = null) {
        let t = `
            <div class="taplive-group-sender-avatar-wrapper" style="background: ${taptalk.getRandomColor(e.user.fullname)};">
                ${"" === e.room.imageURL.thumbnail ? `<b>${tapliveHelper.tapliveRenderUserAvatarWord(e.user.fullname)}</b>` : `<img src="${e.room.imageURL.thumbnail}" alt="">`}
            </div>

            <div class="taplive-message-in-bubble taplive-not-sent-message-bubble">
                ${this.tapliveRenderBubbleActionView("taplive-action-bubble-in", e)}
                <div class="taplive-bubble-image-wrapper ${"" === e.data.caption ? "taplive-bubble-wrapper-without-caption" : "taplive-bubble-wrapper-with-caption"}">
                    ${"" !== e.replyTo.localID ? this.tapliveRenderChatBubbleReplyMessageIn(e) : ""}

                    <div class="taplive-video-inner-wrapper">
                        <span class="taplive-timer-filesize-wrapper">
                            ${tapliveHelper.msToTime(e.data.duration)}
                        </span>

                        <video src="${e.data.fileURL}" class="taplive-video-thumbnail" tabindex="-1"></video>

                        <div class="bubble-action-icon-wrapper taplive-main-video-message-clicker" data-video-url="${e.data.fileURL}" data-video-id="${e.data.fileID}">
                            <img src="${tapliveStorageBaseURL}/image/chat-room/bubble/icon-play.svg"></img>
                        </div>
                    </div>
                </div>

                ${"" !== e.data.caption && `<p class="taplive-caption-text">
                        ${e.data.caption}
                    </p>`}

                <p class="taplive-message-info ${"" === e.data.caption ? "taplive-message-info-dark" : "taplive-message-info-with-caption"}">
                    ${tapliveHelper.tapliveGetDateMonthYear(e.created)}<span class="taplive-centered-dot"></span>${tapliveHelper.tapliveGetHourMinute(e.created)}
                </p>
            </div>

            <!-- "messageActionView()" -->

            <!-- "isVideoExistInDB && generateModalVideo()" -->
        `;
        null === a ? e.isHidden || tapliveHelper.tapliveAppend("div", "taplive-chat-room-message-video-in-wrapper", !0, ".taplive-main-chat-room-bubble-container", t, [{
            attribute: "data-chat-id",
            value: e.localID
        }]) : dc.querySelectorAll(`[data-chat-id="${a}"]`).length > 0 && (dc.querySelectorAll(`[data-chat-id="${a}"]`)[0].innerHTML = `${t}`)
    }

    tapliveRenderChatBubbleMessageVideoOut(e, a = null) {
        let t = e.data.fileURL, i = `
            <!-- <div class="taplive-message-out-bubble $"props.status !== 'taplive-uploaded' ? 'taplive-not-sent-message-bubble' : ''"'" -->
            <div class="taplive-message-out-bubble taplive-not-sent-message-bubble">
                ${this.tapliveRenderBubbleActionView("taplive-action-bubble-out", e)}
                <div class="taplive-bubble-image-wrapper ${"" === e.data.caption ? "taplive-bubble-wrapper-without-caption" : "taplive-bubble-wrapper-with-caption"}">
                    ${"" !== e.replyTo.localID ? this.tapliveRenderChatBubbleReplyMessageOut(e) : ""}
                    <div class="taplive-video-inner-wrapper">
                        <span class="taplive-timer-filesize-wrapper">
                            ${tapliveHelper.msToTime(e.data.duration)}
                        </span>

                        ${t ? `<video src="${e.data.fileURL}" class="taplive-video-thumbnail" tabindex="-1"></video>` : `<img src="data:image/jpg;base64, ${e.data.thumbnail}" class="taplive-video-image-thumbnail" />`}

                        ${t ? `
                                <div class="bubble-action-icon-wrapper taplive-main-video-message-clicker" data-video-url="${e.data.fileURL}" data-video-id="${e.data.fileID}">
                                    <img src="${tapliveStorageBaseURL}/image/chat-room/bubble/icon-play.svg">
                                </div>
                            ` : `
                                <div class="taplive-icon-status-wrapper">
                                    <img src="${tapliveStorageBaseURL}/image/chat-room/bubble/icon-upload-white.svg">

                                    <div class="taplive-lds-ring">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                            `}
                    </div>
                </div>

                ${"" !== e.data.caption && `<p class="taplive-caption-text">
                        ${e.data.caption}
                    </p>`}

                <p class="taplive-message-info ${"" === e.data.caption ? "taplive-message-info-dark" : "taplive-message-info-with-caption"}">
                    ${tapliveHelper.tapliveGetDateMonthYear(e.created)}<span class="taplive-centered-dot taplive-centered-dot-white"></span>${tapliveHelper.tapliveGetHourMinute(e.created)}

                    <img src="${tapliveStorageBaseURL}/image/chat-room/${"" === e.data.caption ? tapliveView.tapliveRenderChatRoomMessageStateLight(e) : tapliveView.tapliveRenderChatRoomMessageState(e)}" />
                </p>
            </div>

            <!-- "messageActionView(props.singleChatDataProps)" -->

            <!-- "isVideoExistInDB && generateModalVideo()" -->
        `;
        null === a ? e.isHidden || tapliveHelper.tapliveAppend("div", "taplive-chat-room-message-video-out-wrapper", !0, ".taplive-main-chat-room-bubble-container", i, [{
            attribute: "data-chat-id",
            value: e.localID
        }]) : dc.querySelectorAll(`[data-chat-id="${a}"]`).length > 0 && (dc.querySelectorAll(`[data-chat-id="${a}"]`)[0].innerHTML = `${i}`)
    }

    tapliveRenderChatBubbleMessageFileIn(e, a = null) {
        let t = e.data.fileName ? e.data.fileName : e.body, i, l = `
            <div class="taplive-group-sender-avatar-wrapper" style="background: ${taptalk.getRandomColor(e.user.fullname)};">
                ${"" === e.user.imageURL.thumbnail ? `<b>${tapliveHelper.tapliveRenderUserAvatarWord(e.user.fullname)}</b>` : `<img src="${e.user.imageURL.thumbnail}" alt="">`}
            </div>

            <div class="taplive-message-in-bubble">
                ${this.tapliveRenderBubbleActionView("taplive-action-bubble-in", e)}
                <div class="taplive-message-bubble-file-wrapper" data-chat-id="${e.localID}">
                    ${"" !== e.replyTo.localID ? this.tapliveRenderChatBubbleReplyMessageIn(e) : ""}

                    <a href="${e.data.fileURL}" target="_blank" rel="noopener noreferrer" class="taplive-click-area-file" tabindex="-1">
                        <div class="taplive-file-icon-wrapper taplive-file-icon-in-wrapper" data-chat-id="${e.localID}">
                            <img src="${tapliveStorageBaseURL}/image/chat-room/bubble/icon-paper.svg">
                        </div>
                                
                        <div class="taplive-file-detail-wrapper">
                            <div class="taplive-filename-wrapper">
                                <p>
                                    <b>${t = t.replace(`.${t.split(".")[t.split(".").length - 1]}`, "")}.${t.split(".")[t.split(".").length - 1]}</b>
                                </p>
                            </div>
                            
                            <div class="taplive-message-file-in-filesize">
                            <div class="taplive-message-filesize-progress"></div>${tapliveHelper.tapliveBytesToSize(e.data.size)}
                            </div>
                            
                            <!-- "onFileDownloadProgress && '$"bytesDownload" / '"
                            
                            "props.singleChatDataProps.bytesUpload !== undefined && '$"Helper.tapliveHelper.tapliveBytesToSize(props.singleChatDataProps.bytesUpload)" / '"
                            
                            "Helper.tapliveHelper.tapliveBytesToSize(props.singleChatDataProps.data.size)"-->
                        </div>
                    </a>
                </div>

                <p class="taplive-message-info">
                    ${tapliveHelper.tapliveGetDateMonthYear(e.created)}<span class="taplive-centered-dot"></span>${tapliveHelper.tapliveGetHourMinute(e.created)}
                </p>

                <!-- "messageActionView()" -->
            </div>
        `;
        null === a ? tapliveHelper.tapliveAppend("div", "taplive-chat-room-message-file-in-wrapper", !0, ".taplive-main-chat-room-bubble-container", l, [{
            attribute: "data-chat-id",
            value: e.localID
        }]) : dc.querySelectorAll(`[data-chat-id="${a}"]`).length > 0 && (dc.querySelectorAll(`[data-chat-id="${a}"]`)[0].innerHTML = `${l}`)
    }

    tapliveRenderChatBubbleMessageFileOut(e, a = null) {
        let t = e.data.fileURL, i = e.data.fileName ? e.data.fileName : e.body,
            l = i.split(".")[i.split(".").length - 1];
        i = i.replace(`.${i.split(".")[i.split(".").length - 1]}`, "");
        let p = `
            <div class="taplive-message-out-bubble">
                ${this.tapliveRenderBubbleActionView("taplive-action-bubble-out", e)}
                <div class="taplive-message-bubble-file-wrapper">
                    ${"" !== e.replyTo.localID ? this.tapliveRenderChatBubbleReplyMessageOut(e) : ""}
                    ${t ? `
                            <a href="${e.data.fileURL}" target="_blank" rel="noopener noreferrer" class="taplive-click-area-file" tabindex="-1">
                                <div class="taplive-file-icon-wrapper taplive-file-icon-out-wrapper" data-chat-id="${e.localID}">
                                    <img src="${tapliveStorageBaseURL}/image/chat-room/bubble/icon-paper-black.svg">
                                </div>

                                <div class="taplive-file-detail-wrapper">
                                    <div class="taplive-filename-wrapper">
                                        <p>
                                            <b>${i}.${l}</b>
                                        </p>
                                    </div>

                                    <div class="taplive-message-file-out-filesize">
                                        <div class="taplive-message-filesize-progress"></div>${tapliveHelper.tapliveBytesToSize(e.data.size)}
                                    </div>
                                </div>
                            </a>
                        ` : `
                            <div class="taplive-file-icon-wrapper taplive-file-icon-out-wrapper" data-chat-id="${e.localID}">
                                <div class="taplive-file-bubble-circular-progress-wrapper">
                                    <div class="taplive-lds-ring taplive-lds-ring-file-out">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>

                                    <img src="${tapliveStorageBaseURL}/image/chat-room/bubble/icon-upload-black.svg">
                                </div>
                            </div>
                            
                            <div class="taplive-file-detail-wrapper">
                                <div class="taplive-filename-wrapper">
                                    <p>
                                        <b>${i}.${l}</b>
                                    </p>
                                </div>
        
                                <div class="taplive-message-file-out-filesize">
                                    <div class="taplive-message-filesize-progress"></div>${tapliveHelper.tapliveBytesToSize(e.data.size)}
                                </div>
                            </div>
                        `}
                </div>

                <p class="taplive-message-info">
                    ${tapliveHelper.tapliveGetDateMonthYear(e.created)}<span class="taplive-centered-dot taplive-centered-dot-white"></span>${tapliveHelper.tapliveGetHourMinute(e.created)}

                    <img src="${tapliveStorageBaseURL}/image/chat-room/${tapliveView.tapliveRenderChatRoomMessageState(e)}">
                </span>
            </div>
        `;
        null === a ? tapliveHelper.tapliveAppend("div", "taplive-chat-room-message-file-out-wrapper", !0, ".taplive-main-chat-room-bubble-container", p, [{
            attribute: "data-chat-id",
            value: e.localID
        }]) : dc.querySelectorAll(`[data-chat-id="${a}"]`).length > 0 && (dc.querySelectorAll(`[data-chat-id="${a}"]`)[0].innerHTML = `${p}`)
    }

    tapliveRenderFullScreenLoading() {
        tapliveHelper.tapliveAppend("div", "taplive-full-loading", !0, ".taplive-outer-container", `
            <div class="taplive-full-loading-content">
                <div class="taplive-lds-ring">
                    <div></div><div></div><div></div><div></div>
                </div>
                <br>
                <p>Please Wait</p>
            </div>
        `)
    }

    tapliveRenderImagePreview() {
        tapliveHelper.tapliveAppend("div", "taplive-fullscreen-background-dark taplive-image-preview-panel taplive-fade-element", !0, ".taplive-outer-container", `
            <div>
                <img src="${tapliveStorageBaseURL}/image/icon-close.svg" class="taplive-close-blackscreen taplive-close-preview-panel">

                <div class="taplive-image-preview-wrapper">
                    <figure 
                        class="taplive-zoom-figure"
                    >
                        <img class="taplive-image-preview-value" src="">
                    </figure>
                </div>
            </div>
        `)
    }

    tapliveRenderVideoPreview() {
        tapliveHelper.tapliveAppend("div", "taplive-fullscreen-background-dark taplive-video-preview-panel taplive-fade-element", !0, ".taplive-outer-container", `
            <div>
                <img src="${tapliveStorageBaseURL}/image/icon-close.svg" class="taplive-close-blackscreen taplive-close-preview-panel">

                <video class="taplive-video-preview-value" src="" controls tabindex="-1"></video>
            </div>
        `)
    }

    tapliveRenderVideoPreuploadView() {
        tapliveHelper.tapliveAppend("div", "taplive-fullscreen-background-dark taplive-video-preupload-panel taplive-fade-element", !0, ".taplive-outer-container", `
            <div>
                <img src="${tapliveStorageBaseURL}/image/icon-close.svg" class="taplive-close-blackscreen taplive-close-preupload-panel">

                <div class="taplive-video-preupload-file-wrapper taplive-preupload-file-wrapper">
                    <video class="taplive-video-preupload-value" src="" controls tabindex="-1"></video>
                    <input type="text" placeholder="${TapTalkLive.getTapliveLanguageVar().captionPlaceHolder.text1}" class="taplive-caption-input" maxlength="100">

                    <img src="${tapliveStorageBaseURL}/image/chat-room/icon-airplane-white.svg" class="taplive-send-media-button-submit" id="taplive-submit-video">
                    <div class="taplive-caption-limit">
                        0/100
                    </div>
                <div>
            </div>
        `)
    }

    tapliveRenderImagePreuploadView() {
        tapliveHelper.tapliveAppend("div", "taplive-fullscreen-background-dark taplive-image-preupload-panel taplive-fade-element", !0, ".taplive-outer-container", `
            <div>
                <img src="${tapliveStorageBaseURL}/image/icon-close.svg" class="taplive-close-blackscreen taplive-close-preupload-panel">

                <div class="taplive-image-preupload-file-wrapper taplive-preupload-file-wrapper">
                    <img class="taplive-image-preupload-value" src="">
                    <input type="text" placeholder="${TapTalkLive.getTapliveLanguageVar().captionPlaceHolder.text1}" class="taplive-caption-input" maxlength="100">

                    <img src="${tapliveStorageBaseURL}/image/chat-room/icon-airplane-white.svg" class="taplive-send-media-button-submit" id="taplive-submit-image">
                    <div class="taplive-caption-limit">
                        0/100
                    </div>
                <div>
            </div>
        `)
    }

    tapliveRenderAllView() {
        this.tapliveRenderLauncherButton(), this.tapliveRenderMainChatWrapper(), tapliveHelper.tapliveSetZIndex("taplive-outer-container", "-9999"), this.tapliveRenderSnackBar(), this.tapliveRenderStartNewCase(), this.tapliveRenderStartNewCaseWithOmnichannel(), this.tapliveRenderNewMessage(), this.tapliveRenderReview(), this.tapliveRenderChatRoom(), this.tapliveRenderImagePreview(), this.tapliveRenderVideoPreview(), this.tapliveRenderVideoPreuploadView(), this.tapliveRenderImagePreuploadView(), tapliveFaq.taplivePrintMainFaqBoxWrapper(!0)
    }
}

var tapliveView = new tapliveViewCore;

class tapliveSnackBarCore {
    constructor() {
        this.tapliveSnackBarMessageGroup = {
            empty: {
                fullname: "Please enter your name",
                email: "Please enter your email address",
                topic: "Please select a topic",
                message: "Please enter a message",
                reviewComment: "Please enter your review"
            }, format: {email: "Email address format is invalid"}
        }
    }

    tapliveSetSnackBar(e, a) {
        let t = dc.querySelectorAll(".taplive-snack-bar-wrapper")[0];
        tapliveSnackBar.state = "fail" === e ? "taplive-error-snack-bar" : "taplive-warning-snack-bar", tapliveSnackBar.message = a, "fail" === e ? (dc.querySelectorAll(".taplive-red-snack-bar-icon")[0].style.display = "block", dc.querySelectorAll(".taplive-orange-snack-bar-icon")[0].style.display = "none") : (dc.querySelectorAll(".taplive-red-snack-bar-icon")[0].style.display = "none", dc.querySelectorAll(".taplive-orange-snack-bar-icon")[0].style.display = "block"), t.className = `taplive-snack-bar-wrapper ${tapliveSnackBar.state}`, dc.querySelectorAll(".taplive-snack-bar-message")[0].innerHTML = tapliveSnackBar.message, tapliveHelper.tapliveCustomFadeIn("taplive-snack-bar-wrapper"), setTimeout(function () {
            tapliveHelper.tapliveCustomFadeOut("taplive-snack-bar-wrapper")
        }, 5e3)
    }
}

var tapliveSnackBar = new tapliveSnackBarCore;

class tapliveReviewCore {
    constructor() {
        this.tapliveReviewInput = {star: 3, note: ""}, this.tapliveReviewValue = {
            1: "Horrible",
            2: "Not good",
            3: "Okay",
            4: "Good",
            5: "Excellent"
        }
    }

    tapliveClearReviewInputValue() {
        this.tapliveReviewInput.star = "0", this.tapliveReviewInput.note = "", dc.querySelectorAll(".taplive-submit-review-button")[0].disabled = !0, dc.querySelectorAll(".taplive-star-word")[0].innerHTML = "<b>No Rating</b>", dc.querySelectorAll(".taplive-star-image")[0].src = `${tapliveStorageBaseURL}/image/review/stars-0.svg`, dc.querySelectorAll(".taplive-review-comment")[0].value = ""
    }
}

var tapliveReview = new tapliveReviewCore;

class tapliveTypingCore {
    constructor() {
        this.isTyping = !1, this.typingTimeoutID = 0, this.chatRoomTypingTimeout = null, this.roomListTypingHashmap = {}
    }

    startTyping(e) {
        !this.isTyping && (this.isTyping = !0, tapCoreChatRoomManager.sendStartTypingEmit(e))
    }

    stopTyping(e) {
        this.isTyping && (clearTimeout(tapliveTyping.typingTimeoutID), this.isTyping = !1, this.typingTimeoutID = 0, tapCoreChatRoomManager.sendStopTypingEmit(e))
    }

    runActionTypingFromRoomList(e, a) {
        if ("hide" === a) {
            let t = dc.querySelectorAll(`.taplive-chat-list-wrapper[data-room-id='${e}']`);
            for (let i = 0; i < t.length; i++) t[i].classList.remove("active-typing")
        } else {
            let l = dc.querySelectorAll(`.taplive-chat-list-wrapper[data-room-id='${e}']`);
            for (let p = 0; p < l.length; p++) l[p].classList.add("active-typing")
        }
    }
}

var tapliveTyping = new tapliveTypingCore, tapliveMessageListener = e => {
    tapCoreChatRoomManager.addMessageListener({
        onReceiveNewMessage(a) {
            e.onNewMessage(a)
        }, onReceiveUpdateMessage(a) {
            e.onUpdateMessage(a)
        }
    })
};
let roomStatusListener = e => {
    tapCoreChatRoomManager.addRoomStatusListener({
        onReceiveStartTyping(a, t) {
            e.onStartTyping(a, t)
        }, onReceiveStopTyping(a, t) {
            e.onStopTyping(a, t)
        }, onReceiveOnlineStatus(e, a, t) {
        }
    })
};
var tapliveGetUpdatedRoomList = e => {
    tapCoreRoomListManager.getUpdatedRoomList({
        onSuccess(a) {
            tapliveRoomListData = a, e.onSuccessGetUpdatedRoomList()
        }, onError(a, t) {
            console.log(a, t), e.onErrorGetUpdatedRoomList(t)
        }
    })
}, tapliveUnreadMessageAction = e => {
    let a = [];
    taptalk.getTaptalkActiveUser() && (Object.keys(e).map(t => {
        !e[t].isRead && e[t].user.userID && e[t].user.userID !== taptalk.getTaptalkActiveUser().userID && a.push(e[t].messageID)
    }), a.length > 0 && tapCoreMessageManager.markMessageAsRead(a))
}, buildLauncher = () => {
    console.log("Initiate Taplive Launcher"), tapliveHelper.tapliveAddEventForChild('.taplive-main-chat-wrapper input[type="text"], .taplive-main-chat-wrapper textarea', "keyup", function (e) {
        let a = e.target.className;
        a.includes("taplive-new-case-fullname") && (tapliveCreateCaseInput.fullname = e.target.value), a.includes("taplive-new-case-email") && (tapliveCreateCaseInput.email = e.target.value), a.includes("taplive-new-case-message") && (tapliveCreateCaseInput.message = e.target.value), a.includes("taplive-review-comment") && (tapliveReview.tapliveReviewInput.note = e.target.value), a.includes("taplive-new-message-input") && (tapliveCreateCaseInput.message = e.target.value)
    });
    var e = () => {
        taptalk.addTapListener({
            onTapTalkRefreshTokenExpired() {
                tapliveHelper.onKickSessionBackToFormLogin(), tapliveSnackBar.tapliveSetSnackBar("fail", "Your token is expired")
            }
        })
    }, a = t => {
        e(), null !== tapliveHelper.tapliveGetLocalStorage("taplive.auth") && taptalk.connect({
            onSuccess(e) {
                console.log(e), t.onSuccess()
            }, onError(e, a) {
            }, onClose(e) {
                console.log(e), navigator.onLine && a({
                    onSuccess() {
                    }
                })
            }
        })
    }, t = e => {
        var t = e;
        let i = JSON.parse(tapliveHelper.tapliveGetLocalStorage("taplive.data"));
        taptalk.init(i.appKeyID, i.appKeySecret, i.apiURL), window.addEventListener("offline", function (e) {
            taptalk.disconnect()
        }), window.addEventListener("online", function (e) {
            a({
                onSuccess() {
                    console.log("Reconnecting to TapTalk.io server"), tapliveGetCaseList({
                        onSuccess(e) {
                            tapliveHelper.renderRoomlistWithOmnichannel(tapliveRoomListData2 ? tapliveRoomListData2[Object.keys(tapliveRoomListData2)[0]] : null, "taplive-room-list-with-omnichannel-chatlist-wrapper"), tapliveView.tapliveLoopRenderRoomListContent(), tapliveHelper.renderOmnichannelList()
                        }, onError(e) {
                            tapliveSnackBar.tapliveSetSnackBar("fail", e)
                        }
                    }), "{}" !== JSON.stringify(tapliveChatRoomData.room) && u()
                }
            })
        }), a(t)
    };

    const setIconChat = (close = false) => {
        dc.querySelector("#taplive-chat-opener-icon").src = close ? CHAT_ICON_CLOSE_URL : CHAT_ICON_URL
    }

    tapliveHelper.tapliveAddEventForChild(".taplive-chat-widget-opener-button", "click", function (e) {
        "Notification" in window && !isPermissionAskReady && !tapliveHelper.tapliveCheckBrowser().isFirefox && "denied" !== Notification.permisson && (Notification.requestPermission(), isPermissionAskReady = !0), (tapliveChatOpener = !tapliveChatOpener) ? (tapliveHelper.tapliveCustomFadeIn("taplive-outer-container"), tapliveHelper.tapliveSetZIndex("taplive-outer-container", "2147483646"), setIconChat(true)) : (tapliveHelper.tapliveCustomFadeOut("taplive-outer-container"), tapliveHelper.tapliveSetZIndex("taplive-outer-container", "-9999"), setIconChat())
    }), tapliveHelper.tapliveAddEventForChild(".taplive-close-widget-button, .taplive-close-widget-button-2", "click", function (e) {
        tapliveChatOpener = !tapliveChatOpener, tapliveHelper.tapliveCustomFadeOut("taplive-outer-container"), dc.querySelectorAll(".taplive-chat-widget-opener-button")[0].style.zIndex = "9999", tapliveHelper.tapliveSetZIndex("taplive-outer-container", "-9999"), setIconChat()
    });
    let i, l = {
        Authorization: "",
        "Device-Identifier": tapliveHelper.tapliveGetDeviceID(),
        "Device-Model": navigator.appName,
        "Device-Platform": "web",
        "Secret-Key": TapTalkLive.tapliveSecretKey
    };
    (() => {
        let e = tapliveApiBaseURL + "/client/project/get_configs";
        tapliveHelper.tapliveDoXMLHTTPRequest("POST", l, e, null, !1).then(function (e) {
            if ("" === e.error.code) {
                let a = e.data.launcherConfigs.hexColor;
                tapliveApi.tapliveProjectConfig.apiURL = e.data.tapTalk.apiURL, tapliveApi.tapliveProjectConfig.appKeyID = e.data.tapTalk.appKeyID, tapliveApi.tapliveProjectConfig.appKeySecret = e.data.tapTalk.appKeySecret, tapliveMainThemeColor = "" === a ? tapliveMainThemeColor : a, TapTalkLive.setBrandColorWithHex(tapliveMainThemeColor), tapliveHelper.tapliveSetLocalStorage("taplive.data", tapliveApi.tapliveProjectConfig), taptalk.init(tapliveApi.tapliveProjectConfig.appKeyID, tapliveApi.tapliveProjectConfig.appKeySecret, tapliveApi.tapliveProjectConfig.apiURL), s(e.data)
            } else null !== tapliveHelper.tapliveGetLocalStorage("taplive.data") ? taptalk.init(tapliveApi.tapliveProjectConfig.appKeyID, tapliveApi.tapliveProjectConfig.appKeySecret, tapliveApi.tapliveProjectConfig.apiURL) : console.log(e.error.code, e.error.message)
        }).catch(function (e) {
            console.log(e)
        })
    })();
    let p = e => {
        let a = tapliveApiBaseURL + "/auth/access_token/request";
        l.Authorization = `Bearer ${e}`, tapliveHelper.tapliveDoXMLHTTPRequest("POST", l, a, null, !1).then(function (e) {
            "" === e.error.code ? (tapliveHelper.tapliveSetLocalStorage("taplive.auth", e.data), o()) : (v("finish"), tapliveSnackBar.tapliveSetSnackBar("fail", e.error.message))
        }).catch(function (e) {
            console.log(e)
        })
    }, r = e => {
        let a = e, t = () => {
            let e = tapliveApiBaseURL + "/auth/access_token/refresh",
                a = JSON.parse(tapliveHelper.tapliveGetLocalStorage("taplive.auth")).refreshToken;
            l.Authorization = `Bearer ${a}`, tapliveHelper.tapliveDoXMLHTTPRequest("POST", l, e, null, !1).then(function (e) {
                "" === e.error.code ? (tapliveHelper.tapliveSetLocalStorage("taplive.auth", e.data), i()) : (tapliveHelper.onKickSessionBackToFormLogin(), tapliveSnackBar.tapliveSetSnackBar("fail", "Your token is expired"))
            }).catch(function (e) {
                console.log(e)
            })
        };
        isTapliveRunRefreshToken || (isTapliveRunRefreshToken = !0, t());
        let i = () => {
            if (tapliveRefreshAccessTokenCallbackArray.length > 0) tapliveRefreshAccessTokenCallbackArray[0](), tapliveRefreshAccessTokenCallbackArray.shift(), i(); else {
                isTapliveRunRefreshToken = !1;
                return
            }
        };
        null !== a && tapliveRefreshAccessTokenCallbackArray.push(a)
    }, o = (e = !1) => {
        let a = tapliveApiBaseURL + "/client/taptalk/request_auth_ticket",
            i = JSON.parse(tapliveHelper.tapliveGetLocalStorage("taplive.auth")).accessToken;
        l.Authorization = `Bearer ${i}`, tapliveHelper.tapliveDoXMLHTTPRequest("POST", l, a, null, !1).then(function (a) {
            "" === a.error.code ? taptalk.authenticateWithAuthTicket(a.data.ticket, {
                onSuccess(a) {
                    e ? e() : t({
                        onSuccess() {
                            c({
                                onSuccess(e) {
                                    setTimeout(() => {
                                        tapliveGetCaseList({
                                            onSuccess(e) {
                                                tapliveView.tapliveRenderRoomListWithOmnichannel(), tapliveHelper.renderOmnichannelList(), dc.querySelectorAll(".taplive-room-list-wrapper")[0] || tapliveView.tapliveRenderRoomList(), tapliveHelper.renderRoomlistWithOmnichannel(tapliveRoomListData2[Object.keys(tapliveRoomListData2)[0]], "taplive-room-list-with-omnichannel-chatlist-wrapper"), tapliveView.tapliveLoopRenderRoomListContent(), tapliveHelper.resetFormLoginValue(), tapliveView.tapliveRenderRoomListWithOmnichannel(), tapliveHelper.renderOmnichannelList(), dc.querySelectorAll(".taplive-room-list-wrapper")[0] || tapliveView.tapliveRenderRoomList(), tapliveHelper.renderRoomlistWithOmnichannel(tapliveRoomListData2[Object.keys(tapliveRoomListData2)[0]], "taplive-room-list-with-omnichannel-chatlist-wrapper"), tapliveView.tapliveLoopRenderRoomListContent()
                                            }, onError(e) {
                                                tapliveSnackBar.tapliveSetSnackBar("fail", e)
                                            }
                                        }), tapCoreRoomListManager.getRoomByXcID(e.tapTalkXCRoomID, {
                                            onSuccess(a) {
                                                let t = a.room.xcRoomID.replace("case:", "");
                                                v("finish"), f("Admin", t, `${e.topicName} (#${e.stringID})`, a.room);
                                                let i = dc.querySelectorAll(".taplive-start-new-case-wrapper");
                                                for (let l = 0; l < i.length; l++) i[l].classList.remove("taplive-active-start-new-case-wrapper");
                                                dc.querySelectorAll(".taplive-main-chat-room-wrapper")[0].classList.add("taplive-active-main-chat-room-wrapper"), tapliveHelper.tapliveResetTopicListOption(), tapliveHelper.resetFormLoginValue(), tapliveHelper.tapliveClearCreateNewMessageValue(), tapliveMessageListener({
                                                    onNewMessage(e) {
                                                        if (e.isHidden || (tapliveHelper.taplivePlaySound(e), tapliveHelper.tapliveShowNotifation(e)), e.type !== CHAT_TYPE.TAPChatMessageTypeCaseCreated || tapliveRoomListData2[e.room.roomID]) {
                                                            if (tapliveRoomListAction.setRoomListLastMessage(e, tapliveRoomListData2, !1, e => {
                                                                tapliveRoomListData2 = e
                                                            }), e.type === CHAT_TYPE.TAPChatMessageTypeCaseUpdate && tapliveChatRoomData.case.caseID === e.data.id) {
                                                                let a = dc.querySelectorAll(".taplive-main-chat-room-case-id");
                                                                a.length > 0 && (a[0].innerHTML = `${e.data.topicName} (#${e.data.stringID})`)
                                                            }
                                                        } else tapliveRoomListData2 = tapliveRoomListAction.pushNewToRoomList(e, tapliveRoomListData2);
                                                        tapliveHelper.renderRoomlistWithOmnichannel(tapliveRoomListData2[Object.keys(tapliveRoomListData2)[0]], "taplive-room-list-with-omnichannel-chatlist-wrapper"), tapliveView.tapliveLoopRenderRoomListContent(), tapliveHelper.tapliveShowCounterBadge(tapliveRoomListData2)
                                                    }, onUpdateMessage(e) {
                                                        tapliveRoomListAction.setRoomListLastMessage(e, tapliveRoomListData2, !0, e => {
                                                            tapliveRoomListData2 = e, tapliveHelper.renderRoomlistWithOmnichannel(tapliveRoomListData2[Object.keys(tapliveRoomListData2)[0]], "taplive-room-list-with-omnichannel-chatlist-wrapper"), tapliveView.tapliveLoopRenderRoomListContent(), tapliveHelper.tapliveShowCounterBadge(tapliveRoomListData2)
                                                        })
                                                    }
                                                }), tapliveMessageListener({
                                                    onNewMessage(e) {
                                                        if (null !== tapliveChatRoomData.room && tapliveChatRoomData.room.roomID === e.room.roomID) {
                                                            e.room.isLocked && tapliveHelper.tapliveChatRoomRemoveInputMessageField();
                                                            let a = dc.querySelectorAll(".taplive-main-chat-room-bubble-container")[0];
                                                            a.scrollHeight - a.scrollTop === a.clientHeight && tapliveHelper.tapliveScrollChatViewToBottom(), e.user.userID === taptalk.getTaptalkActiveUser().userID ? (tapliveChatRoomData.chatRoomDataChat[e.localID] ? tapliveHelper.updateMessageBubble(e) : tapliveHelper.generateMessageBubble(e), tapliveChatRoomData.chatRoomDataChat[e.localID] = e) : (tapliveChatRoomData.chatRoomDataChat[e.localID] = e, tapliveUnreadMessageAction([e]), tapliveHelper.generateMessageBubble(e), tapliveHelper.tapliveScrollChatViewToBottom())
                                                        }
                                                    }, onUpdateMessage(e) {
                                                        null !== tapliveChatRoomData.room && tapliveChatRoomData.room.roomID === e.room.roomID && (e.room.isLocked && tapliveHelper.tapliveChatRoomRemoveInputMessageField(), e.isDelivered && !e.isRead && (tapliveChatRoomData.chatRoomDataChat[e.localID] = e), e.isRead && Object.keys(tapliveChatRoomData.chatRoomDataChat).map(e => {
                                                            tapliveChatRoomData.chatRoomDataChat[e].isRead || (tapliveChatRoomData.chatRoomDataChat[e].isRead = !0)
                                                        }), tapliveHelper.updateMessageBubble(e))
                                                    }
                                                }), roomStatusListener({
                                                    onStartTyping(e, a) {
                                                        tapliveTyping.runActionTypingFromRoomList(e, "show"), clearTimeout(tapliveTyping.roomListTypingHashmap[e]), tapliveTyping.roomListTypingHashmap[e] = setTimeout(function () {
                                                            tapliveTyping.runActionTypingFromRoomList(e, "hide")
                                                        }, 1e4), null !== tapliveChatRoomData.room && tapliveChatRoomData.room.roomID === e && (dc.querySelectorAll(".taplive-main-chat-room-case-id")[0].innerHTML = `
                                                                                Typing<span class="typing-dot-one">.</span><span class="typing-dot-two">.</span><span class="typing-dot-three">.</span>
                                                                            `, clearTimeout(tapliveTyping.chatRoomTypingTimeout), tapliveTyping.chatRoomTypingTimeout = setTimeout(function () {
                                                            tapliveChatRoomData.room.roomID === e && dc.querySelectorAll(".taplive-main-chat-room-case-id").html(tapliveChatRoomData.case.caseName)
                                                        }, 1e4))
                                                    }, onStopTyping(e, a) {
                                                        tapliveTyping.runActionTypingFromRoomList(e, "hide"), null !== tapliveChatRoomData.room && tapliveChatRoomData.room.roomID === e && (dc.querySelectorAll(".taplive-main-chat-room-case-id")[0].innerHTML = tapliveChatRoomData.case.caseName, clearTimeout(tapliveTyping.chatRoomTypingTimeout))
                                                    }
                                                })
                                            }, onError(e, a) {
                                                tapliveSnackBar.tapliveSetSnackBar("fail", a), console.log(e, a)
                                            }
                                        }), tapliveFaq.faq && tapliveFaq.taplivePrintFaqOnStartNewCaseOnOmnichannel(tapliveFaq.faq.type)
                                    }, 3500)
                                }, onError(e) {
                                    v("finish"), tapliveSnackBar.tapliveSetSnackBar("fail", e)
                                }
                            })
                        }, onError(e) {
                            tapliveSnackBar.tapliveSetSnackBar("fail", e)
                        }
                    })
                }, onError(e, a) {
                    console.log(e, a)
                }
            }) : 401 === a.status ? "40104" === a.error.code ? r(() => o()) : (v("finish"), tapliveHelper.onKickSessionBackToFormLogin(), tapliveSnackBar.tapliveSetSnackBar("fail", "Your token is expired")) : (v("finish"), tapliveSnackBar.tapliveSetSnackBar("fail", a.error.message))
        }).catch(function (e) {
            console.log(e)
        })
    }, n = () => {
        let e = tapliveApiBaseURL + "/client/topic/get_list";
        tapliveHelper.tapliveDoXMLHTTPRequest("POST", l, e, null, !1).then(function (e) {
            "" === e.error.code ? (tapliveTopicList = e.data.topics, tapliveHelper.tapliveAppendOptionIntoSelectBox(tapliveTopicList, "taplive-start-new-case", "topic")) : tapliveSnackBar.tapliveSetSnackBar("fail", e.error.message)
        }).catch(function (e) {
            console.log(e)
        })
    }, s = e => {
        let a = (e, a) => a.findIndex(a => a.channel === e);
        if (-1 !== a("whatsapp", e.channelLinks)) {
            let i = a("whatsapp", e.channelLinks), l = decodeURIComponent(e.channelLinks[i].url);
            e.channelLinks[a("whatsapp", e.channelLinks)].url = l
        }
        if (-1 !== a("twitter", e.channelLinks)) {
            let p = a("twitter", e.channelLinks), r = decodeURIComponent(e.channelLinks[p].url);
            e.channelLinks[a("twitter", e.channelLinks)].url = r
        }
        if (tapliveOmnichannelList = e.channelLinks, tapliveView.tapliveRenderAllView(), n(), null === tapliveHelper.tapliveGetLocalStorage("taplive.auth")) {
            let s = dc.querySelectorAll(".taplive-start-new-case-wrapper");
            for (let v = 0; v < s.length; v++) s[v].classList.toggle("taplive-active-start-new-case-wrapper");
            dc.querySelectorAll(".taplive-start-new-case-without-omnichannel")[0].classList.add("taplive-active-start-new-case-with-omnichannel")
        } else {
            tapliveView.tapliveRenderRoomListWithOmnichannel(), dc.querySelectorAll(".taplive-room-list-wrapper")[0] || tapliveView.tapliveRenderRoomList(), tapliveHelper.goToRoomlistWithOmnichannel();
            let c = () => {
                t({
                    onSuccess() {
                        tapliveGetCaseList({
                            onSuccess(e) {
                                0 === e.cases.length && (tapliveHelper.tapliveCustomFadeIn("taplive-start-new-message-wrapper"), dc.querySelectorAll(".taplive-start-new-message-header")[0].innerHTML = `
                                                <img src="${tapliveStorageBaseURL}/image/chat-room/icon-close.svg" class="taplive-close-widget-button-2">
                                                <b>${TapTalkLive.getTapliveLanguageVar().screenNewMessage.text1}</b>
                                            `, window.innerWidth > 767 && dc.querySelectorAll(".taplive-start-new-message-header img")[0].remove()), dc.querySelectorAll(".taplive-start-new-case-with-omnichannel")[0].classList.remove("taplive-active-start-new-case-wrapper"), dc.querySelectorAll(".taplive-start-new-case-without-omnichannel")[0].classList.remove("taplive-active-start-new-case-wrapper"), tapliveRoomListData2 && Object.keys(tapliveRoomListData2).length > 0 && tapliveHelper.renderRoomlistWithOmnichannel(tapliveRoomListData2[Object.keys(tapliveRoomListData2)[0]], "taplive-room-list-with-omnichannel-chatlist-wrapper"), tapliveView.tapliveLoopRenderRoomListContent(), tapliveMessageListener({
                                    onNewMessage(e) {
                                        if (e.isHidden || (tapliveHelper.taplivePlaySound(e), tapliveHelper.tapliveShowNotifation(e)), e.type !== CHAT_TYPE.TAPChatMessageTypeCaseCreated || tapliveRoomListData2[e.room.roomID]) {
                                            if (tapliveRoomListAction.setRoomListLastMessage(e, tapliveRoomListData2, !1, e => {
                                                tapliveRoomListData2 = e
                                            }), e.type === CHAT_TYPE.TAPChatMessageTypeCaseUpdate && tapliveChatRoomData.case.caseID === e.data.id) {
                                                let a = dc.querySelectorAll(".taplive-main-chat-room-case-id");
                                                a.length > 0 && (a[0].innerHTML = `${e.data.topicName} (#${e.data.stringID})`)
                                            }
                                        } else tapliveRoomListData2 || (tapliveRoomListData2 = {}), tapliveRoomListData2 = tapliveRoomListAction.pushNewToRoomList(e, tapliveRoomListData2);
                                        tapliveHelper.renderRoomlistWithOmnichannel(tapliveRoomListData2[Object.keys(tapliveRoomListData2)[0]], "taplive-room-list-with-omnichannel-chatlist-wrapper"), tapliveView.tapliveLoopRenderRoomListContent(), tapliveHelper.tapliveShowCounterBadge(tapliveRoomListData2)
                                    }, onUpdateMessage(e) {
                                        tapliveRoomListAction.setRoomListLastMessage(e, tapliveRoomListData2, !0, e => {
                                            tapliveRoomListData2 = e, tapliveHelper.renderRoomlistWithOmnichannel(tapliveRoomListData2[Object.keys(tapliveRoomListData2)[0]], "taplive-room-list-with-omnichannel-chatlist-wrapper"), tapliveView.tapliveLoopRenderRoomListContent(), tapliveHelper.tapliveShowCounterBadge(tapliveRoomListData2)
                                        })
                                    }
                                }), tapliveMessageListener({
                                    onNewMessage(e) {
                                        if (null !== tapliveChatRoomData.room && tapliveChatRoomData.room.roomID === e.room.roomID) {
                                            e.room.isLocked && tapliveHelper.tapliveChatRoomRemoveInputMessageField();
                                            let a = dc.querySelectorAll(".taplive-main-chat-room-bubble-container")[0];
                                            a.scrollHeight - a.scrollTop === a.clientHeight && tapliveHelper.tapliveScrollChatViewToBottom(), e.user.userID === taptalk.getTaptalkActiveUser().userID ? (tapliveChatRoomData.chatRoomDataChat[e.localID] ? tapliveHelper.updateMessageBubble(e) : tapliveHelper.generateMessageBubble(e), tapliveChatRoomData.chatRoomDataChat[e.localID] = e) : (tapliveChatRoomData.chatRoomDataChat[e.localID] = e, tapliveUnreadMessageAction([e]), e.isHidden || tapliveHelper.generateMessageBubble(e))
                                        }
                                    }, onUpdateMessage(e) {
                                        null !== tapliveChatRoomData.room && tapliveChatRoomData.room.roomID === e.room.roomID && (e.room.isLocked && tapliveHelper.tapliveChatRoomRemoveInputMessageField(), e.isDelivered && !e.isRead && (tapliveChatRoomData.chatRoomDataChat[e.localID] = e), e.isRead && Object.keys(tapliveChatRoomData.chatRoomDataChat).map(e => {
                                            tapliveChatRoomData.chatRoomDataChat[e].isRead || (tapliveChatRoomData.chatRoomDataChat[e].isRead = !0)
                                        }), tapliveHelper.updateMessageBubble(e))
                                    }
                                }), roomStatusListener({
                                    onStartTyping(e, a) {
                                        tapliveTyping.runActionTypingFromRoomList(e, "show"), clearTimeout(tapliveTyping.roomListTypingHashmap[e]), tapliveTyping.roomListTypingHashmap[e] = setTimeout(function () {
                                            tapliveTyping.runActionTypingFromRoomList(e, "hide")
                                        }, 1e4), null !== tapliveChatRoomData.room && tapliveChatRoomData.room.roomID === e && (dc.querySelectorAll(".taplive-main-chat-room-case-id")[0].innerHTML = `
                                                            Typing<span class="typing-dot-one">.</span><span class="typing-dot-two">.</span><span class="typing-dot-three">.</span>
                                                        `, clearTimeout(tapliveTyping.chatRoomTypingTimeout), tapliveTyping.chatRoomTypingTimeout = setTimeout(function () {
                                            tapliveChatRoomData.room.roomID === e && (dc.querySelectorAll(".taplive-main-chat-room-case-id")[0].innerHTML = tapliveChatRoomData.case.caseName)
                                        }, 1e4))
                                    }, onStopTyping(e, a) {
                                        tapliveTyping.runActionTypingFromRoomList(e, "hide"), null !== tapliveChatRoomData.room && tapliveChatRoomData.room.roomID === e && (dc.querySelectorAll(".taplive-main-chat-room-case-id")[0].innerHTML = tapliveChatRoomData.case.caseName, clearTimeout(tapliveTyping.chatRoomTypingTimeout))
                                    }
                                })
                            }, onError(e) {
                                tapliveSnackBar.tapliveSetSnackBar("fail", e)
                            }
                        })
                    }, onError(e) {
                        console.log(e), tapliveSnackBar.tapliveSetSnackBar("fail", e)
                    }
                })
            };
            taptalk.isAuthenticated() ? c() : o(c)
        }
        tapliveHelper.renderOmnichannelList(), tapliveHelper.initStartFirstCaseView()
    }, v = e => {
        let a = dc.querySelectorAll(".taplive-submit-new-case");
        for (let t = 0; t < a.length; t++) a[t].remove();
        "progress" === e ? tapliveHelper.tapliveAppend("button", "taplive-submit-new-chat taplive-main-brand-button taplive-submit-new-case", !0, ".taplive-start-new-case-form", `
                <div class="taplive-lds-ring">
                    <div></div><div></div><div></div><div></div>
                </div>
            `, [{
            attribute: "tabindex",
            value: "-1"
        }]) : tapliveHelper.tapliveAppend("button", "taplive-submit-new-chat taplive-main-brand-button taplive-submit-new-case", !0, ".taplive-start-new-case-form", "<b>Send Message</b>", [{
            attribute: "tabindex",
            value: "-1"
        }])
    };
    tapliveHelper.tapliveAddEventForChild(".taplive-start-new-case-form", "submit", function (e) {
        e.preventDefault();
        let a = !0;
        if (tapliveCreateCaseInput.fullname.length < 1) {
            tapliveSnackBar.tapliveSetSnackBar("warning", tapliveSnackBar.tapliveSnackBarMessageGroup.empty.fullname), a = !1;
            return
        }
        if (!tapliveCheckEmailFormat(tapliveCreateCaseInput.email)) {
            tapliveSnackBar.tapliveSetSnackBar("warning", tapliveSnackBar.tapliveSnackBarMessageGroup.format.email), a = !1;
            return
        }
        if (tapliveCreateCaseInput.email.length < 1) {
            tapliveSnackBar.tapliveSetSnackBar("warning", tapliveSnackBar.tapliveSnackBarMessageGroup.empty.email), a = !1;
            return
        }
        if (tapliveSelectOptionValue.topic.length < 1) {
            tapliveSnackBar.tapliveSetSnackBar("warning", tapliveSnackBar.tapliveSnackBarMessageGroup.empty.topic), a = !1;
            return
        }
        if (tapliveCreateCaseInput.message < 1) {
            tapliveSnackBar.tapliveSetSnackBar("warning", tapliveSnackBar.tapliveSnackBarMessageGroup.empty.message), a = !1;
            return
        }
        a && (v("progress"), m())
    });
    var c = e => {
        let a = tapliveApiBaseURL + "/client/case/create", t = {
            topicID: parseInt(tapliveSelectOptionValue.topic),
            message: tapliveHelper.tapliveSHTML(tapliveCreateCaseInput.message)
        }, i = JSON.parse(tapliveHelper.tapliveGetLocalStorage("taplive.auth")).accessToken;
        l.Authorization = `Bearer ${i}`, tapliveHelper.tapliveDoXMLHTTPRequest("POST", l, a, t, !1).then(function (a) {
            if ("" === a.error.code) {
                if (e.onSuccess(a.data.case), "function" == typeof tapliveCallback.tapliveOnCreateCase) {
                    let t = JSON.parse(tapliveHelper.tapliveGetLocalStorage("taplive.auth")).user;
                    tapliveCallback.tapliveOnSendMessage(a.data.case, t.fullName, t.email, window.location.href)
                }
                tapliveHelper.tapliveChatRoomAddInputMessageField(), dc.querySelectorAll(".taplive-main-chat-room-solve-wrapper")[0].classList.add("taplive-main-chat-room-solve-wrapper-hide")
            } else 401 === a.status ? "40104" === a.error.code ? r(() => c(e)) : (tapliveHelper.onKickSessionBackToFormLogin(), tapliveSnackBar.tapliveSetSnackBar("fail", "Your token is expired")) : tapliveSnackBar.tapliveSetSnackBar("fail", a.error.message)
        }).catch(function (e) {
            console.log(e)
        })
    }, m = () => {
        let e = tapliveApiBaseURL + "/client/user/create",
            a = {fullname: tapliveCreateCaseInput.fullname, email: tapliveCreateCaseInput.email};
        tapliveHelper.tapliveDoXMLHTTPRequest("POST", l, e, a, !1).then(function (e) {
            "" === e.error.code ? p(e.data.ticket) : (v("finish"), tapliveSnackBar.tapliveSetSnackBar("fail", e.error.message))
        }).catch(function (e) {
            console.log(e)
        })
    }, d = (e, a = null) => {
        null !== a && (tapliveChatRoomData.hasMore = a), tapliveChatRoomData.chatRoomDataChat = null, e && (e && e[Object.keys(e)[Object.keys(e).length - 1]].room.isLocked || e[Object.keys(e)[Object.keys(e).length - 1]].type === TapTalkLive.chatType.TAPChatMessageTypeCaseClosed) ? tapliveHelper.tapliveChatRoomRemoveInputMessageField() : tapliveHelper.tapliveChatRoomAddInputMessageField(), tapliveChatRoomData.chatRoomDataChat = e
    }, g = () => {
        let e = tapCoreChatRoomManager.getCurrentChatInRoom(tapliveChatRoomData.room.roomID);
        d(e ? tapliveHelper.tapliveReverseMessagesObject(e) : null), $(), tapliveHelper.tapliveScrollChatViewToBottom()
    }, h = () => {
        tapliveHelper.taplivePrepend(".taplive-main-chat-room-bubble-container", "div", ".taplive-loading-message-wrapper", `
            <div class="taplive-lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        `)
    }, u = () => {
        h(), setTimeout(function () {
            tapCoreMessageManager.getNewerMessagesAfterTimestamp(tapliveChatRoomData.room.roomID, {
                onSuccess(e) {
                    tapliveUnreadMessageAction(e), null !== e && (d(tapliveHelper.tapliveReverseMessagesObject(e)), $(), Object.keys(e).length < 50 && b(!0, !1), tapliveHelper.tapliveScrollChatViewToBottom())
                }, onError(e, a) {
                    console.log(e, a)
                }
            })
        }, 0)
    }, b = (e = !1, a, t) => {
        let i = tapliveChatRoomData.room.roomID;
        t ? tapliveHelper.tapliveToogleTapliveBlockingLoading(!0) : h();
        let l = 50;
        i && i === tapliveChatRoomData.room.roomID && tapCoreMessageManager.getOlderMessagesBeforeTimestamp(i, l, {
            onSuccess(l, p) {
                (i === tapliveChatRoomData.room.roomID || null !== tapliveChatRoomData.room) && (tapliveUnreadMessageAction(l), d(tapliveHelper.tapliveReverseMessagesObject(l), p), $(), e && tapliveHelper.tapliveScrollChatViewToBottom(), a && a(), t && (!l[t] && p ? b(e, a, t) : ((l[t] || p) && w(t), tapliveHelper.tapliveToogleTapliveBlockingLoading(!1))))
            }, onError(e, a) {
                console.log(e, a)
            }
        })
    }, w = e => {
        let a = dc.querySelectorAll(".taplive-main-chat-room-bubble-container")[0],
            t = dc.querySelectorAll(`[data-chat-id="${e}"`)[0], i = () => {
                a.scrollTop = t.offsetTop, t.classList.add("highlight-chat-bubble"), setTimeout(() => {
                    t.classList.remove("highlight-chat-bubble")
                }, 2e3)
            };
        t ? i() : b(!1, !1, e)
    }, $ = () => {
        dc.querySelectorAll(".taplive-main-chat-room-bubble-container")[0].innerHTML = "";
        let e = tapliveChatRoomData.chatRoomDataChat;
        e && Object.keys(e).map(a => {
            e[a].isHidden || tapliveHelper.generateMessageBubble(e[a])
        })
    }, f = (e, a, t, i) => {
        tapliveChatRoomData.adminName = e, tapliveChatRoomData.case.caseID = a, tapliveChatRoomData.case.caseName = t, tapliveChatRoomData.room = i, tapliveChatRoomData.chatRoomDataChat = [], tapliveHelper.tapliveToogleTapliveBlockingLoading(!1), dc.querySelectorAll(".taplive-main-chat-room-case-id")[0].innerHTML = tapliveChatRoomData.case.caseName, g(), u()
    }, x = () => {
        dc.querySelectorAll(".taplive-main-chat-room-solve-wrapper")[0].classList.add("taplive-main-chat-room-solve-wrapper-hide"), tapliveHelper.removeAttrStyle("taplive-input-text"), dc.querySelectorAll(".input-message-wrapper")[0].classList.remove("submit-chat-icon-wrapper"), dc.querySelectorAll(".input-message-wrapper")[0].classList.add("button-disabled"), dc.querySelectorAll(".taplive-main-chat-room-send-message-input")[0].classList.remove("taplive-main-chat-room-send-message-input-typing"), tapliveTyping.stopTyping(tapliveChatRoomData.room.roomID), "" !== (tapliveSendTextMessageVal = tapliveHelper.tapliveSHTML(tapliveSendTextMessageVal)) && 0 !== tapliveSendTextMessageVal.replace(/\s/g, "").length && tapCoreMessageManager.sendTextMessage(tapliveSendTextMessageVal, tapliveChatRoomData.room, function (e) {
            if (e.body = tapliveSendTextMessageVal, "function" == typeof tapliveCallback.tapliveOnSendMessage) {
                let a = JSON.parse(tapliveHelper.tapliveGetLocalStorage("taplive.auth")).user;
                tapliveCallback.tapliveOnSendMessage(e, a.fullName, a.email, window.location.href)
            }
            tapliveChatRoomData.chatRoomDataChat[e.localID] = e, tapliveRoomListAction.setRoomListLastMessage(e, tapliveRoomListData2, !1, e => {
                tapliveRoomListData2 = e
            }), tapliveHelper.renderRoomlistWithOmnichannel(tapliveRoomListData2[Object.keys(tapliveRoomListData2)[0]], "taplive-room-list-with-omnichannel-chatlist-wrapper"), tapliveView.tapliveLoopRenderRoomListContent(), tapliveView.tapliveRenderChatBubbleMessageOut(e), tapliveHelper.tapliveScrollChatViewToBottom(), tapliveHelper.tapliveOnClickCancelReply(), tapliveHelper.removeAttrStyle("taplive-main-chat-room-container")
        }, tapliveReplyMessage.message), tapliveSendTextMessageVal = "", dc.querySelectorAll(".taplive-input-text")[0].value = ""
    };
    tapliveHelper.tapliveAddEventForChild(".taplive-input-text", "focusout", function () {
        tapliveTyping.stopTyping(tapliveChatRoomData.room.roomID)
    }), tapliveHelper.tapliveAddEventForChild(".taplive-input-text", "keyup", function (e) {
        tapliveTyping.isTyping && (tapliveTyping.typingTimeoutID && clearTimeout(tapliveTyping.typingTimeoutID), tapliveTyping.typingTimeoutID = setTimeout(() => {
            tapliveTyping.stopTyping(tapliveChatRoomData.room.roomID)
        }, 7e3)), e.target.value.length > 0 ? dc.querySelectorAll(".taplive-main-chat-room-send-message-input")[0].classList.add("taplive-main-chat-room-send-message-input-typing") : dc.querySelectorAll(".taplive-main-chat-room-send-message-input")[0].classList.remove("taplive-main-chat-room-send-message-input-typing"), 13 !== e.which || e.shiftKey || x(), tapliveSendTextMessageVal = e.target.value, e.target.value.length <= 0 ? (dc.querySelectorAll(".input-message-wrapper")[0].classList.remove("submit-chat-icon-wrapper"), dc.querySelectorAll(".input-message-wrapper")[0].classList.add("button-disabled")) : (dc.querySelectorAll(".input-message-wrapper")[0].classList.remove("button-disabled"), dc.querySelectorAll(".input-message-wrapper")[0].classList.add("submit-chat-icon-wrapper"))
    }), tapliveHelper.tapliveAddEventForChild(".taplive-input-text", "keydown", function (e) {
        13 !== e.which || e.shiftKey || e.preventDefault(), tapliveTyping.isTyping || tapliveTyping.startTyping(tapliveChatRoomData.room.roomID)
    }), tapliveHelper.tapliveAddEventForChild(".taplive-input-text", "input", function (e) {
        let a = tapliveHelper.tapliveHasClass(".taplive-main-chat-room-solve-wrapper", "taplive-main-chat-room-solve-wrapper-hide");
        "" !== e.target.value || (tapliveHelper.removeAttrStyle("taplive-input-text"), a ? tapliveReplyMessage.message || tapliveHelper.removeAttrStyle("taplive-main-chat-room-container") : dc.querySelectorAll(".taplive-main-chat-room-container")[0].style.cssText = "max-height: calc(100% - 165px); min-height: calc(100% - 165px);");
        let t = dc.querySelectorAll(".taplive-input-text")[0], i = t.offsetHeight;
        t.style.height = "", t.style.height = t.scrollHeight + "px";
        let l = t.offsetHeight;
        if (i !== l) {
            if (i < l && l <= 106) {
                let p = (a ? 125 : 165) + (l - 40) + (tapliveReplyMessage.message ? 68 : 0);
                tapliveHelper.tapliveSetChatRoomMaxMinHeight(p)
            }
            if (i >= l) {
                let r = (a ? 125 : 165) - (40 - l) + (tapliveReplyMessage.message ? 68 : 0);
                tapliveHelper.tapliveSetChatRoomMaxMinHeight(r)
            }
        } else {
            let o = (a ? 125 : 165) - (40 - l) + (tapliveReplyMessage.message ? 68 : 0);
            tapliveHelper.tapliveSetChatRoomMaxMinHeight(o)
        }
    }), tapliveHelper.tapliveAddEventForChild(".submit-chat-icon-wrapper", "click", function () {
        x()
    }), tapliveHelper.tapliveAddEventForChild(".taplive-chat-list-wrapper", "click", function () {
        tapliveHelper.removeAttrStyle("taplive-main-chat-room-container"), tapliveHelper.removeAttrStyle("taplive-input-text");
        let e = this.getAttribute("data-room-id").replace(/"/g, "").replace(/'/g, ""), a = tapliveRoomListData2[e].id,
            t = tapliveRoomListData2[e].tapTalkRoom.lastMessage.room;
        f("Admin", a, `${tapliveRoomListData2[e].topicName} (#${tapliveRoomListData2[e].stringID})`, t), dc.querySelectorAll(".taplive-main-chat-room-solve-wrapper").length > 0 && (dc.querySelectorAll(".taplive-main-chat-room-solve-wrapper")[0].classList.add("taplive-main-chat-room-solve-wrapper-hide"), dc.querySelectorAll(".input-message-wrapper")[0].classList.remove("submit-chat-icon-wrapper"), dc.querySelectorAll(".input-message-wrapper")[0].classList.add("button-disabled")), dc.querySelectorAll(".taplive-room-list-with-omnichannel")[0].classList.remove("taplive-active-start-new-case-wrapper"), dc.querySelectorAll(".taplive-room-list-wrapper")[0].classList.remove("taplive-active-room-list-wrapper"), dc.querySelectorAll(".taplive-main-chat-room-wrapper")[0].classList.toggle("taplive-active-main-chat-room-wrapper")
    }), tapliveHelper.tapliveAddEventForChild(".taplive-room-list-bottom-new-message", "click", function () {
        tapliveHelper.tapliveClearCreateNewMessageValue(), dc.querySelectorAll(".taplive-start-new-message-header")[0].innerHTML = `
                    <img src="${tapliveStorageBaseURL}/image/chat-room/icon-close.svg" id="taplive-close-new-message">
                    <b>${TapTalkLive.getTapliveLanguageVar().screenNewMessage.text1}</b>
            `, tapliveHelper.tapliveCustomFadeIn("taplive-start-new-message-wrapper")
    }), tapliveHelper.tapliveAddEventForChild("#taplive-close-new-message", "click", function () {
        if (tapliveHelper.tapliveClearCreateNewMessageValue(), tapliveFaq.faqMainViewActive) {
            let e = dc.querySelectorAll(".taplive-main-faq-box-wrapper")[0];
            e && (tapliveHelper.goToOmnichannelFirstStartNewCase(), e.classList.add("taplive-active-main-faq-box-wrapper"), dc.querySelectorAll(".taplive-start-new-case-without-omnichannel")[0].classList.remove("taplive-active-start-new-case-wrapper"))
        }
        tapliveHelper.onClickCloseNewMessage()
    }), tapliveHelper.tapliveAddEventForChild(".taplive-submit-new-message", "click", function () {
        let e = !0;
        var a = e => {
            let a = dc.querySelectorAll(".taplive-submit-new-chat");
            for (let t = 0; t < a.length; t++) a[t].remove();
            "progress" === e ? tapliveHelper.tapliveAppend("button", "taplive-submit-new-chat taplive-main-brand-button", !0, ".taplive-start-new-chat-form-wrapper", `
                            <div class="taplive-lds-ring">
                                <div></div><div></div><div></div><div></div>
                            </div>
                        `, [{
                attribute: "tabindex",
                value: "-1"
            }]) : tapliveHelper.tapliveAppend("button", "taplive-submit-new-chat taplive-main-brand-button taplive-submit-new-message", !0, ".taplive-start-new-chat-form-wrapper", `
                            <b>Submit</b>
                        `, [{attribute: "tabindex", value: "-1"}])
        };
        if (tapliveSelectOptionValue.topic.length < 1) {
            e = !1, tapliveSnackBar.tapliveSetSnackBar("warning", tapliveSnackBar.tapliveSnackBarMessageGroup.empty.topic);
            return
        }
        if (tapliveCreateCaseInput.message.length < 1) {
            e = !1, tapliveSnackBar.tapliveSetSnackBar("warning", tapliveSnackBar.tapliveSnackBarMessageGroup.empty.message);
            return
        }
        e && (a("progress"), c({
            onSuccess(e) {
                setTimeout(() => {
                    v("finish"), tapCoreRoomListManager.getRoomByXcID(e.tapTalkXCRoomID, {
                        onSuccess(t) {
                            a("finish"), tapliveHelper.tapliveCustomFadeOut("taplive-start-new-message-wrapper"), dc.querySelectorAll(".taplive-room-list-with-omnichannel")[0].classList.remove("taplive-active-start-new-case-wrapper"), dc.querySelectorAll(".taplive-room-list-wrapper")[0].classList.remove("taplive-active-room-list-wrapper"), dc.querySelectorAll(".taplive-main-chat-room-wrapper")[0].classList.add("taplive-active-main-chat-room-wrapper");
                            let i = t.room.xcRoomID.replace("case:", "");
                            tapliveHelper.tapliveChatRoomAddInputMessageField(), f("Admin", i, `${e.topicName} (#${e.stringID})`, t.room), tapliveHelper.tapliveResetTopicListOption(), tapliveHelper.resetFormLoginValue(), tapliveHelper.tapliveClearCreateNewMessageValue()
                        }, onError(e, a) {
                            tapliveSnackBar.tapliveSetSnackBar("fail", a), console.log(e, a)
                        }
                    })
                }, 3500)
            }, onError(e) {
                a("finish"), tapliveSnackBar.tapliveSetSnackBar("fail", e)
            }
        }))
    }), tapliveHelper.tapliveAddEventForChild(".taplive-main-chat-room-back-button", "click", function () {
        tapliveHelper.onClickBackFromChatRoom(!0)
    }), tapliveHelper.tapliveAddEventForChild(".taplive-main-chat-wrapper", "click", function (e) {
        "taplive-icon-attach-input-message" !== e.target.id && dc.querySelectorAll(".taplive-input-file-media-wrapper").length > 0 && (dc.querySelectorAll(".taplive-input-file-media-wrapper")[0].style.display = "none")
    }), tapliveHelper.tapliveAddEventForChild("#taplive-icon-attach-input-message", "click", function (e) {
        "none" === dc.querySelectorAll(".taplive-input-file-media-wrapper")[0].style.display ? dc.querySelectorAll(".taplive-input-file-media-wrapper")[0].style.display = "block" : dc.querySelectorAll(".taplive-input-file-media-wrapper")[0].style.display = "none"
    }), tapliveHelper.tapliveAddEventForChild(".taplive-mark-as-solved-case-panel-toggle", "click", function () {
        let e = parseInt(getComputedStyle(dc.querySelectorAll(".taplive-main-chat-room-container")[0]).maxHeight.split("-")[1].replace("px", ""));
        if (tapliveHelper.tapliveHasClass(".taplive-main-chat-room-solve-wrapper", "taplive-main-chat-room-solve-wrapper-hide")) {
            let a = e + 40;
            dc.querySelectorAll(".taplive-main-chat-room-container")[0].style.cssText = `max-height: calc(100% - ${a}px); min-height: calc(100% - ${a}px);`, dc.querySelectorAll(".taplive-main-chat-room-solve-wrapper")[0].classList.remove("taplive-main-chat-room-solve-wrapper-hide")
        } else {
            let t = e - 40;
            dc.querySelectorAll(".taplive-main-chat-room-container")[0].style.cssText = `max-height: calc(100% - ${t}px); min-height: calc(100% - ${t}px);`, dc.querySelectorAll(".taplive-main-chat-room-solve-wrapper")[0].classList.add("taplive-main-chat-room-solve-wrapper-hide")
        }
    });
    tapliveHelper.tapliveAddEventForChild("#taplive-chat-room-mark-as-solved-button", "click", function () {
        var e = () => {
            let a = tapliveApiBaseURL + "/client/case/close",
                t = JSON.parse(tapliveHelper.tapliveGetLocalStorage("taplive.auth")).accessToken;
            l.Authorization = `Bearer ${t}`;
            let i = {id: parseInt(tapliveChatRoomData.case.caseID)};
            tapliveHelper.tapliveDoXMLHTTPRequest("POST", l, a, i, !1).then(function (a) {
                "" === a.error.code ? (tapliveHelper.removeAttrStyle("taplive-input-text"), tapliveHelper.removeAttrStyle("taplive-main-chat-room-container")) : 401 === a.status ? "40104" === a.error.code ? r(() => e()) : (tapliveHelper.onKickSessionBackToFormLogin(), tapliveSnackBar.tapliveSetSnackBar("fail", "Your token is expired")) : tapliveSnackBar.tapliveSetSnackBar("fail", a.error.message)
            }).catch(function (e) {
                console.log(e)
            })
        };
        e()
    });
    var _ = e => {
        dc.querySelectorAll(".taplive-submit-review-button")[0].remove(), "progress" === e ? tapliveHelper.tapliveAppend("button", "taplive-main-brand-button taplive-submit-review-button", !0, ".taplive-review-content-foot", `
                    <div class="taplive-lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                `, [{
            attribute: "tabindex",
            value: "-1"
        }]) : tapliveHelper.tapliveAppend("button", "taplive-main-brand-button taplive-submit-review-button", !0, ".taplive-review-content-foot", `<b>${TapTalkLive.getTapliveLanguageVar().review.text3}</b>`, null, "taplive-submit-review", [{
            attribute: "tabindex",
            value: "-1"
        }])
    }, k = () => {
        let e = tapliveApiBaseURL + "/client/case/rate",
            a = JSON.parse(tapliveHelper.tapliveGetLocalStorage("taplive.auth")).accessToken;
        l.Authorization = `Bearer ${a}`;
        let t = {
            id: parseInt(tapliveChatRoomData.case.caseID),
            rating: parseInt(tapliveReview.tapliveReviewInput.star),
            note: tapliveReview.tapliveReviewInput.note
        };
        _("progress"), tapliveHelper.tapliveDoXMLHTTPRequest("POST", l, e, t, !1).then(function (e) {
            "" === e.error.code ? (_("finish"), dc.querySelectorAll(".taplive-review-wrapper")[0].classList.remove("active-taplive-review-wrapper")) : 401 === e.status ? "40104" === e.error.code ? r(() => k()) : (_("finish"), tapliveHelper.onKickSessionBackToFormLogin(), tapliveSnackBar.tapliveSetSnackBar("fail", "Your token is expired")) : (_("finish"), tapliveSnackBar.tapliveSetSnackBar("fail", e.error.message))
        }).catch(function (e) {
            console.log(e)
        })
    };
    tapliveHelper.tapliveAddEventForChild("#taplive-close-review-button", "click", function () {
        dc.querySelectorAll(".taplive-review-wrapper")[0].classList.remove("active-taplive-review-wrapper")
    }), tapliveHelper.tapliveAddEventForChild(".taplive-review-button-bubble", "click", function () {
        tapliveReview.tapliveClearReviewInputValue(), dc.querySelectorAll(".taplive-review-wrapper")[0].classList.add("active-taplive-review-wrapper"), dc.querySelectorAll(".taplive-review-text-length")[0].innerHTML = "(0/1000)"
    });
    var R = 3;
    tapliveHelper.tapliveAddEventForChild(".taplive-star-image-click-content", "click", function () {
        let e = this.getAttribute("data-star");
        dc.querySelectorAll(".taplive-submit-review-button")[0].disabled = !1, R = e, tapliveReview.tapliveReviewInput.star = R, dc.querySelectorAll(".taplive-star-image")[0].src = `${tapliveStorageBaseURL}/image/review/stars-${R}.svg`, dc.querySelectorAll(".taplive-star-word")[0].innerHTML = `<b>${tapliveReview.tapliveReviewValue[R]}</b>`
    }), tapliveHelper.tapliveAddEventForChild("#taplive-submit-review", "click", function () {
        k()
    });
    var T = e => {
        let a = tapliveApiBaseURL + "/client/case/get_by_id",
            t = JSON.parse(tapliveHelper.tapliveGetLocalStorage("taplive.auth")).accessToken;
        l.Authorization = `Bearer ${t}`, tapliveHelper.tapliveDoXMLHTTPRequest("POST", l, a, {id: e}, !1).then(function (a) {
            "" === a.error.code || (401 === a.status ? "40104" === a.error.code ? r(() => T(e)) : (tapliveHelper.onKickSessionBackToFormLogin(), tapliveSnackBar.tapliveSetSnackBar("fail", "Your token is expired")) : tapliveSnackBar.tapliveSetSnackBar("fail", a.error.message))
        }).catch(function (e) {
            console.log(e)
        })
    };
    window.tapliveGetCaseList = e => {
        if (TapTalkLive.isAuthenticated()) {
            let a = tapliveApiBaseURL + "/client/case/get_list",
                t = JSON.parse(tapliveHelper.tapliveGetLocalStorage("taplive.auth")).accessToken;
            l.Authorization = `Bearer ${t}`;
            let i = {withTapTalkRoom: !0};
            tapliveHelper.tapliveDoXMLHTTPRequest("POST", l, a, i, !1).then(function (a) {
                if ("" === a.error.code) {
                    let t = a.data.cases, i = {};
                    t.length > 0 && t.map(e => {
                        let a = e.tapTalkRoom.lastMessage.body, t = e.tapTalkRoom.lastMessage.localID,
                            l = e.tapTalkRoom.lastMessage.data;
                        e.tapTalkRoom.lastMessage.body = taptalk.generateBodyAndData(a, t), "" !== l && (e.tapTalkRoom.lastMessage.data = JSON.parse(taptalk.generateBodyAndData(l, t))), i[e.tapTalkRoom.lastMessage.room.roomID] = e
                    }), tapliveRoomListData2 = i, tapliveHelper.tapliveShowCounterBadge(i);
                    let l = dc.querySelectorAll(".taplive-shimmer-room-list");
                    for (let p = 0; p < l.length; p++) l[p].style.display = "none";
                    e.onSuccess(a.data)
                } else 401 === a.status ? "40104" === a.error.code ? r(() => tapliveGetCaseList(e)) : (tapliveHelper.onKickSessionBackToFormLogin(), tapliveSnackBar.tapliveSetSnackBar("fail", "Your token is expired")) : tapliveSnackBar.tapliveSetSnackBar("fail", a.error.message)
            }).catch(function (e) {
                console.log(e)
            })
        }
    }, tapliveHelper.tapliveAddEventForChild("#taplive-input-file-document", "change", function (e) {
        let a = e.target.files[0];
        this.value = null, tapliveHelper.tapliveRunSendFileMessage(a)
    }), tapliveHelper.tapliveAddEventForChild(".taplive-close-snack-bar", "click", function () {
        tapliveHelper.tapliveCustomFadeOut("taplive-snack-bar-wrapper")
    }), tapliveHelper.tapliveAddEventForChild(".taplive-outer-container", "click", function (e) {
        if ("taplive-custom-select-option-value-box taplive-custom-select-option-value-box-taplive-start-new-case" !== e.target.className) {
            let a = dc.querySelectorAll(".taplive-custom-select-option-value-box"),
                t = dc.querySelectorAll(".taplive-custom-select-option-wrapper");
            for (let i = 0; i < a.length; i++) a[i].classList.remove("taplive-active-select-box"), t[i].style.display = "none"
        }
    }), tapliveHelper.tapliveAddEventForChild(".taplive-custom-select-option", "click", function (e) {
        let a = this.getAttribute("data"), t = dc.querySelectorAll(".taplive-custom-select-option-value-box"),
            i = dc.querySelectorAll(`.taplive-custom-select-${a}`),
            l = dc.querySelectorAll(".taplive-custom-select-option-wrapper");
        for (let p = 0; p < i.length; p++) "block" === i[p].style.display ? (t[p].classList.remove("taplive-active-select-box"), i[p].style.display = "none") : (t[p].classList.remove("taplive-active-select-box"), i[p].classList.add("taplive-active-select-box"), i[p].style.display = "block", l[p].style.display = "block")
    }), tapliveHelper.tapliveAddEventForChild(".taplive-custom-select-option-list", "click", function () {
        let e = this.getAttribute("data-value"), a = this.getAttribute("data-value-to"),
            t = this.getAttribute("data-label"), i = this.getAttribute("data-select"),
            l = dc.querySelectorAll(".taplive-custom-select-option-value-box"),
            p = dc.querySelectorAll(".taplive-custom-select-option-wrapper");
        for (let r = 0; r < l.length; r++) l[r].innerHTML = t, p[r].style.display = "none";
        tapliveSelectOptionValue[a] = e;
        let o = dc.querySelectorAll(`.taplive-custom-select-${i} .taplive-custom-select-option-list`);
        for (let n = 0; n < o.length; n++) o[n].classList.remove("taplive-selected-option");
        this.classList.add("taplive-selected-option")
    }), tapliveHelper.tapliveAddEventForChild(".taplive-first-message-us-directly", "click", function () {
        tapliveHelper.goToFormFirstStartNewCase()
    }), tapliveHelper.tapliveAddEventForChild(".taplive-room-list-back-button", "click", function () {
        tapliveHelper.goToRoomlistWithOmnichannel()
    }), tapliveHelper.tapliveAddEventForChild(".taplive-room-list-omnichannel-all-message", "click", function () {
        tapliveHelper.goToRoomlistWithoutOmnichannel()
    }), tapliveHelper.tapliveAddEventForChild(".first-start-new-case-back-button", "click", function () {
        if (tapliveHelper.tapliveResetTopicListOption(), tapliveFaq.faqMainViewActive) {
            let e = dc.querySelectorAll(".taplive-main-faq-box-wrapper")[0];
            e && (tapliveHelper.goToOmnichannelFirstStartNewCase(), e.classList.add("taplive-active-main-faq-box-wrapper"), dc.querySelectorAll(".taplive-start-new-case-without-omnichannel")[0].classList.remove("taplive-active-start-new-case-wrapper"))
        } else tapliveHelper.goToOmnichannelFirstStartNewCase();
        tapliveHelper.resetFormLoginValue()
    }), tapliveHelper.tapliveAddEventForChild(".new-file-download-to-storage", "click", function () {
        let e = this.getAttribute("data-file-url"), a = this.getAttribute("data-file-name");
        tapliveHelper.downloadFileToStorage(e, a)
    }), tapliveHelper.tapliveAddEventForChild(".taplive-close-preview-panel", "click", function () {
        dc.querySelectorAll(".taplive-image-preview-value")[0].src = "", tapliveHelper.tapliveCustomFadeOut("taplive-image-preview-panel"), tapliveHelper.tapliveCustomFadeOut("taplive-video-preview-panel")
    }), tapliveHelper.tapliveAddEventForChild(".taplive-main-image-message-clicker", "click", function () {
        let e = this.getAttribute("data-image-url");
        tapliveHelper.tapliveCustomFadeIn("taplive-image-preview-panel"), dc.querySelectorAll(".taplive-image-preview-value")[0].src = e, dc.querySelectorAll(".taplive-zoom-figure")[0].style.backgroundImage = `url("${e}")`
    }), tapliveHelper.tapliveAddEventForChild(".taplive-main-video-message-clicker", "click", function () {
        let e = this.getAttribute("data-video-url");
        tapliveHelper.tapliveCustomFadeIn("taplive-video-preview-panel"), dc.querySelectorAll(".taplive-video-preview-value")[0].src = e
    }), tapliveHelper.tapliveAddEventForChild("#taplive-input-file-media", "change", function (e) {
        tapliveHelper.tapliveRunOnChangeMedia(e.target.files[0])
    }), tapliveHelper.tapliveAddEventForChild(".taplive-close-preupload-panel", "click", function (e) {
        tapliveHelper.onClosePreuploadPanel()
    }), tapliveHelper.tapliveAddEventForChild(".taplive-caption-input", "keyup", function (e) {
        let a = e.target.value, t = a.length, i = dc.querySelectorAll(".taplive-caption-limit");
        if (tapliveCaptionValue = a, t <= 100) for (let l = 0; l < i.length; l++) i[l].innerHTML = `${t}/100`
    }), tapliveHelper.tapliveAddEventForChild("#taplive-submit-image", "click", function () {
        let e = tapliveFileMediaValue, a = tapliveHelper.tapliveSHTML(tapliveCaptionValue), t = e => {
            e.percentageUpload = 0, e.bytesUpload = 0, tapliveChatRoomData.chatRoomDataChat[e.localID] = e, tapliveRoomListAction.setRoomListLastMessage(e, tapliveRoomListData2, !1, e => {
                tapliveRoomListData2 = e
            }), tapliveHelper.renderRoomlistWithOmnichannel(tapliveRoomListData2[Object.keys(tapliveRoomListData2)[0]], "taplive-room-list-with-omnichannel-chatlist-wrapper"), tapliveView.tapliveLoopRenderRoomListContent(), tapliveView.tapliveRenderChatBubbleMessageImageOut(e), tapliveHelper.tapliveScrollChatViewToBottom()
        };
        tapliveHelper.onClosePreuploadPanel(), tapCoreMessageManager.sendImageMessage(e, a, tapliveChatRoomData.room, {
            onStart(e) {
                t(e), tapliveHelper.tapliveOnClickCancelReply()
            }, onProgress(e, a, t) {
            }, onSuccess(e) {
                if ("function" == typeof tapliveCallback.tapliveOnSendMessage) {
                    let a = JSON.parse(tapliveHelper.tapliveGetLocalStorage("taplive.auth")).user;
                    tapliveCallback.tapliveOnSendMessage(e, a.fullName, a.email, window.location.href)
                }
            }, onError(e, a) {
                "90302" === e ? tapliveSnackBar.tapliveSetSnackBar("fail", a) : console.log(e, a)
            }
        }, tapliveReplyMessage.message)
    }), tapliveHelper.tapliveAddEventForChild("#taplive-submit-video", "click", function () {
        let e = tapliveFileMediaValue, a = tapliveHelper.tapliveSHTML(tapliveCaptionValue), t = e => {
            e.percentageUpload = 0, e.bytesUpload = 0, tapliveChatRoomData.chatRoomDataChat[e.localID] = e, tapliveRoomListAction.setRoomListLastMessage(e, tapliveRoomListData2, !1, e => {
                tapliveRoomListData2 = e
            }), tapliveHelper.renderRoomlistWithOmnichannel(tapliveRoomListData2[Object.keys(tapliveRoomListData2)[0]], "taplive-room-list-with-omnichannel-chatlist-wrapper"), tapliveView.tapliveLoopRenderRoomListContent(), tapliveView.tapliveRenderChatBubbleMessageVideoOut(e), tapliveHelper.tapliveScrollChatViewToBottom()
        };
        tapliveHelper.onClosePreuploadPanel(), tapCoreMessageManager.sendVideoMessage(e, a, tapliveChatRoomData.room, {
            onStart(e) {
                t(e), tapliveHelper.tapliveOnClickCancelReply()
            }, onProgress(e, a, t) {
            }, onSuccess(e) {
                if ("function" == typeof tapliveCallback.tapliveOnSendMessage) {
                    let a = JSON.parse(tapliveHelper.tapliveGetLocalStorage("taplive.auth")).user;
                    tapliveCallback.tapliveOnSendMessage(e, a.fullName, a.email, window.location.href)
                }
            }, onError(e, a) {
                "90302" === e ? tapliveSnackBar.tapliveSetSnackBar("fail", a) : console.log(e, a)
            }
        }, tapliveReplyMessage.message)
    }), tapliveHelper.tapliveAddEventForChild(".taplive-input-text", "paste", function (e) {
        tapliveHelper.tapliveCheckIsFileorMedia(e.clipboardData.files)
    }), tapliveHelper.tapliveAddEventForChild(".omnichannel-option-image-content a img", "mouseover", function () {
        let e = dc.querySelectorAll(".omnichannel-option-image-content a img");
        if (window.innerWidth > 768) for (let a = 0; a < e.length; a++) e[a].style.cssText = "opacity: 0.5;"
    }), tapliveHelper.tapliveAddEventForChild(".omnichannel-option-image-content a img", "mouseout", function () {
        let e = dc.querySelectorAll(".omnichannel-option-image-content a img");
        if (window.innerWidth > 768) for (let a = 0; a < e.length; a++) e[a].style.cssText = "opacity: 1;"
    }), window.addEventListener("scroll", e => {
        let a = e.target.className;
        if ("taplive-main-chat-room-bubble-container" === a) {
            let t = dc.querySelectorAll(`.${a}`)[0];
            if (0 === t.scrollTop && tapliveChatRoomData.hasMore) {
                let i = t.scrollHeight;
                b(!1, function () {
                    t.scrollTop = t.scrollHeight - i
                })
            }
        }
    }, !0), tapliveHelper.tapliveAddEventForChild(".taplive-reply-bubble", "click", function () {
        w(this.getAttribute("data-local-id"))
    }), tapliveHelper.tapliveAddEventForChild(".taplive-zoom-figure", "mousemove", function (e) {
        tapliveHelper.tapliveZoomImageIn(e)
    }), tapliveHelper.tapliveAddEventForChild(".taplive-zoom-figure", "mouseleave", function () {
        tapliveHelper.tapliveZoomImageOut()
    }), tapliveLauncherReady = !0
};
