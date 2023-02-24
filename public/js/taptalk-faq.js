class TapliveFaqCore {
    constructor() {
        this.tapliveAuthenticationHeader = {
            Authorization: "",
            "Device-Identifier": tapliveHelper.tapliveGetDeviceID(),
            "Device-Model": navigator.appName,
            "Device-Platform": "web",
            "Secret-Key": TapTalkLive.tapliveSecretKey
        }, this.faq = null, this.faqMainViewActive = !1, this.faqCurrentChildItems = [], this.faqActiveChildData = null, this.faqActiveChildHistory = []
    }

    tapliveFaqLineBreak(b) {
        var c = {"<": "&lt;", ">": "&gt;"};
        let a = b.replace(/[&<>]/g, a => c[a] || a);
        return null !== a ? a.trim().replace(new RegExp("\n", "g"), "<br />") : a
    }

    tapliveRefreshAccessToken(b) {
        let a = b;
        isTapliveRunRefreshToken || (isTapliveRunRefreshToken = !0, (() => {
            let a = tapliveApiBaseURL + "/auth/access_token/refresh",
                b = JSON.parse(tapliveHelper.tapliveGetLocalStorage("taplive.auth")).refreshToken;
            this.tapliveAuthenticationHeader.Authorization = `Bearer ${b}`, tapliveHelper.tapliveDoXMLHTTPRequest("POST", this.tapliveAuthenticationHeader, a, null, !1).then(function (a) {
                "" === a.error.code ? (tapliveHelper.tapliveSetLocalStorage("taplive.auth", a.data), c()) : (tapliveHelper.onKickSessionBackToFormLogin(), tapliveSnackBar.tapliveSetSnackBar("fail", "Your token is expired"))
            }).catch(function (a) {
                console.log(a)
            })
        })());
        let c = () => {
            if (tapliveRefreshAccessTokenCallbackArray.length > 0) tapliveRefreshAccessTokenCallbackArray[0](), tapliveRefreshAccessTokenCallbackArray.shift(), c(); else {
                isTapliveRunRefreshToken = !1;
                return
            }
        };
        null !== a && tapliveRefreshAccessTokenCallbackArray.push(a)
    }

    taplivePrintFaqList(a, b = "") {
        return `
            <div class="taplive-faq-list-wrapper ${b}">
                ${a.map((a, c) => {
            if (c < 3) return `
                            <div class="taplive-faq-list ${"taplive-faq-list-wrapper-main-content" === b ? "taplive-faq-list-inner" : "taplive-faq-list-outer"}" data-faq-index="${c}">
                                <p class="taplive-faq-list-title"><b>${this.tapliveFaqLineBreak(a.title)}</b></p>
                                <p class="taplive-faq-list-description">${this.tapliveFaqLineBreak(a.content)}</p>
                                <img class="taplive-faq-list-icon" src="${tapliveStorageBaseURL}/image/arrow-right-orange.svg">
                            </div>
                        `
        }).join("")}
            </div>
        `
    }

    tapliveHideLoadMoreFaq(c) {
        let a = document.querySelectorAll(c);
        if (a.length > 0) for (let b = 0; b < a.length; b++) a[b].parentNode.removeChild(a[b])
    }

    taplivePrepareFaqBox(a) {
        tapliveHelper.tapliveAppend("div", "taplive-faq-box-wrapper", !0, ".taplive-start-new-case-with-omnichannel", `
            <div class="taplive-faq-inner-box-wrapper">
                
            </div>
        `)
    }

    taplivePrintFaqOnStartNewCaseOnOmnichannel(c) {
        let a = document.querySelectorAll(".taplive-faq-box-wrapper");
        if (a.length > 0) {
            for (let b = 0; b < a.length; b++) a[b].children[0].innerHTML = `
                    <h1 class="tapive-faq-title-1">${TapTalkLive.getTapliveLanguageVar().faq.text1}</h1>
                    <h2 class="tapive-faq-title-2">${this.tapliveFaqLineBreak(this.faq.title)}</h2>
                    <p class="tapive-faq-description-1">${this.tapliveFaqLineBreak(this.faq.content)}</p>
                    
                    ${"talk_to_agent" === c ? `
                            <button class="taplive-main-button taplive-talk-to-agent-faq-first-message-with-omnichannel taplive-main-brand-nofill-button" tabindex="-1">
                                <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.8695 13.96C9.00194 13.8772 9.15498 13.8333 9.31116 13.8333H15.6665C16.587 13.8333 17.3332 13.0871 17.3332 12.1667V2.16667C17.3332 1.24619 16.587 0.5 15.6665 0.5H2.33317C1.4127 0.5 0.666504 1.24619 0.666504 2.16667V12.1667C0.666504 13.0871 1.4127 13.8333 2.33317 13.8333H3.1665C3.62674 13.8333 3.99984 14.2064 3.99984 14.6667V15.5C3.99984 16.1545 4.7198 16.5536 5.27484 16.2067L8.8695 13.96ZM6.304 13.598C6.02648 13.7715 5.6665 13.572 5.6665 13.2447V12.5833C5.6665 12.3532 5.47996 12.1667 5.24984 12.1667H2.74984C2.51972 12.1667 2.33317 11.9801 2.33317 11.75V2.58333C2.33317 2.35321 2.51972 2.16667 2.74984 2.16667H15.2498C15.48 2.16667 15.6665 2.35321 15.6665 2.58333V11.75C15.6665 11.9801 15.48 12.1667 15.2498 12.1667H8.71367C8.63558 12.1667 8.55906 12.1886 8.49284 12.23L6.304 13.598Z" fill="${tapliveMainThemeColor}"/>
                                </svg>

                                <b>${TapTalkLive.getTapliveLanguageVar().faq.text4}</b>
                            </button>
                        ` : `   
                            ${this.faq.childItems && this.faq.childItems.length > 0 ? this.taplivePrintFaqList(this.faq.childItems, "taplive-faq-list-wrapper-outer-content") : ""}
                            
                            <button class="taplive-main-button taplive-load-more-faq taplive-load-more-faq-outer-content taplive-load-more-faq-first-message-with-omnichannel taplive-main-brand-nofill-button" tabindex="-1">
                                <b>${TapTalkLive.getTapliveLanguageVar().faq.text5}</b>
                            </button>
                        `}
                `;
            this.faq && (!this.faq.childItems || this.faq.childItems && this.faq.childItems.length < 4) && this.tapliveHideLoadMoreFaq(".taplive-load-more-faq")
        }
    }

    taplivePrintFaqOnRoomListWithOmnichannel(a) {
        tapliveHelper.tapliveAppend("div", "taplive-faq-box-wrapper", !0, ".taplive-room-list-with-omnichannel", `
            <div class="taplive-faq-inner-box-wrapper">
                
            </div>
        `)
    }

    taplivePrintFaqOnRoomListWithOmnichannelShimmer() {
        let a = document.querySelectorAll(".taplive-faq-box-wrapper");
        if (a.length > 0) for (let b = 0; b < a.length; b++) a[b].children[0].innerHTML = `
                    <h1 class="tapive-faq-title-1">${TapTalkLive.getTapliveLanguageVar().faq.text1}</h1>
                    
                    <div class="taplive-faq-list-wrapper taplive-faq-list-shimmer">
                        <div class="taplive-faq-list">
                            <div class="taplive-faq-list-title taplive-shine"></div>
                            <div class="taplive-faq-list-description taplive-shine"></div>
                        </div>
                        <div class="taplive-faq-list">
                            <div class="taplive-faq-list-title taplive-shine"></div>
                            <div class="taplive-faq-list-description taplive-shine"></div>
                        </div>
                        <div class="taplive-faq-list">
                            <div class="taplive-faq-list-title taplive-shine"></div>
                            <div class="taplive-faq-list-description taplive-shine"></div>
                        </div>
                    </div>
                `
    }

    taplivePrintMainFaqBoxWrapper(c = !1) {
        let a = document.querySelectorAll(".taplive-main-faq-content");
        if (c) tapliveHelper.tapliveAppend("div", "taplive-main-faq-box-wrapper", !0, ".taplive-main-chat-wrapper", `
                <div class="taplive-main-faq-box-top">
                    <img class="taplive-main-faq-back" src="${tapliveStorageBaseURL}/image/chat-room/icon-chevron-left.svg" />
                    <img class="taplive-main-faq-close" src="${tapliveStorageBaseURL}/image/icon-close.svg">
                </div>

                <div class="taplive-main-faq-content">
                    <h1 class="taplive-main-faq-content-title">${TapTalkLive.getTapliveLanguageVar().faq.text2}</h1>

                    <p class="taplive-main-faq-content-description">${TapTalkLive.getTapliveLanguageVar().faq.text3}</p>

                    <button class="taplive-main-button taplive-faq-main-content-talk-to-agent taplive-main-brand-nofill-button" tabindex="-1">
                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.8695 13.96C9.00194 13.8772 9.15498 13.8333 9.31116 13.8333H15.6665C16.587 13.8333 17.3332 13.0871 17.3332 12.1667V2.16667C17.3332 1.24619 16.587 0.5 15.6665 0.5H2.33317C1.4127 0.5 0.666504 1.24619 0.666504 2.16667V12.1667C0.666504 13.0871 1.4127 13.8333 2.33317 13.8333H3.1665C3.62674 13.8333 3.99984 14.2064 3.99984 14.6667V15.5C3.99984 16.1545 4.7198 16.5536 5.27484 16.2067L8.8695 13.96ZM6.304 13.598C6.02648 13.7715 5.6665 13.572 5.6665 13.2447V12.5833C5.6665 12.3532 5.47996 12.1667 5.24984 12.1667H2.74984C2.51972 12.1667 2.33317 11.9801 2.33317 11.75V2.58333C2.33317 2.35321 2.51972 2.16667 2.74984 2.16667H15.2498C15.48 2.16667 15.6665 2.35321 15.6665 2.58333V11.75C15.6665 11.9801 15.48 12.1667 15.2498 12.1667H8.71367C8.63558 12.1667 8.55906 12.1886 8.49284 12.23L6.304 13.598Z" fill="${tapliveMainThemeColor}"/>
                        </svg>

                        <b>${TapTalkLive.getTapliveLanguageVar().faq.text4}</b>
                    </button>
                </div>
            `, [{attribute: "tabindex", value: "-1"}]); else if (a.length > 0) {
            for (let b = 0; b < a.length; b++) a[b].innerHTML = `
                        <h1 class="taplive-main-faq-content-title">${this.tapliveFaqLineBreak(this.faqActiveChildData.title)}</h1>
    
                        <p class="taplive-main-faq-content-description">${this.tapliveFaqLineBreak(this.faqActiveChildData.content)}</p>
    
                        ${this.faqActiveChildData.childItems && this.faqActiveChildData.childItems.length > 0 ? this.taplivePrintFaqList(this.faqActiveChildData.childItems, "taplive-faq-list-wrapper-main-content") : ""}
    
                        ${"talk_to_agent" === this.faqActiveChildData.type ? `
                                <button class="taplive-main-button taplive-faq-main-content-talk-to-agent taplive-main-brand-nofill-button" tabindex="-1">
                                    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.8695 13.96C9.00194 13.8772 9.15498 13.8333 9.31116 13.8333H15.6665C16.587 13.8333 17.3332 13.0871 17.3332 12.1667V2.16667C17.3332 1.24619 16.587 0.5 15.6665 0.5H2.33317C1.4127 0.5 0.666504 1.24619 0.666504 2.16667V12.1667C0.666504 13.0871 1.4127 13.8333 2.33317 13.8333H3.1665C3.62674 13.8333 3.99984 14.2064 3.99984 14.6667V15.5C3.99984 16.1545 4.7198 16.5536 5.27484 16.2067L8.8695 13.96ZM6.304 13.598C6.02648 13.7715 5.6665 13.572 5.6665 13.2447V12.5833C5.6665 12.3532 5.47996 12.1667 5.24984 12.1667H2.74984C2.51972 12.1667 2.33317 11.9801 2.33317 11.75V2.58333C2.33317 2.35321 2.51972 2.16667 2.74984 2.16667H15.2498C15.48 2.16667 15.6665 2.35321 15.6665 2.58333V11.75C15.6665 11.9801 15.48 12.1667 15.2498 12.1667H8.71367C8.63558 12.1667 8.55906 12.1886 8.49284 12.23L6.304 13.598Z" fill="${tapliveMainThemeColor}"/>
                                    </svg>
    
                                    <b>${TapTalkLive.getTapliveLanguageVar().faq.text4}</b>
                                </button>
                            ` : `
                                <button class="taplive-main-button taplive-load-more-faq-main-content taplive-main-brand-nofill-button" tabindex="-1">
                                    <b>${TapTalkLive.getTapliveLanguageVar().faq.text5}</b>
                                </button>
                            `}
                    `;
            this.faq && (!this.faqActiveChildData.childItems || this.faqActiveChildData.childItems && this.faqActiveChildData.childItems.length < 4) && this.tapliveHideLoadMoreFaq(".taplive-load-more-faq-main-content")
        }
    }

    taplivePrintMainFaqBoxWrapperShimmer() {
        let a = document.querySelectorAll(".taplive-main-faq-content");
        if (a.length > 0) for (let b = 0; b < a.length; b++) a[b].innerHTML = `
                    <div class="taplive-main-faq-content-title taplive-shine"></div>

                    <div class="taplive-main-faq-content-description taplive-shine"></div>
                    <div class="taplive-main-faq-content-description taplive-shine"></div>
                    <div class="taplive-main-faq-content-description taplive-shine"></div>
                    <div class="taplive-main-faq-content-description taplive-shine"></div>
                    <div class="taplive-main-faq-content-description taplive-shine"></div>
                    <div class="taplive-main-faq-content-description taplive-shine"></div>
                    <div class="taplive-main-faq-content-description taplive-shine"></div>
                    <div class="taplive-main-faq-content-description taplive-shine"></div>
                `
    }

    tapliveGetFaqListApi() {
        let b = this, a = tapliveApiBaseURL + "/client/scf/get_path", c = () => {
            let a = document.querySelectorAll(".taplive-main-chat-wrapper");
            a.length > 0 && a[0].classList.add("taplive-hide-faq-content")
        };
        tapliveHelper.tapliveDoXMLHTTPRequest("POST", this.tapliveAuthenticationHeader, a, {}, !1).then(function (a) {
            if ("" === a.error.code) b.faq = a.data.item, b.faq.childItems && (b.faqCurrentChildItems = b.faq.childItems), b.taplivePrintFaqOnStartNewCaseOnOmnichannel(b.faq.type); else if (401 === a.status) "40104" === a.error.code ? this.tapliveRefreshAccessToken(() => tapliveCreateCase(callback)) : (tapliveHelper.onKickSessionBackToFormLogin(), tapliveSnackBar.tapliveSetSnackBar("fail", "Your token is expired")); else {
                let d = document.querySelectorAll(".taplive-faq-box-wrapper");
                if (d.length > 0) for (let e = 0; e < d.length; e++) d[e].parentNode.removeChild(d[e]);
                console.log(a.error.message), c()
            }
        }).catch(function (a) {
            console.log(a)
        })
    }

    tapliveOnClickLoadMore(c = "") {
        if ("main content" === c) {
            for (let a = 3; a < this.faqActiveChildData.childItems.length; a++) tapliveHelper.tapliveAppend("div", "taplive-faq-list taplive-faq-list-inner", !0, ".taplive-faq-list-wrapper-main-content", `
                    <p class="taplive-faq-list-title"><b>${this.tapliveFaqLineBreak(this.faqActiveChildData.childItems[a].title)}</b></p>
                    <p class="taplive-faq-list-description">${this.tapliveFaqLineBreak(this.faqActiveChildData.childItems[a].content)}</p>
                    <img class="taplive-faq-list-icon" src="${tapliveStorageBaseURL}/image/arrow-right-orange.svg">                
                `, [{attribute: "data-faq-index", value: a}]);
            this.tapliveHideLoadMoreFaq(".taplive-load-more-faq-main-content")
        } else {
            for (let b = 3; b < this.faq.childItems.length; b++) tapliveHelper.tapliveAppend("div", "taplive-faq-list taplive-faq-list-outer", !0, ".taplive-faq-list-wrapper-outer-content", `
                    <p class="taplive-faq-list-title"><b>${this.tapliveFaqLineBreak(this.faq.childItems[b].title)}</b></p>
                    <p class="taplive-faq-list-description">${this.tapliveFaqLineBreak(this.faq.childItems[b].content)}</p>
                    <img class="taplive-faq-list-icon" src="${tapliveStorageBaseURL}/image/arrow-right-orange.svg">                
                `, [{attribute: "data-faq-index", value: b}]);
            this.tapliveHideLoadMoreFaq(".taplive-load-more-faq-outer-content")
        }
    }
}

