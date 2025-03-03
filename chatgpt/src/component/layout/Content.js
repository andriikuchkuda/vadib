import React, { useState, useContext, useRef, useEffect } from 'react';
import LayoutContext from '../../context/AuthContext';

import fetchWithAuth from '../../utils/fetch';

const Content = () => {
  const [chatContent, setChatContent] = useState(['Hello world']);
  const [chat, setChat] = useState('');
  const [dropDownToggle, setDropDownToggle] = useState(false);
  const dropdownRef = useRef(null);
  const {sideBarWidth, setSideBarWidth} = useContext(LayoutContext);

  const openSidebarHandler = () => {
    setSideBarWidth(260);
  }

  const dropDownToggleHandler = () => {
    setDropDownToggle(!dropDownToggle);
  }

  useEffect(() => {
    const getChatGPTResponse = async () => {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages : "in js, array filter" }),
      });
    
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
    
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
    
        const chunk = decoder.decode(value, { stream: true });

        setChat(prevState => {
          const newState = prevState + chunk;
          return newState;
        });
      }
    
    }
    
    // getChatGPTResponse();
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDownToggle(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
      <div className="draggable sticky top-0 z-10 flex min-h-[60px] items-center justify-center border-transparent bg-token-main-surface-primary pl-0 md:hidden">
       
        <div className="no-draggable"><button aria-label="Model selector, current model is 4o" type="button"
          id="radix-:r5s:" aria-haspopup="menu" aria-expanded="false" data-state="closed"
          data-testid="model-switcher-dropdown-button"
          className="group flex cursor-pointer items-center gap-1 rounded-lg py-1.5 px-3 text-lg hover:bg-token-main-surface-secondary radix-state-open:bg-token-main-surface-secondary font-semibold text-token-text-secondary overflow-hidden whitespace-nowrap"
          style={{"viewTransitionName": "var(--vt-thread-model-switcher)"}}>
          <div className="text-token-text-secondary">ChatGPT <span className="text-token-text-secondary">4o</span></div><svg
            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="icon-md text-token-text-tertiary">
            <path fillRule="evenodd" clipRule="evenodd"
              d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
              fill="currentColor"></path>
          </svg>
        </button></div>
      </div>
      <div className="no-draggable flex w-full items-center justify-center bg-token-main-surface-primary md:hidden"></div>
      <main className="relative h-full w-full flex-1 overflow-auto transition-width">
        <div role="presentation" tabIndex="0" className="composer-parent flex h-full flex-col focus-visible:outline-0">

          <div className="flex-1 overflow-hidden @container/thread">
            <div className="relative h-full">
              <div className="absolute left-0 right-0">
                <div className="draggable no-draggable-children sticky top-0 p-3 mb-1.5 flex items-center justify-between z-10 h-header-height font-semibold bg-token-main-surface-primary max-md:hidden">
                  <div className="absolute start-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2"></div>
                  <div className="flex items-center gap-0 overflow-hidden">


                    {!sideBarWidth  && <div className="flex items-center">
                      <span className="flex" data-state="closed">
                        <button onClick={openSidebarHandler} aria-label="Open sidebar" className="h-10 rounded-lg px-2 text-token-text-secondary focus-visible:outline-0 disabled:text-token-text-quaternary focus-visible:bg-token-main-surface-secondary enabled:hover:bg-token-main-surface-secondary">
                          <div className="relative will-change-transform">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z" fill="currentColor">
                              </path>
                            </svg>
                            <div className="absolute right-[-3px] top-0 h-3 w-3 rounded-full border-2 border-token-main-surface-primary bg-blue-selection">
                            </div>
                          </div>
                        </button>
                      </span>
                      <span className="flex" data-state="closed">
                        <button aria-label="New chat" className="h-10 rounded-lg px-2 text-token-text-secondary focus-visible:outline-0 disabled:text-token-text-quaternary focus-visible:bg-token-sidebar-surface-secondary enabled:hover:bg-token-sidebar-surface-secondary">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="icon-xl-heavy"><path d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z" fill="currentColor">
                          </path>
                          </svg>
                        </button>
                      </span>
                    </div>}


                    <button onClick={dropDownToggleHandler} aria-label="Model selector, current model is 4o" type="button" id="radix-:r5u:"
                      aria-haspopup="menu" aria-expanded="false" data-state="closed"
                      data-testid="model-switcher-dropdown-button"
                      className="group flex cursor-pointer items-center gap-1 rounded-lg py-1.5 px-3 text-lg hover:bg-token-main-surface-secondary radix-state-open:bg-token-main-surface-secondary font-semibold text-token-text-secondary overflow-hidden whitespace-nowrap"
                      style={{ "viewTransitionName": "var(--vt-thread-model-switcher)" }}>
                      <div className="text-token-text-secondary">ChatGPT <span className="text-token-text-secondary">4o</span>
                      </div><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg" className="icon-md text-token-text-tertiary">
                        <path fillRule="evenodd" clipRule="evenodd"
                          d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                          fill="currentColor"></path>
                      </svg>
                    </button>
                  </div>

                </div>

                {chatContent.length > 0 && (
                  chatContent.map((chat, index) => (
                    <>
                      <article
                        className="w-full scroll-mb-[var(--thread-trailing-height,150px)] text-token-text-primary focus-visible:outline-2 focus-visible:outline-offset-[-4px]"
                        dir="auto" data-testid="conversation-turn-2" data-scroll-anchor="false">
                        <h5 className="sr-only">You said:</h5>
                        <div className="m-auto text-base py-[18px] px-3 md:px-4 w-full md:px-5 lg:px-4 xl:px-5">
                          <div
                            className="mx-auto flex flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
                            <div className="group/conversation-turn relative flex w-full min-w-0 flex-col">
                              <div className="flex-col gap-1 md:gap-3">
                                <div className="flex max-w-full flex-col flex-grow">
                                  <div data-message-author-role="user"
                                    data-message-id="aaa2207a-e26a-4c58-a47e-8b67eebdab38" dir="auto"
                                    className="min-h-8 text-message flex w-full flex-col items-end gap-2 whitespace-normal break-words text-start [.text-message+&amp;]:mt-5">
                                    <div className="flex w-full flex-col gap-1 empty:hidden items-end rtl:items-start">
                                      <div
                                        className="relative max-w-[var(--user-chat-width,70%)] rounded-3xl bg-token-message-surface px-5 py-2.5">
                                        <div className="whitespace-pre-wrap">{chat}</div>
                                        <div
                                          className="absolute bottom-0 right-full top-0 -mr-3.5 hidden pr-5 pt-1 [.group\/conversation-turn:hover_&amp;]:block">
                                          <span className="" data-state="closed"><button aria-label="Edit message"
                                            className="flex h-9 w-9 items-center justify-center rounded-full text-token-text-secondary transition hover:bg-token-main-surface-tertiary"><svg
                                              width="24" height="24" viewBox="0 0 24 24" fill="none"
                                              xmlns="http://www.w3.org/2000/svg" className="icon-md">
                                              <path fillRule="evenodd" clipRule="evenodd"
                                                d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z"
                                                fill="currentColor"></path>
                                            </svg></button></span></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                      <article
                        className="w-full scroll-mb-[var(--thread-trailing-height,150px)] text-token-text-primary focus-visible:outline-2 focus-visible:outline-offset-[-4px]"
                        dir="auto" data-testid="conversation-turn-3" data-scroll-anchor="true">
                        <h6 className="sr-only">ChatGPT said:</h6>
                        <div className="m-auto text-base py-[18px] px-3 md:px-4 w-full md:px-5 lg:px-4 xl:px-5">
                          <div
                            className="mx-auto flex flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
                            <div className="flex-shrink-0 flex flex-col relative items-end">
                              <div>
                                <div className="pt-0">
                                  <div
                                    className="gizmo-bot-avatar flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
                                    <div
                                      className="relative p-1 rounded-sm flex items-center justify-center bg-token-main-surface-primary text-token-text-primary h-8 w-8">
                                      <svg width="41" height="41" viewBox="0 0 41 41" fill="none"
                                        xmlns="http://www.w3.org/2000/svg" className="icon-md" role="img"><text x="-9999"
                                          y="-9999">ChatGPT</text>
                                        <path
                                          d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z"
                                          fill="currentColor"></path>
                                      </svg></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="group/conversation-turn relative flex w-full min-w-0 flex-col agent-turn">
                              <div className="flex-col gap-1 md:gap-3">
                                <div className="flex max-w-full flex-col flex-grow">
                                  <div data-message-author-role="assistant"
                                    data-message-id="17aacc0e-bec0-4dfb-8eca-feec39e62014" dir="auto"
                                    className="min-h-8 text-message flex w-full flex-col items-end gap-2 whitespace-normal break-words text-start [.text-message+&amp;]:mt-5"
                                    data-message-model-slug="gpt-4o">
                                    <div className="flex w-full flex-col gap-1 empty:hidden first:pt-[3px]">
                                      <div className="markdown prose w-full break-words dark:prose-invert dark">
                                        <p>{chat}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="mb-2 flex gap-3 empty:hidden -ml-2">
                                  <div className="items-center justify-start rounded-xl p-1 flex">
                                    <div className="flex items-center"><span className="" data-state="closed"><button
                                      className="rounded-lg text-token-text-secondary hover:bg-token-main-surface-secondary"
                                      aria-label="Read aloud" data-testid="voice-play-turn-action-button"><span
                                        className="flex h-[30px] w-[30px] items-center justify-center"><svg width="24"
                                          height="24" viewBox="0 0 24 24" fill="none"
                                          xmlns="http://www.w3.org/2000/svg" className="icon-md-heavy">
                                          <path fillRule="evenodd" clipRule="evenodd"
                                            d="M11 4.9099C11 4.47485 10.4828 4.24734 10.1621 4.54132L6.67572 7.7372C6.49129 7.90626 6.25019 8.00005 6 8.00005H4C3.44772 8.00005 3 8.44776 3 9.00005V15C3 15.5523 3.44772 16 4 16H6C6.25019 16 6.49129 16.0938 6.67572 16.2629L10.1621 19.4588C10.4828 19.7527 11 19.5252 11 19.0902V4.9099ZM8.81069 3.06701C10.4142 1.59714 13 2.73463 13 4.9099V19.0902C13 21.2655 10.4142 22.403 8.81069 20.9331L5.61102 18H4C2.34315 18 1 16.6569 1 15V9.00005C1 7.34319 2.34315 6.00005 4 6.00005H5.61102L8.81069 3.06701ZM20.3166 6.35665C20.8019 6.09313 21.409 6.27296 21.6725 6.75833C22.5191 8.3176 22.9996 10.1042 22.9996 12.0001C22.9996 13.8507 22.5418 15.5974 21.7323 17.1302C21.4744 17.6185 20.8695 17.8054 20.3811 17.5475C19.8927 17.2896 19.7059 16.6846 19.9638 16.1962C20.6249 14.9444 20.9996 13.5175 20.9996 12.0001C20.9996 10.4458 20.6064 8.98627 19.9149 7.71262C19.6514 7.22726 19.8312 6.62017 20.3166 6.35665ZM15.7994 7.90049C16.241 7.5688 16.8679 7.65789 17.1995 8.09947C18.0156 9.18593 18.4996 10.5379 18.4996 12.0001C18.4996 13.3127 18.1094 14.5372 17.4385 15.5604C17.1357 16.0222 16.5158 16.1511 16.0539 15.8483C15.5921 15.5455 15.4632 14.9255 15.766 14.4637C16.2298 13.7564 16.4996 12.9113 16.4996 12.0001C16.4996 10.9859 16.1653 10.0526 15.6004 9.30063C15.2687 8.85905 15.3578 8.23218 15.7994 7.90049Z"
                                            fill="currentColor"></path>
                                        </svg></span></button></span><span className="" data-state="closed"><button
                                          className="rounded-lg text-token-text-secondary hover:bg-token-main-surface-secondary"
                                          aria-label="Copy" data-testid="copy-turn-action-button"><span
                                            className="flex h-[30px] w-[30px] items-center justify-center"><svg width="24"
                                              height="24" viewBox="0 0 24 24" fill="none"
                                              xmlns="http://www.w3.org/2000/svg" className="icon-md-heavy">
                                              <path fillRule="evenodd" clipRule="evenodd"
                                                d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z"
                                                fill="currentColor"></path>
                                            </svg></span></button></span>
                                      <div className="flex"><span className="" data-state="closed"><button
                                        className="rounded-lg text-token-text-secondary hover:bg-token-main-surface-secondary"
                                        aria-label="Good response"
                                        data-testid="good-response-turn-action-button"><span
                                          className="flex h-[30px] w-[30px] items-center justify-center"><svg width="24"
                                            height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" className="icon-md-heavy">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                              d="M12.1318 2.50389C12.3321 2.15338 12.7235 1.95768 13.124 2.00775L13.5778 2.06447C16.0449 2.37286 17.636 4.83353 16.9048 7.20993L16.354 8.99999H17.0722C19.7097 8.99999 21.6253 11.5079 20.9313 14.0525L19.5677 19.0525C19.0931 20.7927 17.5124 22 15.7086 22H6C4.34315 22 3 20.6568 3 19V12C3 10.3431 4.34315 8.99999 6 8.99999H8C8.25952 8.99999 8.49914 8.86094 8.6279 8.63561L12.1318 2.50389ZM10 20H15.7086C16.6105 20 17.4008 19.3964 17.6381 18.5262L19.0018 13.5262C19.3488 12.2539 18.391 11 17.0722 11H15C14.6827 11 14.3841 10.8494 14.1956 10.5941C14.0071 10.3388 13.9509 10.0092 14.0442 9.70591L14.9932 6.62175C15.3384 5.49984 14.6484 4.34036 13.5319 4.08468L10.3644 9.62789C10.0522 10.1742 9.56691 10.5859 9 10.8098V19C9 19.5523 9.44772 20 10 20ZM7 11V19C7 19.3506 7.06015 19.6872 7.17071 20H6C5.44772 20 5 19.5523 5 19V12C5 11.4477 5.44772 11 6 11H7Z"
                                              fill="currentColor"></path>
                                          </svg></span></button></span><span className="" data-state="closed"><button
                                            className="rounded-lg text-token-text-secondary hover:bg-token-main-surface-secondary"
                                            aria-label="Bad response" data-testid="bad-response-turn-action-button"><span
                                              className="flex h-[30px] w-[30px] items-center justify-center"><svg width="24"
                                                height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg" className="icon-md-heavy">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M11.8727 21.4961C11.6725 21.8466 11.2811 22.0423 10.8805 21.9922L10.4267 21.9355C7.95958 21.6271 6.36855 19.1665 7.09975 16.7901L7.65054 15H6.93226C4.29476 15 2.37923 12.4921 3.0732 9.94753L4.43684 4.94753C4.91145 3.20728 6.49209 2 8.29589 2H18.0045C19.6614 2 21.0045 3.34315 21.0045 5V12C21.0045 13.6569 19.6614 15 18.0045 15H16.0045C15.745 15 15.5054 15.1391 15.3766 15.3644L11.8727 21.4961ZM14.0045 4H8.29589C7.39399 4 6.60367 4.60364 6.36637 5.47376L5.00273 10.4738C4.65574 11.746 5.61351 13 6.93226 13H9.00451C9.32185 13 9.62036 13.1506 9.8089 13.4059C9.99743 13.6612 10.0536 13.9908 9.96028 14.2941L9.01131 17.3782C8.6661 18.5002 9.35608 19.6596 10.4726 19.9153L13.6401 14.3721C13.9523 13.8258 14.4376 13.4141 15.0045 13.1902V5C15.0045 4.44772 14.5568 4 14.0045 4ZM17.0045 13V5C17.0045 4.64937 16.9444 4.31278 16.8338 4H18.0045C18.5568 4 19.0045 4.44772 19.0045 5V12C19.0045 12.5523 18.5568 13 18.0045 13H17.0045Z"
                                                  fill="currentColor"></path>
                                              </svg></span></button></span></div><span className="hidden"></span><span
                                                className="" data-state="closed"><button type="button" id="radix-:rqq:"
                                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"
                                                  className="cursor-pointer h-[30px] rounded-md px-1 text-token-text-secondary hover:bg-token-main-surface-secondary">
                                          <div className="flex items-center pb-0"><svg width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                            className="icon-md">
                                            <path
                                              d="M3.06957 10.8763C3.62331 6.43564 7.40967 3 12 3C14.2824 3 16.4028 3.85067 18.0118 5.25439V4C18.0118 3.44772 18.4595 3 19.0118 3C19.5641 3 20.0118 3.44772 20.0118 4V8C20.0118 8.55228 19.5641 9 19.0118 9H15C14.4477 9 14 8.55228 14 8C14 7.44772 14.4477 7 15 7H16.9571C15.6757 5.76379 13.9101 5 12 5C8.43108 5 5.48466 7.67174 5.0542 11.1237C4.98586 11.6718 4.48619 12.0607 3.93815 11.9923C3.39011 11.924 3.00123 11.4243 3.06957 10.8763ZM20.0618 12.0077C20.6099 12.076 20.9988 12.5757 20.9304 13.1237C20.3767 17.5644 16.5903 21 12 21C9.72322 21 7.60762 20.1535 5.99999 18.7559V20C5.99999 20.5523 5.55228 21 4.99999 21C4.44771 21 3.99999 20.5523 3.99999 20V16C3.99999 15.4477 4.44771 15 4.99999 15H8.99999C9.55228 15 9.99999 15.4477 9.99999 16C9.99999 16.5523 9.55228 17 8.99999 17H7.04285C8.32433 18.2362 10.0899 19 12 19C15.5689 19 18.5153 16.3283 18.9458 12.8763C19.0141 12.3282 19.5138 11.9393 20.0618 12.0077Z"
                                              fill="currentColor"></path>
                                          </svg><span className="overflow-hidden text-clip whitespace-nowrap text-sm"
                                            style={{"opacity": "0", "paddingLeft": "0px", "width": "0%", "willChange": "auto"}}>4o</span><svg
                                              width="24" height="24" viewBox="0 0 24 24" fill="none"
                                              xmlns="http://www.w3.org/2000/svg" className="icon-sm">
                                              <path fillRule="evenodd" clipRule="evenodd"
                                                d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                                                fill="currentColor"></path>
                                            </svg></div>
                                        </button></span>
                                    </div>
                                  </div>
                                </div>
                                <div className="pr-2 lg:pr-0"></div>
                                <div className="mt-3 w-full empty:hidden">
                                  <div className="text-center"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </>
                  ))
                )}

              </div>

              {chatContent.length == 0 && (<div className="flex h-full flex-col items-center justify-center text-token-text-primary">
                <div className="h-full w-full @lg/thread:py-[18px]">
                  <div className="m-auto text-base px-3 md:px-4 w-full md:px-5 lg:px-4 xl:px-5 h-full">
                    <div
                      className="mx-auto flex h-full w-full flex-col text-base @lg/thread:justify-center @md/thread:max-w-3xl @lg/thread:max-w-[40rem] @xl/thread:max-w-[48rem]">
    <p>{chat}</p>

                      <div className="mb-7 hidden text-center @lg/thread:block">
                        <div className="relative inline-flex justify-center text-center text-2xl font-semibold leading-9">
                          <h1 style={{"viewTransitionName" : "var(--vt-splash-screen-headline)"}}>What can I help with?</h1>
                        </div>
                      </div>
                      
                      <div className="w-full">
                        <div className="flex justify-center"></div>
                        <form className="w-full" type="button" aria-haspopup="dialog" aria-expanded="false"
                          aria-controls="radix-:r63:" data-state="closed">
                          <div className="relative flex h-full max-w-full flex-1 flex-col">
                            <div className="group relative flex w-full items-center">
                              <div className="w-full">
                                <div id="composer-background"
                                  className="flex w-full cursor-text flex-col rounded-3xl px-2.5 py-1 transition-colors contain-inline-size bg-[#f4f4f4] dark:bg-token-main-surface-secondary"
                                  style={{"viewTransitionName": "var(--vt-composer)"}}>
                                  <div className="flex min-h-[44px] items-start pl-2">
                                    <div className="min-w-0 max-w-full flex-1">
                                      <div
                                        className="_prosemirror-parent_cy42l_1 text-token-text-primary max-h-[25dvh] max-h-52 overflow-auto default-browser">
                                        <textarea
                                          className="block h-10 w-full resize-none border-0 bg-transparent px-0 py-2 text-token-text-primary placeholder:text-token-text-secondary"
                                          placeholder="Message ChatGPT" data-virtualkeyboard="true" />

                                      </div>
                                    </div>
                                    <div className="w-[32px] pt-1"><span aria-hidden="true"
                                      className="pointer-events-none invisible fixed left-0 top-0 block">O</span></div>
                                  </div>
                                  <div className="flex h-[44px] items-center justify-between">
                                    <div className="flex gap-x-1 text-token-text-primary">
                                      <div style={{"viewTransitionName": "var(--vt-composer-attach-file-action)"}}>
                                        <div className="relative">
                                          <div className="relative">
                                            <div className="flex flex-col"><input multiple="" tabIndex="-1" className="hidden"
                                              type="file" style={{"display": "none"}}/><span className="hidden"></span><button
                                                type="button" id="radix-:r65:" aria-haspopup="menu"
                                                aria-expanded="false" data-state="closed"
                                                className="text-token-text-primary border border-transparent inline-flex items-center justify-center gap-1 rounded-lg text-sm dark:transparent dark:bg-transparent leading-none outline-none cursor-pointer hover:bg-token-main-surface-secondary dark:hover:bg-token-main-surface-secondary focus-visible:bg-token-main-surface-secondary radix-state-active:text-token-text-secondary radix-disabled:cursor-auto radix-disabled:bg-transparent radix-disabled:text-token-text-tertiary dark:radix-disabled:bg-transparent m-0 h-0 w-0 border-none bg-transparent p-0"></button><span
                                                  className="flex" data-state="closed"><button aria-disabled="false"
                                                    aria-label="Attach files"
                                                    className="flex items-center justify-center h-8 w-8 rounded-lg rounded-bl-xl text-token-text-primary dark:text-white focus-visible:outline-black dark:focus-visible:outline-white hover:bg-black/10"><svg
                                                      width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                      xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                      d="M9 7C9 4.23858 11.2386 2 14 2C16.7614 2 19 4.23858 19 7V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9C5 8.44772 5.44772 8 6 8C6.55228 8 7 8.44772 7 9V15C7 17.7614 9.23858 20 12 20C14.7614 20 17 17.7614 17 15V7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44772 15 9V15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15V7Z"
                                                      fill="currentColor"></path>
                                                  </svg></button></span>
                                              <div type="button" aria-haspopup="dialog" aria-expanded="false"
                                                aria-controls="radix-:r68:" data-state="closed"></div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div style={{"viewTransitionName": "var(--vt-composer-system-hint-action)"}}><span
                                        className="hidden"></span><span className="" data-state="closed"><button type="button"
                                          id="radix-:r6d:" aria-haspopup="menu" aria-expanded="false"
                                          data-state="closed"
                                          className="_toolsButton_d2h2h_8 flex h-8 min-w-8 items-center justify-center rounded-lg p-1 text-xs font-semibold hover:bg-black/10 focus-visible:outline-black disabled:opacity-30 dark:focus-visible:outline-white"
                                          aria-label="Use a tool"><svg width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg"
                                            className="pointer-events-none">
                                            <mask id="stuff-part-box-fill">
                                              <path d="M-6 -10H30V11H-6Z" fill="white"></path>
                                              <path d="M20 11H4V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V11Z"
                                                fill="black"></path>
                                            </mask>
                                            <mask id="stuff-part-star-fill">
                                              <path d="M-6 -6H30V11H-6Z" fill="white"></path>
                                              <path className="stuff-part-star"
                                                d="M8.05625 3.61554C8.30853 2.89184 9.2477 2.70929 9.75272 3.28578L11.2938 5.04497C11.4788 5.25615 11.744 5.37984 12.0247 5.38581L14.3629 5.43554C15.1291 5.45184 15.593 6.28864 15.2008 6.94708L14.0039 8.95633C13.8602 9.19753 13.8245 9.48802 13.9056 9.75682L14.5808 11.9959C14.8021 12.7297 14.1496 13.4294 13.4022 13.2599L11.1214 12.7425C10.8476 12.6804 10.5603 12.7362 10.3297 12.8964L8.40888 14.2305C7.7794 14.6677 6.91229 14.2633 6.84258 13.5001L6.62986 11.1711C6.60432 10.8915 6.46243 10.6355 6.23886 10.4657L4.37646 9.05111C3.76614 8.58754 3.88274 7.63792 4.58708 7.33577L6.73638 6.41376C6.99439 6.30307 7.19399 6.08903 7.28641 5.82392L8.05625 3.61554Z"
                                                fill="black"></path>
                                            </mask>
                                            <g mask="url(#stuff-part-box-fill)">
                                              <g mask="url(#stuff-part-star-fill)">
                                                <path className="stuff-part-pen" fillRule="evenodd" clipRule="evenodd"
                                                  d="M14.1356 3.327C14.6861 2.06081 16.1589 1.48067 17.4251 2.03123L19.4885 2.92841C20.7547 3.47897 21.3348 4.95174 20.7842 6.21793L17.8342 13.0027C17.663 13.3963 17.3934 13.7392 17.0513 13.9984L13.054 17.026L12.4501 16.2289L11.4544 16.3212L11.3505 15.2023C11.295 14.6055 11.2326 13.9364 11.2047 13.6425L10.987 11.3504C10.947 10.9294 11.0145 10.505 11.1831 10.1172L14.1356 3.327ZM12.4501 16.2289L11.4544 16.3212C11.4879 16.6826 11.7146 16.9975 12.0468 17.1439C12.3789 17.2903 12.7646 17.245 13.054 17.026L12.4501 16.2289ZM13.2795 14.3467L15.8435 12.4043C15.9119 12.3525 15.9658 12.2839 16 12.2052L18.9501 5.42044C19.0602 5.1672 18.9442 4.87264 18.691 4.76253L16.6276 3.86535C16.3743 3.75524 16.0798 3.87126 15.9697 4.1245L13.0172 10.9147C12.9835 10.9922 12.97 11.0771 12.978 11.1613L13.1957 13.4533C13.2135 13.6399 13.2448 13.9752 13.2795 14.3467Z"
                                                  fill="currentColor"></path>
                                              </g>
                                              <path className="stuff-part-star" fillRule="evenodd" clipRule="evenodd"
                                                d="M7.11197 3.28637C7.61654 1.83896 9.49489 1.47385 10.5049 2.62685L12.046 4.38603L14.3842 4.43577C15.9166 4.46836 16.8443 6.14195 16.0599 7.45885L14.863 9.4681L15.5382 11.7072C15.9808 13.1748 14.6758 14.5742 13.181 14.2351L10.9002 13.7177L8.97932 15.0518C7.72036 15.9262 5.98614 15.1175 5.84672 13.5911L5.634 11.262L3.7716 9.84744C2.55096 8.9203 2.78416 7.02106 4.19284 6.41676L6.34213 5.49475L7.11197 3.28637ZM10.5416 5.7039L9.00051 3.94471L8.23067 6.15309C8.04584 6.6833 7.64664 7.1114 7.13061 7.33276L4.98132 8.25478L6.84371 9.66936C7.29086 10.009 7.57464 10.5209 7.62571 11.0801L7.83843 13.4091L9.75929 12.075C10.2205 11.7547 10.7951 11.643 11.3427 11.7673L13.6234 12.2847L12.9482 10.0455C12.7861 9.50795 12.8574 8.92697 13.1448 8.44457L14.3416 6.43532L12.0034 6.38558C11.4421 6.37364 10.9116 6.12626 10.5416 5.7039Z"
                                                fill="currentColor"></path>
                                              <g className="stuff-part-jack">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M11.4873 26.067C11.5514 26.0445 11.6198 26.0217 11.6925 25.9988L11.0922 24.091C10.6826 24.2199 10.239 24.3899 9.87818 24.6169C9.58085 24.804 9 25.243 9 26C9 26.7396 9.49534 27.2202 9.86829 27.4784C9.87463 27.4828 9.88099 27.4872 9.88737 27.4915C9.86663 27.5058 9.84613 27.5203 9.82589 27.535C9.45161 27.8072 9 28.2875 9 29C9 29.7396 9.49534 30.2202 9.86829 30.4784C9.90016 30.5005 9.93264 30.522 9.96568 30.5431C9.93938 30.5594 9.91347 30.5759 9.888 30.5926C9.70054 30.7159 9.49716 30.8773 9.33217 31.0864C9.16471 31.2986 9 31.6092 9 32C9 32.3908 9.16471 32.7014 9.33217 32.9136C9.49716 33.1227 9.70054 33.2841 9.888 33.4074C10.263 33.654 10.7308 33.8492 11.1866 33.9996C12.0976 34.3003 13.2047 34.5 14 34.5V32.5C13.462 32.5 12.569 32.3497 11.8134 32.1004C11.7126 32.0671 11.6187 32.0335 11.5319 32C11.6187 31.9665 11.7126 31.9329 11.8134 31.8996C12.569 31.6503 13.462 31.5 14 31.5C14.5523 31.5 15 31.0523 15 30.5C15 29.9477 14.5523 29.5 14 29.5C13.4254 29.5 12.5226 29.3877 11.7873 29.1672C11.5941 29.1092 11.4306 29.049 11.2974 28.9903C11.4159 28.9376 11.5604 28.8834 11.7316 28.8308C12.4366 28.6139 13.336 28.5 14 28.5C14.5523 28.5 15 28.0523 15 27.5C15 26.9477 14.5523 26.5 14 26.5C13.4254 26.5 12.5226 26.3877 11.7873 26.1672C11.6777 26.1343 11.5776 26.1007 11.4873 26.067Z"
                                                  fill="currentColor"></path>
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M13.5 10.382V12C13.5 12.5167 13.5053 13.1354 13.6523 13.6744C13.7561 14.0553 13.8996 14.2919 14.0859 14.4317C14.8816 14.222 15.8088 14.1322 16.7039 14.2601C17.7583 14.4107 18.8748 14.8844 19.582 15.9453L20.3759 17.1361L18.9847 17.4721C18.5941 17.5664 18.3944 17.6948 18.2874 17.7953C18.1845 17.8918 18.1122 18.0138 18.0619 18.1945C18.0076 18.3896 17.9843 18.6347 17.9822 18.955C17.9812 19.1127 17.9852 19.2749 17.9899 19.452L17.9909 19.4879C17.9952 19.6499 18 19.8262 18 20C18 23.3137 15.3137 26 12 26C8.6863 26 6.00001 23.3137 6.00001 20C6.00001 19.8108 6.00384 19.6603 6.00738 19.5217C6.01201 19.3399 6.01612 19.1786 6.01036 18.9771C6.00164 18.6724 5.96752 18.4502 5.90286 18.2781C5.84523 18.1246 5.75703 17.9926 5.5915 17.8702C5.4129 17.7381 5.10246 17.5873 4.55908 17.4816L3.12725 17.2031L3.90325 15.968C4.95025 14.3016 6.56507 13.9881 7.77695 14.0645C8.18753 14.0904 8.56505 14.1599 8.88234 14.2391C9.66993 12.4933 11.119 11.5725 12.0528 11.1056L13.5 10.382ZM6.65071 16.1709C6.69502 16.2004 6.73833 16.2308 6.78066 16.2621C7.27801 16.6299 7.59164 17.0862 7.77518 17.5749C7.95168 18.0449 7.99806 18.5188 8.00954 18.9199C8.01605 19.1476 8.01011 19.4317 8.00512 19.6699C8.00242 19.7989 8.00001 19.9143 8.00001 20C8.00001 22.2091 9.79087 24 12 24C14.2091 24 16 22.2091 16 20C16 19.8543 15.996 19.7036 15.9914 19.5349L15.9906 19.5057C15.9859 19.3305 15.981 19.1373 15.9823 18.9421C15.9848 18.5565 16.0107 18.1055 16.1351 17.6584C16.2623 17.2011 16.495 16.739 16.9075 16.3475C16.7574 16.3007 16.5951 16.2648 16.4211 16.2399C15.7217 16.14 14.9416 16.2402 14.3162 16.4487C14.111 16.5171 13.889 16.5171 13.6838 16.4487C12.4861 16.0495 11.9545 15.0504 11.7227 14.2006C11.6855 14.064 11.6545 13.9262 11.6286 13.7891C11.1253 14.2598 10.6832 14.8905 10.4701 15.7425C10.3975 16.0329 10.1987 16.2755 9.92819 16.4037C9.65885 16.5313 9.34669 16.5321 9.07678 16.406Z  M11 19.5C11 20.0523 10.6642 20.5 10.25 20.5C9.83579 20.5 9.5 20.0523 9.5 19.5C9.5 18.9477 9.83579 18.5 10.25 18.5C10.6642 18.5 11 18.9477 11 19.5Z M14.5 19.5C14.5 20.0523 14.1642 20.5 13.75 20.5C13.3358 20.5 13 20.0523 13 19.5C13 18.9477 13.3358 18.5 13.75 18.5C14.1642 18.5 14.5 18.9477 14.5 19.5Z"
                                                  fill="currentColor"></path>
                                              </g>
                                            </g>
                                            <path fillRule="evenodd" clipRule="evenodd"
                                              d="M3 11C3 10.4477 3.44772 10 4 10H20C20.5523 10 21 10.4477 21 11V19C21 20.6523 19.6523 22 18 22H6C4.34772 22 3 20.6523 3 19V11ZM5 12V19C5 19.5477 5.45228 20 6 20H18C18.5477 20 19 19.5477 19 19V12H5ZM9.5 14.5C9.5 13.9477 9.94772 13.5 10.5 13.5H13.5C14.0523 13.5 14.5 13.9477 14.5 14.5C14.5 15.0523 14.0523 15.5 13.5 15.5H10.5C9.94772 15.5 9.5 15.0523 9.5 14.5Z"
                                              fill="currentColor"></path>
                                          </svg></button></span></div>
                                      <div style={{"viewTransitionName": "var(--vt-composer-search-action)"}}>
                                        <div><span className="" data-state="closed"><button
                                          className="flex h-8 min-w-8 items-center justify-center rounded-lg p-1 text-xs font-semibold hover:bg-black/10 focus-visible:outline-black dark:focus-visible:outline-white"
                                          aria-pressed="false" aria-label="Search the web"><svg width="24"
                                            height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                              d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9851 4.00291C11.9933 4.00046 11.9982 4.00006 11.9996 4C12.001 4.00006 12.0067 4.00046 12.0149 4.00291C12.0256 4.00615 12.047 4.01416 12.079 4.03356C12.2092 4.11248 12.4258 4.32444 12.675 4.77696C12.9161 5.21453 13.1479 5.8046 13.3486 6.53263C13.6852 7.75315 13.9156 9.29169 13.981 11H10.019C10.0844 9.29169 10.3148 7.75315 10.6514 6.53263C10.8521 5.8046 11.0839 5.21453 11.325 4.77696C11.5742 4.32444 11.7908 4.11248 11.921 4.03356C11.953 4.01416 11.9744 4.00615 11.9851 4.00291ZM8.01766 11C8.08396 9.13314 8.33431 7.41167 8.72334 6.00094C8.87366 5.45584 9.04762 4.94639 9.24523 4.48694C6.48462 5.49946 4.43722 7.9901 4.06189 11H8.01766ZM4.06189 13H8.01766C8.09487 15.1737 8.42177 17.1555 8.93 18.6802C9.02641 18.9694 9.13134 19.2483 9.24522 19.5131C6.48461 18.5005 4.43722 16.0099 4.06189 13ZM10.019 13H13.981C13.9045 14.9972 13.6027 16.7574 13.1726 18.0477C12.9206 18.8038 12.6425 19.3436 12.3823 19.6737C12.2545 19.8359 12.1506 19.9225 12.0814 19.9649C12.0485 19.9852 12.0264 19.9935 12.0153 19.9969C12.0049 20.0001 11.9999 20 11.9999 20C11.9999 20 11.9948 20 11.9847 19.9969C11.9736 19.9935 11.9515 19.9852 11.9186 19.9649C11.8494 19.9225 11.7455 19.8359 11.6177 19.6737C11.3575 19.3436 11.0794 18.8038 10.8274 18.0477C10.3973 16.7574 10.0955 14.9972 10.019 13ZM15.9823 13C15.9051 15.1737 15.5782 17.1555 15.07 18.6802C14.9736 18.9694 14.8687 19.2483 14.7548 19.5131C17.5154 18.5005 19.5628 16.0099 19.9381 13H15.9823ZM19.9381 11C19.5628 7.99009 17.5154 5.49946 14.7548 4.48694C14.9524 4.94639 15.1263 5.45584 15.2767 6.00094C15.6657 7.41167 15.916 9.13314 15.9823 11H19.9381Z"
                                              fill="currentColor"></path>
                                          </svg></button></span></div>
                                      </div>
                                    </div>
                                    <div className="flex gap-x-1">
                                      <div className="min-w-8"><span className="" data-state="closed"><button
                                        data-testid="composer-speech-button" aria-label="Start voice mode"
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:text-[#f4f4f4] disabled:opacity-30 dark:bg-white dark:text-black dark:focus-visible:outline-white"
                                        style={{"viewTransitionName": "var(--vt-composer-speech-button)"}}><svg
                                          width="24" height="24" viewBox="0 0 24 24" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path
                                            d="M9.5 4C8.67157 4 8 4.67157 8 5.5V18.5C8 19.3284 8.67157 20 9.5 20C10.3284 20 11 19.3284 11 18.5V5.5C11 4.67157 10.3284 4 9.5 4Z"
                                            fill="currentColor"></path>
                                          <path
                                            d="M13 8.5C13 7.67157 13.6716 7 14.5 7C15.3284 7 16 7.67157 16 8.5V15.5C16 16.3284 15.3284 17 14.5 17C13.6716 17 13 16.3284 13 15.5V8.5Z"
                                            fill="currentColor"></path>
                                          <path
                                            d="M4.5 9C3.67157 9 3 9.67157 3 10.5V13.5C3 14.3284 3.67157 15 4.5 15C5.32843 15 6 14.3284 6 13.5V10.5C6 9.67157 5.32843 9 4.5 9Z"
                                            fill="currentColor"></path>
                                          <path
                                            d="M19.5 9C18.6716 9 18 9.67157 18 10.5V13.5C18 14.3284 18.6716 15 19.5 15C20.3284 15 21 14.3284 21 13.5V10.5C21 9.67157 20.3284 9 19.5 9Z"
                                            fill="currentColor"></path>
                                        </svg></button></span></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="hidden @lg/thread:block h-[70px]" style={{"opacity": "1", "willChange": "auto"}}>
                        <div
                          className="mt-5 flex items-center justify-center gap-x-2 transition-opacity xl:gap-x-2.5 opacity-100 flex-nowrap">
                          <ul
                            className="relative flex items-stretch gap-x-2 gap-y-4 overflow-hidden py-2 sm:gap-y-2 xl:gap-x-2.5 xl:gap-y-2.5 flex-nowrap justify-start">
                            <li style={{"opacity": "1", "willChange": "auto"}}><button
                              className="group relative flex h-[42px] items-center gap-1.5 rounded-full border border-token-border-light px-3 py-2 text-start text-[13px] shadow-xxs transition enabled:hover:bg-token-main-surface-secondary disabled:cursor-not-allowed xl:gap-2 xl:text-[14px]"><svg
                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" className="icon-md" style={{"color": "rgb(53, 174, 71)"}}>
                                <path
                                  d="M4.5 17.5L7.56881 14.3817C8.32655 13.6117 9.55878 13.5826 10.352 14.316L16.5 20"
                                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"></path>
                                <path
                                  d="M19 12H18.3798C17.504 12 16.672 11.6173 16.102 10.9524L11.898 6.04763C11.328 5.38269 10.496 5 9.6202 5H6C4.89543 5 4 5.89543 4 7V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V17"
                                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"></path>
                                <path d="M19 5H18.3798C17.504 5 16.672 5.38269 16.102 6.04763L14 8.5"
                                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"></path>
                                <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor"></circle>
                                <path
                                  d="M18 14V10C18 9.58798 18.4704 9.35279 18.8 9.6L21.4667 11.6C21.7333 11.8 21.7333 12.2 21.4667 12.4L18.8 14.4C18.4704 14.6472 18 14.412 18 14Z"
                                  fill="currentColor"></path>
                                <path
                                  d="M18 7V3C18 2.58798 18.4704 2.35279 18.8 2.6L21.4667 4.6C21.7333 4.8 21.7333 5.2 21.4667 5.4L18.8 7.4C18.4704 7.64721 18 7.41202 18 7Z"
                                  fill="currentColor"></path>
                              </svg><span
                                className="max-w-full select-none whitespace-nowrap text-gray-600 transition group-hover:text-token-text-primary dark:text-gray-500">Create
                                image</span></button></li>
                            <li style={{"opacity": "1", "willChange": "auto"}}><button
                              className="group relative flex h-[42px] items-center gap-1.5 rounded-full border border-token-border-light px-3 py-2 text-start text-[13px] shadow-xxs transition enabled:hover:bg-token-main-surface-secondary disabled:cursor-not-allowed xl:gap-2 xl:text-[14px]"><svg
                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" className="icon-md" style={{"color": "rgb(118, 208, 235)"}}>
                                <path fillRule="evenodd" clipRule="evenodd"
                                  d="M13.9969 3.39017C14.5497 2.17402 15.961 1.60735 17.2013 2.10349L19.4044 2.98475C20.7337 3.51645 21.3458 5.05369 20.7459 6.35358L19.0629 10H20C20.5523 10 21 10.4477 21 11V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V11C3 10.4504 3.44331 10.0044 3.99183 10L3.84325 9.89871C3.83307 9.89177 3.82303 9.88465 3.81311 9.87733C2.55917 8.9526 2.79737 7.01262 4.23778 6.41871L6.35774 5.5446L7.08184 3.36883C7.57382 1.8905 9.49246 1.51755 10.5024 2.70393L11.9888 4.45002L13.5103 4.46084L13.9969 3.39017ZM15.5096 4.89554C16.2552 5.48975 16.5372 6.59381 15.9713 7.51403L14.8266 9.37513C14.8265 9.38763 14.8266 9.40262 14.8273 9.42012C14.8294 9.47125 14.8357 9.52793 14.8451 9.58262C14.8548 9.63855 14.8654 9.67875 14.8714 9.69773C14.9032 9.79819 14.9184 9.89994 14.9184 10H16.8602L18.93 5.51547C19.0499 5.25549 18.9275 4.94804 18.6617 4.8417L16.4585 3.96044C16.2105 3.86122 15.9282 3.97455 15.8176 4.21778L15.5096 4.89554ZM12.8885 10C12.8572 9.84122 12.8358 9.66998 12.8289 9.50115C12.8194 9.26483 12.8254 8.81125 13.0664 8.41953L14.2677 6.46628L11.9746 6.44997C11.3934 6.44584 10.8427 6.18905 10.4659 5.74646L8.97951 4.00037L8.25541 6.17614C8.07187 6.72765 7.65748 7.17203 7.12012 7.39359L5.00091 8.26739L7.06338 9.67378C7.19188 9.7614 7.29353 9.87369 7.3663 10H12.8885ZM5 12V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V12H5ZM9.5 14.5C9.5 13.9477 9.94771 13.5 10.5 13.5H13.5C14.0523 13.5 14.5 13.9477 14.5 14.5C14.5 15.0523 14.0523 15.5 13.5 15.5H10.5C9.94771 15.5 9.5 15.0523 9.5 14.5Z"
                                  fill="currentColor"></path>
                              </svg><span
                                className="max-w-full select-none whitespace-nowrap text-gray-600 transition group-hover:text-token-text-primary dark:text-gray-500">Surprise
                                me</span></button></li>
                            <li style={{"opacity": "1", "willChange": "auto"}}><button
                              className="group relative flex h-[42px] items-center gap-1.5 rounded-full border border-token-border-light px-3 py-2 text-start text-[13px] shadow-xxs transition enabled:hover:bg-token-main-surface-secondary disabled:cursor-not-allowed xl:gap-2 xl:text-[14px]"><svg
                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" className="icon-md" style={{"color": "rgb(108, 113, 255)"}}>
                                <path fillRule="evenodd" clipRule="evenodd"
                                  d="M5.91444 7.59106C4.3419 9.04124 3.28865 10.7415 2.77052 11.6971C2.66585 11.8902 2.66585 12.1098 2.77052 12.3029C3.28865 13.2585 4.3419 14.9588 5.91444 16.4089C7.48195 17.8545 9.50572 19 12 19C14.4943 19 16.518 17.8545 18.0855 16.4089C19.6581 14.9588 20.7113 13.2585 21.2295 12.3029C21.3341 12.1098 21.3341 11.8902 21.2295 11.6971C20.7113 10.7415 19.6581 9.04124 18.0855 7.59105C16.518 6.1455 14.4943 5 12 5C9.50572 5 7.48195 6.1455 5.91444 7.59106ZM4.55857 6.1208C6.36059 4.45899 8.84581 3 12 3C15.1542 3 17.6394 4.45899 19.4414 6.1208C21.2384 7.77798 22.4152 9.68799 22.9877 10.7438C23.4147 11.5315 23.4147 12.4685 22.9877 13.2562C22.4152 14.312 21.2384 16.222 19.4414 17.8792C17.6394 19.541 15.1542 21 12 21C8.84581 21 6.36059 19.541 4.55857 17.8792C2.76159 16.222 1.58478 14.312 1.01232 13.2562C0.58525 12.4685 0.585249 11.5315 1.01232 10.7438C1.58478 9.688 2.76159 7.77798 4.55857 6.1208ZM12 9.5C10.6193 9.5 9.49999 10.6193 9.49999 12C9.49999 13.3807 10.6193 14.5 12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5ZM7.49999 12C7.49999 9.51472 9.51471 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51471 16.5 7.49999 14.4853 7.49999 12Z"
                                  fill="currentColor"></path>
                              </svg><span
                                className="max-w-full select-none whitespace-nowrap text-gray-600 transition group-hover:text-token-text-primary dark:text-gray-500">Analyze
                                images</span></button></li>
                            <li style={{"opacity": "1", "willChange": "auto"}}><button
                              className="group relative flex h-[42px] items-center gap-1.5 rounded-full border border-token-border-light px-3 py-2 text-start text-[13px] shadow-xxs transition enabled:hover:bg-token-main-surface-secondary disabled:cursor-not-allowed xl:gap-2 xl:text-[14px]"><svg
                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" className="icon-md" style={{"color": "rgb(234, 132, 68)"}}>
                                <path fillRule="evenodd" clipRule="evenodd"
                                  d="M4 5C4 3.34315 5.34315 2 7 2H14.1716C14.9672 2 15.7303 2.31607 16.2929 2.87868L19.1213 5.70711C19.6839 6.26972 20 7.03278 20 7.82843V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V5ZM7 4C6.44772 4 6 4.44772 6 5V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7.82843C18 7.56321 17.8946 7.30886 17.7071 7.12132L14.8787 4.29289C14.6911 4.10536 14.4368 4 14.1716 4H7ZM8 10C8 9.44772 8.44772 9 9 9H15C15.5523 9 16 9.44772 16 10C16 10.5523 15.5523 11 15 11H9C8.44772 11 8 10.5523 8 10ZM8 14C8 13.4477 8.44772 13 9 13H13C13.5523 13 14 13.4477 14 14C14 14.5523 13.5523 15 13 15H9C8.44772 15 8 14.5523 8 14Z"
                                  fill="currentColor"></path>
                              </svg><span
                                className="max-w-full select-none whitespace-nowrap text-gray-600 transition group-hover:text-token-text-primary dark:text-gray-500">Summarize
                                text</span></button></li>
                            <li style={{"opacity": "1", "willChange": "auto"}}><button
                              className="group relative flex h-[42px] items-center gap-1.5 rounded-full border border-token-border-light px-3 py-2 text-start text-[13px] shadow-xxs transition enabled:hover:bg-token-main-surface-secondary disabled:cursor-not-allowed xl:gap-2 xl:text-[14px]"><svg
                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" className="icon-md" style={{"color": "rgb(108, 113, 255)"}}>
                                <path fillRule="evenodd" clipRule="evenodd"
                                  d="M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6ZM6 5C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5H6ZM7.29289 9.29289C7.68342 8.90237 8.31658 8.90237 8.70711 9.29289L10.7071 11.2929C11.0976 11.6834 11.0976 12.3166 10.7071 12.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L8.58579 12L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289ZM12 14C12 13.4477 12.4477 13 13 13H16C16.5523 13 17 13.4477 17 14C17 14.5523 16.5523 15 16 15H13C12.4477 15 12 14.5523 12 14Z"
                                  fill="currentColor"></path>
                              </svg><span
                                className="max-w-full select-none whitespace-nowrap text-gray-600 transition group-hover:text-token-text-primary dark:text-gray-500">Code</span></button>
                            </li>
                          </ul>
                          <div className="inline-block" style={{"opacity": "1", "willChange": "auto"}}><button
                            className="group relative flex h-[42px] items-center gap-1.5 rounded-full border border-token-border-light px-3 py-2 text-start text-[13px] shadow-xxs transition enabled:hover:bg-token-main-surface-secondary disabled:cursor-not-allowed xl:gap-2 xl:text-[14px]"><span
                              className="max-w-full select-none whitespace-nowrap text-gray-600 transition group-hover:text-token-text-primary dark:text-gray-500">More</span></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)}

            </div>
          </div>

          <div className="md:pt-0 dark:border-white/20 md:border-transparent md:dark:border-transparent w-full">
            <div>

              {chatContent.length > 0 && (<div className="m-auto text-base px-3 md:px-4 w-full md:px-5 lg:px-4 xl:px-5">
                <div
                  className="mx-auto flex flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
                  <div className="flex justify-center"></div>
                  <form className="w-full" type="button" aria-haspopup="dialog" aria-expanded="false"
                    aria-controls="radix-:rq7:" data-state="closed">
                    <div className="relative flex h-full max-w-full flex-1 flex-col">
                      <div className="absolute bottom-full left-0 right-0 z-20"></div>
                      <div className="group relative flex w-full items-center">
                        <div className="w-full">
                          <div id="composer-background"
                            className="flex w-full cursor-text flex-col rounded-3xl px-2.5 py-1 transition-colors contain-inline-size bg-[#f4f4f4] dark:bg-token-main-surface-secondary"
                            style={{"viewTransitionName": "var(--vt-composer);"}}>
                            <div className="flex min-h-[44px] items-start pl-2">
                              <div className="min-w-0 max-w-full flex-1">
                                <div
                                  className="_prosemirror-parent_cy42l_1 text-token-text-primary max-h-[25dvh] max-h-52 overflow-auto default-browser">
                                  <textarea
                                    className="block h-10 w-full resize-none border-0 bg-transparent px-0 py-2 text-token-text-primary placeholder:text-token-text-secondary"
                                    placeholder="Message ChatGPT" data-virtualkeyboard="true"
                                    style={{"display": "none"}}></textarea>
                                  <div contentEditable="true" translate="no" className="ProseMirror" id="prompt-textarea"
                                    data-virtualkeyboard="true">
                                    <p data-placeholder="Message ChatGPT" className="placeholder"><br
                                      className="ProseMirror-trailingBreak"/></p>
                                  </div>
                                </div>
                              </div>
                              <div className="w-[32px] pt-1"><span aria-hidden="true"
                                className="pointer-events-none invisible fixed left-0 top-0 block">O</span></div>
                            </div>
                            <div className="flex h-[44px] items-center justify-between">
                              <div className="flex gap-x-1 text-token-text-primary">
                                <div style={{"viewTransitionName": "var(--vt-composer-attach-file-action)"}}>
                                  <div className="relative">
                                    <div className="relative">
                                      <div className="flex flex-col"><input multiple="" tabIndex="-1" className="hidden"
                                        type="file" style={{"display": "none"}}/><span className="hidden"></span><button
                                          type="button" id="radix-:rqa:" aria-haspopup="menu" aria-expanded="false"
                                          data-state="closed"
                                          className="text-token-text-primary border border-transparent inline-flex items-center justify-center gap-1 rounded-lg text-sm dark:transparent dark:bg-transparent leading-none outline-none cursor-pointer hover:bg-token-main-surface-secondary dark:hover:bg-token-main-surface-secondary focus-visible:bg-token-main-surface-secondary radix-state-active:text-token-text-secondary radix-disabled:cursor-auto radix-disabled:bg-transparent radix-disabled:text-token-text-tertiary dark:radix-disabled:bg-transparent m-0 h-0 w-0 border-none bg-transparent p-0"></button><span
                                            className="flex" data-state="closed"><button aria-disabled="false"
                                              aria-label="Attach files"
                                              className="flex items-center justify-center h-8 w-8 rounded-lg rounded-bl-xl text-token-text-primary dark:text-white focus-visible:outline-black dark:focus-visible:outline-white hover:bg-black/10"><svg
                                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                              <path fillRule="evenodd" clipRule="evenodd"
                                                d="M9 7C9 4.23858 11.2386 2 14 2C16.7614 2 19 4.23858 19 7V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9C5 8.44772 5.44772 8 6 8C6.55228 8 7 8.44772 7 9V15C7 17.7614 9.23858 20 12 20C14.7614 20 17 17.7614 17 15V7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44772 15 9V15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15V7Z"
                                                fill="currentColor"></path>
                                            </svg></button></span>
                                        <div type="button" aria-haspopup="dialog" aria-expanded="false"
                                          aria-controls="radix-:rqd:" data-state="closed"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div style={{"viewTransitionName": "var(--vt-composer-system-hint-action)"}}><span
                                  className="hidden"></span><span className="" data-state="closed"><button type="button"
                                    id="radix-:rqe:" aria-haspopup="menu" aria-expanded="false" data-state="closed"
                                    className="_toolsButton_d2h2h_8 flex h-8 min-w-8 items-center justify-center rounded-lg p-1 text-xs font-semibold hover:bg-black/10 focus-visible:outline-black disabled:opacity-30 dark:focus-visible:outline-white"
                                    aria-label="Use a tool"><svg width="24" height="24" viewBox="0 0 24 24"
                                      fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg"
                                      className="pointer-events-none">
                                      <mask id="stuff-part-box-fill">
                                        <path d="M-6 -10H30V11H-6Z" fill="white"></path>
                                        <path d="M20 11H4V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V11Z"
                                          fill="black"></path>
                                      </mask>
                                      <mask id="stuff-part-star-fill">
                                        <path d="M-6 -6H30V11H-6Z" fill="white"></path>
                                        <path className="stuff-part-star"
                                          d="M8.05625 3.61554C8.30853 2.89184 9.2477 2.70929 9.75272 3.28578L11.2938 5.04497C11.4788 5.25615 11.744 5.37984 12.0247 5.38581L14.3629 5.43554C15.1291 5.45184 15.593 6.28864 15.2008 6.94708L14.0039 8.95633C13.8602 9.19753 13.8245 9.48802 13.9056 9.75682L14.5808 11.9959C14.8021 12.7297 14.1496 13.4294 13.4022 13.2599L11.1214 12.7425C10.8476 12.6804 10.5603 12.7362 10.3297 12.8964L8.40888 14.2305C7.7794 14.6677 6.91229 14.2633 6.84258 13.5001L6.62986 11.1711C6.60432 10.8915 6.46243 10.6355 6.23886 10.4657L4.37646 9.05111C3.76614 8.58754 3.88274 7.63792 4.58708 7.33577L6.73638 6.41376C6.99439 6.30307 7.19399 6.08903 7.28641 5.82392L8.05625 3.61554Z"
                                          fill="black"></path>
                                      </mask>
                                      <g mask="url(#stuff-part-box-fill)">
                                        <g mask="url(#stuff-part-star-fill)">
                                          <path className="stuff-part-pen" fillRule="evenodd" clipRule="evenodd"
                                            d="M14.1356 3.327C14.6861 2.06081 16.1589 1.48067 17.4251 2.03123L19.4885 2.92841C20.7547 3.47897 21.3348 4.95174 20.7842 6.21793L17.8342 13.0027C17.663 13.3963 17.3934 13.7392 17.0513 13.9984L13.054 17.026L12.4501 16.2289L11.4544 16.3212L11.3505 15.2023C11.295 14.6055 11.2326 13.9364 11.2047 13.6425L10.987 11.3504C10.947 10.9294 11.0145 10.505 11.1831 10.1172L14.1356 3.327ZM12.4501 16.2289L11.4544 16.3212C11.4879 16.6826 11.7146 16.9975 12.0468 17.1439C12.3789 17.2903 12.7646 17.245 13.054 17.026L12.4501 16.2289ZM13.2795 14.3467L15.8435 12.4043C15.9119 12.3525 15.9658 12.2839 16 12.2052L18.9501 5.42044C19.0602 5.1672 18.9442 4.87264 18.691 4.76253L16.6276 3.86535C16.3743 3.75524 16.0798 3.87126 15.9697 4.1245L13.0172 10.9147C12.9835 10.9922 12.97 11.0771 12.978 11.1613L13.1957 13.4533C13.2135 13.6399 13.2448 13.9752 13.2795 14.3467Z"
                                            fill="currentColor"></path>
                                        </g>
                                        <path className="stuff-part-star" fillRule="evenodd" clipRule="evenodd"
                                          d="M7.11197 3.28637C7.61654 1.83896 9.49489 1.47385 10.5049 2.62685L12.046 4.38603L14.3842 4.43577C15.9166 4.46836 16.8443 6.14195 16.0599 7.45885L14.863 9.4681L15.5382 11.7072C15.9808 13.1748 14.6758 14.5742 13.181 14.2351L10.9002 13.7177L8.97932 15.0518C7.72036 15.9262 5.98614 15.1175 5.84672 13.5911L5.634 11.262L3.7716 9.84744C2.55096 8.9203 2.78416 7.02106 4.19284 6.41676L6.34213 5.49475L7.11197 3.28637ZM10.5416 5.7039L9.00051 3.94471L8.23067 6.15309C8.04584 6.6833 7.64664 7.1114 7.13061 7.33276L4.98132 8.25478L6.84371 9.66936C7.29086 10.009 7.57464 10.5209 7.62571 11.0801L7.83843 13.4091L9.75929 12.075C10.2205 11.7547 10.7951 11.643 11.3427 11.7673L13.6234 12.2847L12.9482 10.0455C12.7861 9.50795 12.8574 8.92697 13.1448 8.44457L14.3416 6.43532L12.0034 6.38558C11.4421 6.37364 10.9116 6.12626 10.5416 5.7039Z"
                                          fill="currentColor"></path>
                                        <g className="stuff-part-jack">
                                          <path fillRule="evenodd" clipRule="evenodd"
                                            d="M11.4873 26.067C11.5514 26.0445 11.6198 26.0217 11.6925 25.9988L11.0922 24.091C10.6826 24.2199 10.239 24.3899 9.87818 24.6169C9.58085 24.804 9 25.243 9 26C9 26.7396 9.49534 27.2202 9.86829 27.4784C9.87463 27.4828 9.88099 27.4872 9.88737 27.4915C9.86663 27.5058 9.84613 27.5203 9.82589 27.535C9.45161 27.8072 9 28.2875 9 29C9 29.7396 9.49534 30.2202 9.86829 30.4784C9.90016 30.5005 9.93264 30.522 9.96568 30.5431C9.93938 30.5594 9.91347 30.5759 9.888 30.5926C9.70054 30.7159 9.49716 30.8773 9.33217 31.0864C9.16471 31.2986 9 31.6092 9 32C9 32.3908 9.16471 32.7014 9.33217 32.9136C9.49716 33.1227 9.70054 33.2841 9.888 33.4074C10.263 33.654 10.7308 33.8492 11.1866 33.9996C12.0976 34.3003 13.2047 34.5 14 34.5V32.5C13.462 32.5 12.569 32.3497 11.8134 32.1004C11.7126 32.0671 11.6187 32.0335 11.5319 32C11.6187 31.9665 11.7126 31.9329 11.8134 31.8996C12.569 31.6503 13.462 31.5 14 31.5C14.5523 31.5 15 31.0523 15 30.5C15 29.9477 14.5523 29.5 14 29.5C13.4254 29.5 12.5226 29.3877 11.7873 29.1672C11.5941 29.1092 11.4306 29.049 11.2974 28.9903C11.4159 28.9376 11.5604 28.8834 11.7316 28.8308C12.4366 28.6139 13.336 28.5 14 28.5C14.5523 28.5 15 28.0523 15 27.5C15 26.9477 14.5523 26.5 14 26.5C13.4254 26.5 12.5226 26.3877 11.7873 26.1672C11.6777 26.1343 11.5776 26.1007 11.4873 26.067Z"
                                            fill="currentColor"></path>
                                          <path fillRule="evenodd" clipRule="evenodd"
                                            d="M13.5 10.382V12C13.5 12.5167 13.5053 13.1354 13.6523 13.6744C13.7561 14.0553 13.8996 14.2919 14.0859 14.4317C14.8816 14.222 15.8088 14.1322 16.7039 14.2601C17.7583 14.4107 18.8748 14.8844 19.582 15.9453L20.3759 17.1361L18.9847 17.4721C18.5941 17.5664 18.3944 17.6948 18.2874 17.7953C18.1845 17.8918 18.1122 18.0138 18.0619 18.1945C18.0076 18.3896 17.9843 18.6347 17.9822 18.955C17.9812 19.1127 17.9852 19.2749 17.9899 19.452L17.9909 19.4879C17.9952 19.6499 18 19.8262 18 20C18 23.3137 15.3137 26 12 26C8.6863 26 6.00001 23.3137 6.00001 20C6.00001 19.8108 6.00384 19.6603 6.00738 19.5217C6.01201 19.3399 6.01612 19.1786 6.01036 18.9771C6.00164 18.6724 5.96752 18.4502 5.90286 18.2781C5.84523 18.1246 5.75703 17.9926 5.5915 17.8702C5.4129 17.7381 5.10246 17.5873 4.55908 17.4816L3.12725 17.2031L3.90325 15.968C4.95025 14.3016 6.56507 13.9881 7.77695 14.0645C8.18753 14.0904 8.56505 14.1599 8.88234 14.2391C9.66993 12.4933 11.119 11.5725 12.0528 11.1056L13.5 10.382ZM6.65071 16.1709C6.69502 16.2004 6.73833 16.2308 6.78066 16.2621C7.27801 16.6299 7.59164 17.0862 7.77518 17.5749C7.95168 18.0449 7.99806 18.5188 8.00954 18.9199C8.01605 19.1476 8.01011 19.4317 8.00512 19.6699C8.00242 19.7989 8.00001 19.9143 8.00001 20C8.00001 22.2091 9.79087 24 12 24C14.2091 24 16 22.2091 16 20C16 19.8543 15.996 19.7036 15.9914 19.5349L15.9906 19.5057C15.9859 19.3305 15.981 19.1373 15.9823 18.9421C15.9848 18.5565 16.0107 18.1055 16.1351 17.6584C16.2623 17.2011 16.495 16.739 16.9075 16.3475C16.7574 16.3007 16.5951 16.2648 16.4211 16.2399C15.7217 16.14 14.9416 16.2402 14.3162 16.4487C14.111 16.5171 13.889 16.5171 13.6838 16.4487C12.4861 16.0495 11.9545 15.0504 11.7227 14.2006C11.6855 14.064 11.6545 13.9262 11.6286 13.7891C11.1253 14.2598 10.6832 14.8905 10.4701 15.7425C10.3975 16.0329 10.1987 16.2755 9.92819 16.4037C9.65885 16.5313 9.34669 16.5321 9.07678 16.406Z  M11 19.5C11 20.0523 10.6642 20.5 10.25 20.5C9.83579 20.5 9.5 20.0523 9.5 19.5C9.5 18.9477 9.83579 18.5 10.25 18.5C10.6642 18.5 11 18.9477 11 19.5Z M14.5 19.5C14.5 20.0523 14.1642 20.5 13.75 20.5C13.3358 20.5 13 20.0523 13 19.5C13 18.9477 13.3358 18.5 13.75 18.5C14.1642 18.5 14.5 18.9477 14.5 19.5Z"
                                            fill="currentColor"></path>
                                        </g>
                                      </g>
                                      <path fillRule="evenodd" clipRule="evenodd"
                                        d="M3 11C3 10.4477 3.44772 10 4 10H20C20.5523 10 21 10.4477 21 11V19C21 20.6523 19.6523 22 18 22H6C4.34772 22 3 20.6523 3 19V11ZM5 12V19C5 19.5477 5.45228 20 6 20H18C18.5477 20 19 19.5477 19 19V12H5ZM9.5 14.5C9.5 13.9477 9.94772 13.5 10.5 13.5H13.5C14.0523 13.5 14.5 13.9477 14.5 14.5C14.5 15.0523 14.0523 15.5 13.5 15.5H10.5C9.94772 15.5 9.5 15.0523 9.5 14.5Z"
                                        fill="currentColor"></path>
                                    </svg></button></span></div>
                                <div style={{"viewTransitionName": "var(--vt-composer-search-action)"}}>
                                  <div><span className="" data-state="closed"><button
                                    className="flex h-8 min-w-8 items-center justify-center rounded-lg p-1 text-xs font-semibold hover:bg-black/10 focus-visible:outline-black dark:focus-visible:outline-white"
                                    aria-pressed="false" aria-label="Search the web"><svg width="24" height="24"
                                      viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path fillRule="evenodd" clipRule="evenodd"
                                        d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9851 4.00291C11.9933 4.00046 11.9982 4.00006 11.9996 4C12.001 4.00006 12.0067 4.00046 12.0149 4.00291C12.0256 4.00615 12.047 4.01416 12.079 4.03356C12.2092 4.11248 12.4258 4.32444 12.675 4.77696C12.9161 5.21453 13.1479 5.8046 13.3486 6.53263C13.6852 7.75315 13.9156 9.29169 13.981 11H10.019C10.0844 9.29169 10.3148 7.75315 10.6514 6.53263C10.8521 5.8046 11.0839 5.21453 11.325 4.77696C11.5742 4.32444 11.7908 4.11248 11.921 4.03356C11.953 4.01416 11.9744 4.00615 11.9851 4.00291ZM8.01766 11C8.08396 9.13314 8.33431 7.41167 8.72334 6.00094C8.87366 5.45584 9.04762 4.94639 9.24523 4.48694C6.48462 5.49946 4.43722 7.9901 4.06189 11H8.01766ZM4.06189 13H8.01766C8.09487 15.1737 8.42177 17.1555 8.93 18.6802C9.02641 18.9694 9.13134 19.2483 9.24522 19.5131C6.48461 18.5005 4.43722 16.0099 4.06189 13ZM10.019 13H13.981C13.9045 14.9972 13.6027 16.7574 13.1726 18.0477C12.9206 18.8038 12.6425 19.3436 12.3823 19.6737C12.2545 19.8359 12.1506 19.9225 12.0814 19.9649C12.0485 19.9852 12.0264 19.9935 12.0153 19.9969C12.0049 20.0001 11.9999 20 11.9999 20C11.9999 20 11.9948 20 11.9847 19.9969C11.9736 19.9935 11.9515 19.9852 11.9186 19.9649C11.8494 19.9225 11.7455 19.8359 11.6177 19.6737C11.3575 19.3436 11.0794 18.8038 10.8274 18.0477C10.3973 16.7574 10.0955 14.9972 10.019 13ZM15.9823 13C15.9051 15.1737 15.5782 17.1555 15.07 18.6802C14.9736 18.9694 14.8687 19.2483 14.7548 19.5131C17.5154 18.5005 19.5628 16.0099 19.9381 13H15.9823ZM19.9381 11C19.5628 7.99009 17.5154 5.49946 14.7548 4.48694C14.9524 4.94639 15.1263 5.45584 15.2767 6.00094C15.6657 7.41167 15.916 9.13314 15.9823 11H19.9381Z"
                                        fill="currentColor"></path>
                                    </svg></button></span></div>
                                </div>
                              </div>
                              <div className="flex gap-x-1">
                                <div className="min-w-8"><span className="" data-state="closed"><button
                                  data-testid="composer-speech-button" aria-label="Start voice mode"
                                  className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:text-[#f4f4f4] disabled:opacity-30 dark:bg-white dark:text-black dark:focus-visible:outline-white"
                                  style={{"viewTransitionName": "var(--vt-composer-speech-button)"}}><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="M9.5 4C8.67157 4 8 4.67157 8 5.5V18.5C8 19.3284 8.67157 20 9.5 20C10.3284 20 11 19.3284 11 18.5V5.5C11 4.67157 10.3284 4 9.5 4Z"
                                      fill="currentColor"></path>
                                    <path
                                      d="M13 8.5C13 7.67157 13.6716 7 14.5 7C15.3284 7 16 7.67157 16 8.5V15.5C16 16.3284 15.3284 17 14.5 17C13.6716 17 13 16.3284 13 15.5V8.5Z"
                                      fill="currentColor"></path>
                                    <path
                                      d="M4.5 9C3.67157 9 3 9.67157 3 10.5V13.5C3 14.3284 3.67157 15 4.5 15C5.32843 15 6 14.3284 6 13.5V10.5C6 9.67157 5.32843 9 4.5 9Z"
                                      fill="currentColor"></path>
                                    <path
                                      d="M19.5 9C18.6716 9 18 9.67157 18 10.5V13.5C18 14.3284 18.6716 15 19.5 15C20.3284 15 21 14.3284 21 13.5V10.5C21 9.67157 20.3284 9 19.5 9Z"
                                      fill="currentColor"></path>
                                  </svg></button></span></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>)}

              <div className="relative w-full px-2 py-2 text-center text-xs text-token-text-secondary empty:hidden md:px-[60px]">
                <div
                  className="w-full px-2 py-2 text-center text-xs text-token-text-secondary empty:hidden md:px-[60px] @lg/thread:absolute @lg/thread:bottom-0 @lg/thread:left-0">
                  <div className="min-h-4">
                    <div>ChatGPT can make mistakes. Check important info.</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
        <div className="group absolute bottom-2 end-2 z-20 flex flex-col gap-1 md:flex lg:bottom-3 lg:end-3">
          <button className="flex h-6 w-6 items-center justify-center rounded-full border border-token-border-light text-xs text-token-text-secondary" type="button" id="radix-:r6b:" aria-haspopup="menu" aria-expanded="false" data-state="closed" data-testid="undefined-button">?
          </button>
        </div>
      </main>

      {
        dropDownToggle && (
          <div ref={dropdownRef} dir="ltr" style={{
            "position": "fixed", "left": "0px", "top": "0px", "transform": `translate(${sideBarWidth ? "271.818px, 56.3636px" : "92px, 56px"})`, "minWidth": "max-content", "--radix-popper-transform-origin": "0% 0px", "zIndex": "50", "--radix-popper-available-width": "1172.5567932128906px", "--radix-popper-available-height": "301.2755479812622px", "--radix-popper-anchor-width": "142.59942626953125px", "--radix-popper-anchor-height": "39.98579406738281px"
          }} data-radix-popper-content-wrapper="">
            <div data- side="bottom" data-align="start" role="menu" aria-orientation="vertical" data-state="open"
              data-radix-menu-content="" dir="ltr" id="radix-:r6d:" aria-labelledby="radix-:r6c:"
              className="z-50 max-w-xs rounded-2xl popover bg-token-main-surface-primary shadow-lg will-change-[opacity,transform] radix-side-bottom:animate-slideUpAndFade radix-side-left:animate-slideRightAndFade radix-side-right:animate-slideLeftAndFade radix-side-top:animate-slideDownAndFade border border-token-border-light min-w-[340px] overflow-hidden py-0"
              tabIndex="-1" data-orientation="vertical"
              style={{ "outline": "none", "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)", "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)", "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)", "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)", "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)" }}>
              <div className="max-h-[var(--radix-dropdown-menu-content-available-height)] overflow-y-auto py-2 min-w-fit">
                <div className="mb-1 flex items-center justify-between px-5 pt-2"><span
                  className="text-sm text-token-text-tertiary">Model</span><a
                    href="https://help.openai.com/en/articles/7102672-how-can-i-access-gpt-4" target="_blank"
                    rel="noreferrer"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg" className="icon-md h-5 w-5 pl-0.5 text-token-text-tertiary">
                      <path
                        d="M13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V12Z"
                        fill="currentColor"></path>
                      <path
                        d="M12 9.5C12.6904 9.5 13.25 8.94036 13.25 8.25C13.25 7.55964 12.6904 7 12 7C11.3096 7 10.75 7.55964 10.75 8.25C10.75 8.94036 11.3096 9.5 12 9.5Z"
                        fill="currentColor"></path>
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z"
                        fill="currentColor"></path>
                    </svg></a></div>
                <div role="menuitem"
                  className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-token-main-surface-secondary dark:focus-visible:bg-token-main-surface-secondary rounded-md my-0 px-3 mx-2 dark:radix-state-open:bg-token-main-surface-secondary gap-2.5 py-3 !pr-3 !opacity-100"
                  data-testid="model-switcher-gpt-4o" tabIndex="-1" data-orientation="vertical" data-radix-collection-item="">
                  <div className="flex grow items-center justify-between gap-2">
                    <div className="">
                      <div className="flex items-center gap-3">
                        <div>GPT-4o<div className="text-token-text-secondary text-xs">Great for most questions</div>
                        </div>
                      </div>
                    </div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                      className="icon-md">
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM16.0755 7.93219C16.5272 8.25003 16.6356 8.87383 16.3178 9.32549L11.5678 16.0755C11.3931 16.3237 11.1152 16.4792 10.8123 16.4981C10.5093 16.517 10.2142 16.3973 10.0101 16.1727L7.51006 13.4227C7.13855 13.014 7.16867 12.3816 7.57733 12.0101C7.98598 11.6386 8.61843 11.6687 8.98994 12.0773L10.6504 13.9039L14.6822 8.17451C15 7.72284 15.6238 7.61436 16.0755 7.93219Z"
                        fill="currentColor"></path>
                    </svg>
                  </div>
                </div>
                <div role="menuitem"
                  className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-token-main-surface-secondary dark:focus-visible:bg-token-main-surface-secondary rounded-md my-0 px-3 mx-2 dark:radix-state-open:bg-token-main-surface-secondary gap-2.5 py-3 !pr-3"
                  data-testid="model-switcher-gpt-4o-jawbone" tabIndex="-1" data-orientation="vertical"
                  data-radix-collection-item="">
                  <div className="flex grow items-center justify-between gap-2">
                    <div className="">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="flex items-center gap-2"><span>GPT-4o with scheduled tasks</span>
                            <div
                              className="border-token-text-quartenary items-center rounded-full border px-1 py-0.5 text-[8px] font-semibold uppercase leading-3 text-token-text-secondary dark:border-token-border-heavy dark:text-token-text-tertiary">
                              Beta</div>
                          </div>
                          <div className="text-token-text-secondary text-xs">Ask ChatGPT to follow up later</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div role="menuitem"
                  className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-token-main-surface-secondary dark:focus-visible:bg-token-main-surface-secondary rounded-md my-0 px-3 mx-2 dark:radix-state-open:bg-token-main-surface-secondary gap-2.5 py-3 !pr-3"
                  data-testid="model-switcher-o1" tabIndex="-1" data-orientation="vertical" data-radix-collection-item="">
                  <div className="flex grow items-center justify-between gap-2">
                    <div className="">
                      <div className="flex items-center gap-3">
                        <div>o1<div className="text-token-text-secondary text-xs">Uses advanced reasoning</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div role="menuitem"
                  className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-token-main-surface-secondary dark:focus-visible:bg-token-main-surface-secondary rounded-md my-0 px-3 mx-2 dark:radix-state-open:bg-token-main-surface-secondary gap-2.5 py-3 !pr-3"
                  data-testid="model-switcher-o1-mini" tabIndex="-1" data-orientation="vertical" data-radix-collection-item="">
                  <div className="flex grow items-center justify-between gap-2">
                    <div className="">
                      <div className="flex items-center gap-3">
                        <div>o1-mini<div className="text-token-text-secondary text-xs">Faster at reasoning</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div role="menuitem" id="radix-:r7m:" aria-haspopup="menu" aria-expanded="false" aria-controls="radix-:r7l:"
                  data-state="closed" data-testid="more-models-submenu"
                  className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-token-main-surface-secondary dark:focus-visible:bg-token-main-surface-secondary rounded-md my-0 px-3 mx-2 dark:radix-state-open:bg-token-main-surface-secondary gap-2.5 py-3"
                  tabIndex="-1" data-orientation="vertical" data-radix-collection-item="">
                  <div className="flex grow justify-between gap-2 overflow-hidden">More models</div>
                  <div className="ml-auto flex items-center text-token-text-tertiary group-data-[disabled]:opacity-50"><svg width="24"
                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="icon-md rtl:-scale-x-100">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M9.29289 18.7071C8.90237 18.3166 8.90237 17.6834 9.29289 17.2929L14.5858 12L9.29289 6.70711C8.90237 6.31658 8.90237 5.68342 9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289L16.7071 11.2929C16.8946 11.4804 17 11.7348 17 12C17 12.2652 16.8946 12.5196 16.7071 12.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071Z"
                      fill="currentColor"></path>
                  </svg></div>
                </div>
                <div role="separator" aria-orientation="horizontal" className="mx-5 my-1 h-px bg-token-border-light"></div>
                <div role="menuitem"
                  className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-token-main-surface-secondary dark:focus-visible:bg-token-main-surface-secondary rounded-md my-0 px-3 mx-2 dark:radix-state-open:bg-token-main-surface-secondary py-3 gap-3 !pr-3"
                  tabIndex="-1" data-orientation="vertical" data-radix-collection-item="">
                  <div className="flex items-center justify-center text-token-text-secondary h-5 w-7"><svg width="24" height="24"
                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M10.9739 3.25193C11.0996 3.78971 10.7656 4.3276 10.2278 4.45333C8.71987 4.80589 7.37959 5.59978 6.35157 6.69357C5.97334 7.09601 5.34048 7.11563 4.93804 6.73739C4.5356 6.35916 4.51598 5.7263 4.89422 5.32386C6.18477 3.95074 7.87069 2.9505 9.77245 2.50585C10.3102 2.38012 10.8481 2.71415 10.9739 3.25193ZM13.0264 3.25196C13.1521 2.71418 13.69 2.38016 14.2278 2.50592C16.1295 2.95059 17.8153 3.95083 19.1058 5.32393C19.4841 5.72637 19.4645 6.35923 19.062 6.73746C18.6596 7.11569 18.0267 7.09607 17.6485 6.69363C16.6205 5.59985 15.2803 4.80597 13.7724 4.45338C13.2346 4.32763 12.9006 3.78974 13.0264 3.25196ZM3.90936 8.51416C4.43816 8.6735 4.73766 9.23135 4.57832 9.76015C4.36501 10.4681 4.25 11.2197 4.25 12C4.25 12.7745 4.36331 13.5303 4.57474 14.2495C4.73051 14.7793 4.42725 15.3351 3.89739 15.4909C3.36753 15.6467 2.81171 15.3434 2.65594 14.8136C2.39202 13.9159 2.25 12.9702 2.25 12C2.25 11.0221 2.39427 10.0761 2.66337 9.18311C2.82271 8.65432 3.38056 8.35481 3.90936 8.51416ZM20.0907 8.51424C20.6195 8.3549 21.1773 8.65441 21.3367 9.18321C21.6057 10.0762 21.75 11.0222 21.75 12C21.75 12.9702 21.608 13.9158 21.3441 14.8135C21.1883 15.3433 20.6325 15.6466 20.1026 15.4908C19.5728 15.3351 19.2695 14.7793 19.4253 14.2494C19.6367 13.5303 19.75 12.7745 19.75 12C19.75 11.2197 19.635 10.4681 19.4217 9.76022C19.2624 9.23142 19.5619 8.67357 20.0907 8.51424ZM19.1091 17.2823C19.5227 17.6483 19.5613 18.2803 19.1953 18.6939C17.9017 20.1558 16.1885 21.2454 14.2402 21.7273C13.7041 21.86 13.162 21.5328 13.0294 20.9967C12.8968 20.4606 13.2239 19.9185 13.76 19.7859C15.2896 19.4075 16.6553 18.5463 17.6975 17.3685C18.0635 16.9549 18.6955 16.9163 19.1091 17.2823ZM6.17165 17.2744C6.63471 17.5754 6.76609 18.1948 6.4651 18.6578L5.59269 20H10.0001C10.5524 20 11.0001 20.4477 11.0001 21C11.0001 21.5523 10.5524 22 10.0001 22H3.75C3.38329 22 3.046 21.7993 2.87108 21.477C2.69617 21.1547 2.7117 20.7625 2.91156 20.455L4.78822 17.5678C5.08921 17.1048 5.70859 16.9734 6.17165 17.2744Z"
                      fill="currentColor"></path>
                  </svg></div>
                  <div className="flex grow items-center justify-between gap-2">
                    <div className="flex flex-1 items-center gap-3">Temporary chat</div><button type="button" role="switch"
                      aria-checked="false" data-state="unchecked" value="on" aria-label="Temporary"
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-token-text-secondary focus-visible:ring-offset-2 focus-visible:radix-state-checked:ring-black focus-visible:dark:ring-token-main-surface-primary focus-visible:dark:radix-state-checked:ring-green-600 cursor-pointer bg-gray-200 radix-state-checked:bg-black dark:border dark:border-token-border-medium dark:bg-transparent relative shrink-0 rounded-full dark:radix-state-checked:border-green-600 dark:radix-state-checked:bg-green-600 h-[20px] w-[32px]"
                      data-testid="temporary-chat-toggle"><span data-state="unchecked"
                        className="flex items-center justify-center rounded-full transition-transform duration-100 will-change-transform ltr:translate-x-0.5 rtl:-translate-x-0.5 bg-white h-[16px] w-[16px] ltr:radix-state-checked:translate-x-[14px] rtl:radix-state-checked:translate-x-[-14px]"></span></button>
                  </div>
                </div>
              </div>
            </div>
          </div >
        )
      }


    </div>
  )
}

export default Content;