var tapliveFaq = new TapliveFaqCore;
tapliveHelper.tapliveAddEventForChild(".taplive-faq-list-outer", "click", function (c) {
    tapliveFaq.faqMainViewActive = !tapliveFaq.faqMainViewActive;
    let b = this.getAttribute("data-faq-index");
    tapliveFaq.faqActiveChildHistory.push(tapliveFaq.faq.childItems[b]), tapliveFaq.faqActiveChildData = tapliveFaq.faqActiveChildHistory[tapliveFaq.faqActiveChildHistory.length - 1];
    let a = document.querySelectorAll(".taplive-main-faq-box-wrapper")[0];
    a && (tapliveFaq.taplivePrintMainFaqBoxWrapperShimmer(), a.classList.add("taplive-active-main-faq-box-wrapper"), setTimeout(() => {
        tapliveFaq.taplivePrintMainFaqBoxWrapper()
    }, 500))
}), tapliveHelper.tapliveAddEventForChild(".taplive-faq-list-inner", "click", function (b) {
    let a = this.getAttribute("data-faq-index");
    tapliveFaq.faqActiveChildHistory.push(tapliveFaq.faqActiveChildData.childItems[a]), tapliveFaq.faqActiveChildData = tapliveFaq.faqActiveChildHistory[tapliveFaq.faqActiveChildHistory.length - 1], document.querySelectorAll(".taplive-main-faq-box-wrapper")[0] && (tapliveFaq.taplivePrintMainFaqBoxWrapperShimmer(), setTimeout(() => {
        tapliveFaq.taplivePrintMainFaqBoxWrapper()
    }, 500))
}), tapliveHelper.tapliveAddEventForChild(".taplive-main-faq-back", "click", function (b) {
    tapliveFaq.faqActiveChildData = null, tapliveFaq.faqActiveChildHistory.pop();
    let a = document.querySelectorAll(".taplive-main-faq-box-wrapper")[0];
    a && (0 === tapliveFaq.faqActiveChildHistory.length && (tapliveFaq.faqMainViewActive = !1), tapliveFaq.faqMainViewActive ? (tapliveFaq.faqActiveChildData = tapliveFaq.faqActiveChildHistory[tapliveFaq.faqActiveChildHistory.length - 1], tapliveFaq.taplivePrintMainFaqBoxWrapperShimmer(), setTimeout(() => {
        tapliveFaq.taplivePrintMainFaqBoxWrapper()
    }, 500)) : a.classList.remove("taplive-active-main-faq-box-wrapper"))
}), tapliveHelper.tapliveAddEventForChild(".taplive-main-faq-close", "click", function (b) {
    tapliveFaq.faqActiveChildData = null, tapliveFaq.faqActiveChildHistory = [];
    let a = document.querySelectorAll(".taplive-main-faq-box-wrapper")[0];
    a && (tapliveFaq.faqMainViewActive = !1, a.classList.remove("taplive-active-main-faq-box-wrapper"))
}), tapliveHelper.tapliveAddEventForChild(".taplive-talk-to-agent-faq-first-message-with-omnichannel", "click", function (c) {
    if (null === tapliveHelper.tapliveGetLocalStorage("taplive.auth") ? (tapliveHelper.tapliveAppendOptionIntoSelectBox(tapliveFaq.faq.topics, "taplive-start-new-case", "topic"), tapliveHelper.goToFormFirstStartNewCase()) : (tapliveHelper.tapliveClearCreateNewMessageValue(), tapliveHelper.tapliveAppendOptionIntoSelectBox(tapliveFaq.faq.topics, "taplive-start-new-case", "topic"), document.querySelectorAll(".taplive-start-new-message-header")[0].innerHTML = `
                <img src="${tapliveStorageBaseURL}/image/chat-room/icon-close.svg" id="taplive-close-new-message">
                <b>${TapTalkLive.getTapliveLanguageVar().screenNewMessage.text1}</b>
        `, tapliveHelper.tapliveCustomFadeIn("taplive-start-new-message-wrapper")), 1 === tapliveFaq.faq.topics.length) {
        tapliveSelectOptionValue.topic = tapliveFaq.faq.topics[0].id;
        let b = document.querySelectorAll(".taplive-custom-select-option-value-box");
        for (let a = 0; a < b.length; a++) b[a].innerHTML = tapliveFaq.faq.topics[0].name
    }
}), tapliveHelper.tapliveAddEventForChild(".taplive-faq-main-content-talk-to-agent", "click", function (d) {
    null === tapliveHelper.tapliveGetLocalStorage("taplive.auth") ? (tapliveHelper.tapliveAppendOptionIntoSelectBox(tapliveFaq.faqActiveChildData ? tapliveFaq.faqActiveChildData.topics : tapliveFaq.faq.topics, "taplive-start-new-case", "topic"), tapliveHelper.goToFormFirstStartNewCase()) : (tapliveHelper.tapliveClearCreateNewMessageValue(), tapliveHelper.tapliveAppendOptionIntoSelectBox(tapliveFaq.faqActiveChildData.topics, "taplive-start-new-case", "topic"), document.querySelectorAll(".taplive-start-new-message-header")[0].innerHTML = `
                <img src="${tapliveStorageBaseURL}/image/chat-room/icon-close.svg" id="taplive-close-new-message">
                <b>${TapTalkLive.getTapliveLanguageVar().screenNewMessage.text1}</b>
        `, tapliveHelper.tapliveCustomFadeIn("taplive-start-new-message-wrapper"));
    let b = document.querySelectorAll(".taplive-main-faq-box-wrapper")[0];
    if (b && b.classList.remove("taplive-active-main-faq-box-wrapper"), 1 === tapliveFaq.faqActiveChildData.topics.length) {
        tapliveSelectOptionValue.topic = tapliveFaq.faqActiveChildData.topics[0].id;
        let c = document.querySelectorAll(".taplive-custom-select-option-value-box");
        for (let a = 0; a < c.length; a++) c[a].innerHTML = tapliveFaq.faqActiveChildData.topics[0].name
    }
}), tapliveHelper.tapliveAddEventForChild(".taplive-load-more-faq-outer-content", "click", function () {
    tapliveFaq.tapliveOnClickLoadMore()
}), tapliveHelper.tapliveAddEventForChild(".taplive-load-more-faq-main-content", "click", function () {
    tapliveFaq.tapliveOnClickLoadMore("main content")
})
