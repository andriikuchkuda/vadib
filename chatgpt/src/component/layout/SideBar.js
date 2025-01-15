import React, {useContext, useState} from 'react';
import LayoutContext from '../../context/AuthContext';

const SideBar = () => {
  const {sideBarWidth, setSideBarWidth} = useContext(LayoutContext);

  const closeSidebarHandler = () => {
    setSideBarWidth(0)
  }

  return (
    <div className="z-[21] flex-shrink-0 overflow-x-hidden bg-token-sidebar-surface-primary max-md:!w-0"
      style={{ "width": `${sideBarWidth}px`, "transition" : "width 0.6s ease" }}>
      <div className="h-full w-[260px]">
        <div className="flex h-full min-h-0 flex-col">
          <div className="draggable relative h-full w-full flex-1 items-start border-white/20">
            <h2 style={{ "position": "absolute", "border": "0", "width": "1px", "height": "1px", "padding": "0", "margin": "-1px", "overflow ": "hidden", "clip": "rect(0, 0, 0, 0)", "whiteSpace": "nowrap", "wordWrap": "normal" }}>Chat history</h2>

            <nav className="flex h-full w-full flex-col px-3" aria-label="Chat history">
              <div className="flex justify-between flex h-[60px] items-center md:h-header-height"><span className="flex"
                data-state="closed">
                <button onClick={closeSidebarHandler} aria-label="Close sidebar" data-testid="close-sidebar-button"
                  className="h-10 rounded-lg px-2 text-token-text-secondary focus-visible:outline-0 disabled:text-token-text-quaternary focus-visible:bg-token-sidebar-surface-secondary enabled:hover:bg-token-sidebar-surface-secondary no-draggable">
                  <svg
                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="icon-xl-heavy max-md:hidden">
                    <path fill-rule="evenodd" clipRule="evenodd"
                      d="M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z"
                      fill="currentColor"></path>
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="icon-xl-heavy md:hidden">
                    <path fill-rule="evenodd" clipRule="evenodd"
                      d="M3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8ZM3 16C3 15.4477 3.44772 15 4 15H14C14.5523 15 15 15.4477 15 16C15 16.5523 14.5523 17 14 17H4C3.44772 17 3 16.5523 3 16Z"
                      fill="currentColor"></path>
                  </svg>
                </button>
              </span>
                <div className="flex"><span className="flex" data-state="closed"><button aria-label="Ctrl K"
                  className="h-10 rounded-lg px-2 text-token-text-secondary focus-visible:outline-0 disabled:text-token-text-quaternary focus-visible:bg-token-sidebar-surface-secondary enabled:hover:bg-token-sidebar-surface-secondary"><svg
                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="icon-xl-heavy">
                    <path fill-rule="evenodd" clipRule="evenodd"
                      d="M10.75 4.25C7.16015 4.25 4.25 7.16015 4.25 10.75C4.25 14.3399 7.16015 17.25 10.75 17.25C14.3399 17.25 17.25 14.3399 17.25 10.75C17.25 7.16015 14.3399 4.25 10.75 4.25ZM2.25 10.75C2.25 6.05558 6.05558 2.25 10.75 2.25C15.4444 2.25 19.25 6.05558 19.25 10.75C19.25 12.7369 18.5683 14.5645 17.426 16.0118L21.4571 20.0429C21.8476 20.4334 21.8476 21.0666 21.4571 21.4571C21.0666 21.8476 20.4334 21.8476 20.0429 21.4571L16.0118 17.426C14.5645 18.5683 12.7369 19.25 10.75 19.25C6.05558 19.25 2.25 15.4444 2.25 10.75Z"
                      fill="currentColor"></path>
                  </svg></button></span><span className="flex" data-state="closed"><button aria-label="New chat"
                    data-testid="create-new-chat-button"
                    className="h-10 rounded-lg px-2 text-token-text-secondary focus-visible:outline-0 disabled:text-token-text-quaternary focus-visible:bg-token-sidebar-surface-secondary enabled:hover:bg-token-sidebar-surface-secondary"><svg
                      width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg" className="icon-xl-heavy">
                      <path
                        d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z"
                        fill="currentColor"></path>
                    </svg></button></span></div>
              </div>
              <div className="flex-col flex-1 transition-opacity duration-500 relative -mr-2 pr-2 overflow-y-auto">
                <div className="group/sidebar">
                  <div className="bg-token-sidebar-surface-primary pt-0">
                    <div tabIndex="0" style={{ "willChange": "auto", "transform": "none" }}><a title="ChatGPT"
                      className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm flex items-center gap-2.5 p-2 screen-arch:py-[7px]"
                      data-discover="true" href="/" style={{ "--item-background-color": "var(--sidebar-surface-primary)" }}>
                      <div className="flex h-6 w-6 items-center justify-center text-token-text-secondary">
                        <div className="h-6 w-6">
                          <div
                            className="gizmo-shadow-stroke relative flex h-full items-center justify-center rounded-full bg-token-main-surface-primary text-token-text-primary">
                            <svg width="41" height="41" viewBox="0 0 41 41" fill="none"
                              xmlns="http://www.w3.org/2000/svg" className="h-2/3 w-2/3" role="img"><text x="-9999"
                                y="-9999">ChatGPT</text>
                              <path
                                d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z"
                                fill="currentColor"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div
                        className="text-sm grow overflow-hidden text-ellipsis whitespace-nowrap text-token-text-primary">
                        ChatGPT</div>
                      <div className="flex gap-2"><span className="flex items-center" data-state="closed"><button
                        className="invisible text-token-text-secondary hover:text-token-text-primary group-hover:visible"
                        aria-label="New chat"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg" className="icon-md">
                          <path
                            d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z"
                            fill="currentColor"></path>
                        </svg></button></span></div>
                    </a></div>
                  </div>
                  <div className="relative self-stretch">
                    <a title="Sora"
                      className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm flex items-center gap-2.5 p-2 screen-arch:py-[7px]" href="https://sora.com?utm_source=chatgpt" target="_blank"
                      style={{ "--item-background-color": "var(--sidebar-surface-primary)" }}>
                      <div className="flex h-6 w-6 items-center justify-center text-token-text-secondary"><img
                        alt="Sora icon" src="https://cdn.oaistatic.com/assets/sora-mutf8tav.webp" /></div>
                      <div className="text-sm grow overflow-hidden text-ellipsis whitespace-nowrap text-token-text-primary">
                        Sora</div>
                      <div className="invisible text-token-text-secondary hover:text-token-text-primary group-hover:visible">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                          className="icon-md">
                          <g transform="rotate(45 12 12)">
                            <path fill-rule="evenodd" clipRule="evenodd"
                              d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41422L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z"
                              fill="currentColor"></path>
                          </g>
                        </svg>
                      </div>
                    </a></div>
                  <div>
                    <div><a title="Data Analyst"
                      className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm flex items-center gap-2.5 p-2 screen-arch:py-[7px]"
                      data-discover="true" href="/g/g-HMNcP6w7d-data-analyst"
                      style={{ "--item-background-color": "var(--sidebar-surface-primary)" }}>
                      <div className="flex h-6 w-6 items-center justify-center text-token-text-secondary">
                        <div className="h-6 w-6 shrink-0">
                          <div className="gizmo-shadow-stroke overflow-hidden rounded-full"><img
                            className="h-full w-full bg-token-main-surface-secondary" alt="GPT Icon" width="80"
                            height="80"
                            src="https://chatgpt.com/backend-api/content?id=file-id374Jq85g2WfDgpuOdAMTEk&amp;gizmo_id=g-HMNcP6w7d&amp;ts=482454&amp;p=gpp&amp;sig=cddebf77bdf4b36a6f194f3a68c55d8758dcc4d080eacc4ee67faec5815139df&amp;v=0" />
                          </div>
                        </div>
                      </div>
                      <div
                        className="text-sm grow overflow-hidden text-ellipsis whitespace-nowrap text-token-text-primary">
                        Data Analyst</div>
                      <div className="flex gap-2"><span className="flex items-center" data-state="closed"><button
                        className="invisible text-token-text-secondary hover:text-token-text-primary group-hover:visible"><svg
                          width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg" className="icon-md">
                          <path
                            d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z"
                            fill="currentColor"></path>
                        </svg></button></span></div>
                    </a></div>
                    <div><a title="image generator"
                      className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm flex items-center gap-2.5 p-2 screen-arch:py-[7px]"
                      data-discover="true" href="/g/g-pmuQfob8d-image-generator"
                      style={{ "--item-background-color": "var(--sidebar-surface-primary)" }}>
                      <div className="flex h-6 w-6 items-center justify-center text-token-text-secondary">
                        <div className="h-6 w-6 shrink-0">
                          <div className="gizmo-shadow-stroke overflow-hidden rounded-full"><img
                            className="h-full w-full bg-token-main-surface-secondary" alt="GPT Icon" width="80"
                            height="80"
                            src="https://chatgpt.com/backend-api/content?id=file-M1df4Ab7Ow6QCJ871tBUsi0x&amp;gizmo_id=g-pmuQfob8d&amp;ts=482454&amp;p=gpp&amp;sig=c877c2eab0bcd584cfb6b0bc5c92ef339edbe3bd3097afe7e3d0f92824cd5570&amp;v=0" />
                          </div>
                        </div>
                      </div>
                      <div
                        className="text-sm grow overflow-hidden text-ellipsis whitespace-nowrap text-token-text-primary">
                        image generator</div>
                      <div className="flex gap-2"><span className="flex items-center" data-state="closed"><button
                        className="invisible text-token-text-secondary hover:text-token-text-primary group-hover:visible"><svg
                          width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg" className="icon-md">
                          <path
                            d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z"
                            fill="currentColor"></path>
                        </svg></button></span></div>
                    </a></div><button
                      className="flex h-10 w-full items-center gap-2 rounded-lg px-2 text-sm text-token-text-primary hover:bg-token-sidebar-surface-secondary">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center"><svg width="24" height="24"
                        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        className="icon-md text-token-text-primary">
                        <path fill-rule="evenodd" clipRule="evenodd"
                          d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                          fill="currentColor"></path>
                      </svg></div>
                      <div className="flex grow items-center gap-1">1 more<svg width="24" height="24" viewBox="0 0 24 24"
                        fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-xs">
                        <path fill-rule="evenodd" clipRule="evenodd"
                          d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                          fill="currentColor"></path>
                      </svg></div>
                    </button>
                    <div tabIndex="0"><a data-discover="true" href="/gpts"><button data-testid="explore-gpts-button"
                      className="flex w-full items-center gap-2.5 rounded-lg px-2 text-token-text-primary hover:bg-token-sidebar-surface-secondary h-9">
                      <div className="flex h-6 w-6 items-center justify-center text-token-text-secondary"><svg
                        width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        className="icon-md">
                        <path fill-rule="evenodd" clipRule="evenodd"
                          d="M6.75 4.5C5.50736 4.5 4.5 5.50736 4.5 6.75C4.5 7.99264 5.50736 9 6.75 9C7.99264 9 9 7.99264 9 6.75C9 5.50736 7.99264 4.5 6.75 4.5ZM2.5 6.75C2.5 4.40279 4.40279 2.5 6.75 2.5C9.09721 2.5 11 4.40279 11 6.75C11 9.09721 9.09721 11 6.75 11C4.40279 11 2.5 9.09721 2.5 6.75Z"
                          fill="currentColor"></path>
                        <path fill-rule="evenodd" clipRule="evenodd"
                          d="M17.25 4.5C16.0074 4.5 15 5.50736 15 6.75C15 7.99264 16.0074 9 17.25 9C18.4926 9 19.5 7.99264 19.5 6.75C19.5 5.50736 18.4926 4.5 17.25 4.5ZM13 6.75C13 4.40279 14.9028 2.5 17.25 2.5C19.5972 2.5 21.5 4.40279 21.5 6.75C21.5 9.09721 19.5972 11 17.25 11C14.9028 11 13 9.09721 13 6.75Z"
                          fill="currentColor"></path>
                        <path fill-rule="evenodd" clipRule="evenodd"
                          d="M6.75 15C5.50736 15 4.5 16.0074 4.5 17.25C4.5 18.4926 5.50736 19.5 6.75 19.5C7.99264 19.5 9 18.4926 9 17.25C9 16.0074 7.99264 15 6.75 15ZM2.5 17.25C2.5 14.9028 4.40279 13 6.75 13C9.09721 13 11 14.9028 11 17.25C11 19.5972 9.09721 21.5 6.75 21.5C4.40279 21.5 2.5 19.5972 2.5 17.25Z"
                          fill="currentColor"></path>
                        <path fill-rule="evenodd" clipRule="evenodd"
                          d="M17.25 15C16.0074 15 15 16.0074 15 17.25C15 18.4926 16.0074 19.5 17.25 19.5C18.4926 19.5 19.5 18.4926 19.5 17.25C19.5 16.0074 18.4926 15 17.25 15ZM13 17.25C13 14.9028 14.9028 13 17.25 13C19.5972 13 21.5 14.9028 21.5 17.25C21.5 19.5972 19.5972 21.5 17.25 21.5C14.9028 21.5 13 19.5972 13 17.25Z"
                          fill="currentColor"></path>
                      </svg></div><span className="text-sm">Explore GPTs</span>
                    </button></a></div>
                  </div>
                  <div className="pl-2 text-sm screen-arch:pl-1">
                    <div
                      className="z-20 screen-arch:sticky screen-arch:top-[var(--sticky-title-offset)] select-none overflow-clip text-ellipsis break-all pt-7 text-xs font-semibold text-token-text-primary screen-arch:-mr-2 screen-arch:h-10 screen-arch:min-w-[50cqw] screen-arch:-translate-x-2 screen-arch:bg-[var(--sidebar-surface)] screen-arch:py-1 screen-arch:pl-2 screen-arch:text-token-text-secondary">
                      <div className="flex h-[26px] w-full items-center justify-between">Projects</div>
                    </div>
                    <aside className="-ml-2 flex flex-col gap-4 mb-0">
                      <ul className="flex flex-col screen-arch:mb-3"><span className="" data-state="closed"><button
                        className="flex w-full items-center gap-2.5 rounded-lg px-2 text-token-text-primary hover:bg-token-sidebar-surface-secondary h-9">
                        <div className="flex h-6 w-6 items-center justify-center text-token-text-secondary"><svg
                          xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                          viewBox="0 0 24 24" className="icon-md">
                          <path fill="currentColor"
                            d="M20 15a1 1 0 1 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2z">
                          </path>
                          <path fill="currentColor"
                            d="M21.956 8.748C22 9.29 22 9.954 22 10.758V11a1 1 0 0 1-1 1H4v3.2c0 .857 0 1.439.038 1.889.035.438.1.663.18.819a2 2 0 0 0 .874.874c.156.08.38.145.819.18C6.361 19 6.943 19 7.8 19H12a1 1 0 1 1 0 2H7.759c-.805 0-1.47 0-2.01-.044-.563-.046-1.08-.145-1.565-.392a4 4 0 0 1-1.748-1.748c-.247-.485-.346-1.002-.392-1.564C2 16.71 2 16.046 2 15.242V8.758c0-.805 0-1.47.044-2.01.046-.563.145-1.08.392-1.565a4 4 0 0 1 1.748-1.748c.485-.247 1.002-.346 1.564-.392C6.29 3 6.954 3 7.758 3h.851c.146 0 .256 0 .365.006a4 4 0 0 1 2.454 1.016c.081.073.16.151.262.254l.017.017c.127.127.164.164.2.196a2 2 0 0 0 1.227.508c.048.003.1.003.28.003h2.827c.805 0 1.47 0 2.01.044.563.046 1.08.145 1.565.392a4 4 0 0 1 1.748 1.748c.247.485.346 1.002.392 1.564M10.093 5.511a2 2 0 0 0-1.227-.508A6 6 0 0 0 8.586 5H7.8c-.857 0-1.439 0-1.889.038-.438.035-.663.1-.819.18a2 2 0 0 0-.874.874c-.08.156-.145.38-.18.819C4 7.361 4 7.943 4 8.8V10h15.998a15 15 0 0 0-.036-1.089c-.035-.438-.1-.663-.18-.819a2 2 0 0 0-.874-.874c-.156-.08-.38-.145-.819-.18C17.639 7 17.057 7 16.2 7h-2.81c-.145 0-.255 0-.364-.006a4 4 0 0 1-2.454-1.016 7 7 0 0 1-.262-.254l-.017-.017a6 6 0 0 0-.2-.196">
                          </path>
                        </svg></div><span className="text-sm">New project</span>
                      </button></span></ul>
                    </aside>
                  </div>
                  <div className="flex flex-col gap-2 text-token-text-primary text-sm false mt-5 pb-2">
                    <div>
                      <div className="relative mt-5 first:mt-0 last:mb-5">
                        <div className="sticky bg-token-sidebar-surface-primary top-0 z-20"><span
                          className="flex h-9 items-center">
                          <h3
                            className="px-2 text-xs font-semibold text-ellipsis overflow-hidden break-all pt-3 pb-2 text-token-text-primary">
                            Today</h3>
                        </span></div>
                        <ol>
                          <li className="relative" data-testid="history-item-0">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/67631c87-0740-8009-97a6-60a41e2f7160">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Criteria I Chart Design">Criteria I Chart Design</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-0-options" type="button" id="radix-:r2i:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-1">
                            <div draggable="false"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/g/g-HMNcP6w7d-data-analyst/c/67856ee2-a8c8-8009-883a-1831c92e3956">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Tech Interview Prep Guide">Tech Interview Prep Guide</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-1-options" type="button" id="radix-:r2k:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-2">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/67852ad9-4574-8009-953b-f7d53775ab8a">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Resume Review and Feedback">Resume Review and Feedback</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-2-options" type="button" id="radix-:r2m:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-3">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/6785e6e7-612c-8009-bf37-f6d9bd798aac">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Replicating Engel &amp; Völkers Model">Replicating Engel &amp; Völkers Model
                                </div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-3-options" type="button" id="radix-:r2o:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>
                      <div className="relative mt-5 first:mt-0 last:mb-5">
                        <div className="sticky bg-token-sidebar-surface-primary top-0 z-20"><span
                          className="flex h-9 items-center">
                          <h3
                            className="px-2 text-xs font-semibold text-ellipsis overflow-hidden break-all pt-3 pb-2 text-token-text-primary">
                            Yesterday</h3>
                        </span></div>
                        <ol>
                          <li className="relative" data-testid="history-item-0">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/67854729-42a0-8009-b2a0-faad47541c19">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Tech Interview Preparation Help">Tech Interview Preparation Help</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-0-options" type="button" id="radix-:r2q:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-1">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/67856a64-2d28-8009-a8d9-df4acd4f1ac3">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Project Scope Clarification">Project Scope Clarification</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-1-options" type="button" id="radix-:r2s:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-2">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/6785303c-d8b8-8009-94b0-2938b7ffe4ec">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Bridebook Job Prep">Bridebook Job Prep</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-2-options" type="button" id="radix-:r2u:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-3">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/67852dd2-322c-8009-8506-f5afe49826a9">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Allow users without login">Allow users without login</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-3-options" type="button" id="radix-:r30:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-4">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/67852353-1490-8009-a403-cbeae522ba3f">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Secure Multi-User ChatGPT Access">Secure Multi-User ChatGPT Access</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-4-options" type="button" id="radix-:r32:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-5">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/6785156b-d8f4-8009-a8a2-19102dbc1166">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Why Join Eight Sleep">Why Join Eight Sleep</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-5-options" type="button" id="radix-:r34:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-6">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/67851445-aa28-8009-b902-80420877475c">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Meroxa Job Application Statement">Meroxa Job Application Statement</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-6-options" type="button" id="radix-:r36:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-7">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/67851331-538c-8009-90fb-daf876f38fce">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Pomelo Care Engineering Role">Pomelo Care Engineering Role</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-7-options" type="button" id="radix-:r38:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-8">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/67850a3b-2fd0-8009-b1ae-a67f76a440ed">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="CELED Backend Interview Prep">CELED Backend Interview Prep</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-8-options" type="button" id="radix-:r3a:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-9">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/67851018-3058-8009-ba0e-a5cc4e9c48cb">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="OpenSea Backend Engineer Role">OpenSea Backend Engineer Role</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-9-options" type="button" id="radix-:r3c:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-10">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/6784e06e-c11c-8009-bf72-c1143c07953a">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Call with Tocco CEO">Call with Tocco CEO</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-10-options" type="button" id="radix-:r3e:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-11">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/6784d57a-a510-8009-b1d4-69344561a008">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Senior JavaScript Engineer Role">Senior JavaScript Engineer Role</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-11-options" type="button" id="radix-:r3g:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-12">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/6784abfe-8ad4-8009-96f5-5b4964340e1e">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Total Students Calculation">Total Students Calculation</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-12-options" type="button" id="radix-:r3i:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-13">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/6784b622-1d58-8009-aff6-9d346dd4b40f">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Senior Backend Engineer Profile">Senior Backend Engineer Profile</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-13-options" type="button" id="radix-:r3k:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-14">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/6784b2fc-f9f8-8009-bf03-fc33cc550b56">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Concurrency Debugging Insights">Concurrency Debugging Insights</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-14-options" type="button" id="radix-:r3m:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-15">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/6784b19a-22f4-8009-afc3-b0f9392e76eb">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Sr Staff Backend Engineer">Sr Staff Backend Engineer</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-15-options" type="button" id="radix-:r3o:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-16">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/6784ae52-0784-8009-bdfb-ad9b9a7880a0">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Discord Senior Engineer Role">Discord Senior Engineer Role</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-16-options" type="button" id="radix-:r3q:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-17">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/6784ac40-0790-8009-b6f5-8e01d124d83b">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Backend Engineer Role Summary">Backend Engineer Role Summary</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-17-options" type="button" id="radix-:r3s:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-18">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/6784aa6c-f6fc-8009-8f94-3204f4ea82a3">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Backend Engineer Role Overview">Backend Engineer Role Overview</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-18-options" type="button" id="radix-:r3u:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-19">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/6784a4ec-0b8c-8009-bc2f-d7cace99e8d3">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Kalshi Backend Engineer Role">Kalshi Backend Engineer Role</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-19-options" type="button" id="radix-:r40:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-20">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/6784a1b5-4ea8-8009-b705-34c60aafa80c">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Dagger Senior Engineer Application">Dagger Senior Engineer Application</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-20-options" type="button" id="radix-:r42:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-21">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/6784503d-1e14-8009-967b-b1842c2171e6">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Mobile Browser Extensions">Mobile Browser Extensions</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-21-options" type="button" id="radix-:r44:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>
                      <div className="relative mt-5 first:mt-0 last:mb-5">
                        <div className="sticky bg-token-sidebar-surface-primary top-0 z-20"><span
                          className="flex h-9 items-center">
                          <h3
                            className="px-2 text-xs font-semibold text-ellipsis overflow-hidden break-all pt-3 pb-2 text-token-text-primary">
                            Previous 7 Days</h3>
                        </span></div>
                        <ol>
                          <li className="relative" data-testid="history-item-0">
                            <div draggable="true"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/c/6781d847-e56c-8009-9090-d70e506b3ad4">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Candy Store Pairing Solution">Candy Store Pairing Solution</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-0-options" type="button" id="radix-:r46:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                          <li className="relative" data-testid="history-item-1">
                            <div draggable="false"
                              className="no-draggable group rounded-lg active:opacity-90 bg-[var(--item-background-color)] h-9 text-sm relative">
                              <a className="flex items-center gap-2 p-2" data-discover="true"
                                href="/g/g-HMNcP6w7d-data-analyst/c/6781d548-2c18-8009-a2ed-8053fb001f08">
                                <div className="relative grow overflow-hidden whitespace-nowrap" dir="auto"
                                  title="Node.js OpenSSL Error Fix">Node.js OpenSSL Error Fix</div>
                              </a>
                              <div
                                className="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 hidden can-hover:group-hover:flex">
                                <span className="" data-state="closed"><button
                                  className="flex items-center justify-center text-token-text-secondary transition hover:text-token-text-primary radix-state-open:text-token-text-secondary"
                                  data-testid="history-item-1-options" type="button" id="radix-:r48:"
                                  aria-haspopup="menu" aria-expanded="false" data-state="closed"><svg width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md">
                                    <path fill-rule="evenodd" clipRule="evenodd"
                                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                                      fill="currentColor"></path>
                                  </svg></button></span>
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col py-2 empty:hidden dark:border-white/20"><a
                className="group flex gap-2 p-2.5 text-sm cursor-pointer focus:ring-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group items-center hover:bg-token-sidebar-surface-secondary screen-arch:px-2 screen-arch:py-1.5 screen-arch:min-h-[47px] rounded-lg m-0 px-2"><span
                  className="flex w-full flex-row flex-wrap-reverse justify-between">
                  <div className="flex items-center gap-2"><span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-token-border-light"><svg
                      width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                      className="icon-sm">
                      <path fill-rule="evenodd" clipRule="evenodd"
                        d="M12.5001 3.44338C12.1907 3.26474 11.8095 3.26474 11.5001 3.44338L4.83984 7.28868C4.53044 7.46731 4.33984 7.79744 4.33984 8.1547V15.8453C4.33984 16.2026 4.53044 16.5327 4.83984 16.7113L11.5001 20.5566C11.8095 20.7353 12.1907 20.7353 12.5001 20.5566L19.1604 16.7113C19.4698 16.5327 19.6604 16.2026 19.6604 15.8453V8.1547C19.6604 7.79744 19.4698 7.46731 19.1604 7.28868L12.5001 3.44338ZM10.5001 1.71133C11.4283 1.17543 12.5719 1.17543 13.5001 1.71133L20.1604 5.55663C21.0886 6.09252 21.6604 7.0829 21.6604 8.1547V15.8453C21.6604 16.9171 21.0886 17.9075 20.1604 18.4434L13.5001 22.2887C12.5719 22.8246 11.4283 22.8246 10.5001 22.2887L3.83984 18.4434C2.91164 17.9075 2.33984 16.9171 2.33984 15.8453V8.1547C2.33984 7.0829 2.91164 6.09252 3.83984 5.55663L10.5001 1.71133Z"
                        fill="currentColor"></path>
                      <path
                        d="M9.44133 11.4454L9.92944 9.98105C10.0321 9.67299 10.4679 9.67299 10.5706 9.98105L11.0587 11.4454C11.2941 12.1517 11.8483 12.7059 12.5546 12.9413L14.019 13.4294C14.327 13.5321 14.327 13.9679 14.019 14.0706L12.5546 14.5587C11.8483 14.7941 11.2941 15.3483 11.0587 16.0546L10.5706 17.519C10.4679 17.827 10.0321 17.827 9.92944 17.519L9.44133 16.0546C9.2059 15.3483 8.65167 14.7941 7.94537 14.5587L6.48105 14.0706C6.17298 13.9679 6.17298 13.5321 6.48105 13.4294L7.94537 12.9413C8.65167 12.7059 9.2059 12.1517 9.44133 11.4454Z"
                        fill="currentColor"></path>
                      <path
                        d="M14.4946 8.05961L14.7996 7.14441C14.8638 6.95187 15.1362 6.95187 15.2004 7.14441L15.5054 8.05961C15.6526 8.50104 15.999 8.84744 16.4404 8.99458L17.3556 9.29965C17.5481 9.36383 17.5481 9.63617 17.3556 9.70035L16.4404 10.0054C15.999 10.1526 15.6526 10.499 15.5054 10.9404L15.2004 11.8556C15.1362 12.0481 14.8638 12.0481 14.7996 11.8556L14.4946 10.9404C14.3474 10.499 14.001 10.1526 13.5596 10.0054L12.6444 9.70035C12.4519 9.63617 12.4519 9.36383 12.6444 9.29965L13.5596 8.99458C14.001 8.84744 14.3474 8.50104 14.4946 8.05961Z"
                        fill="currentColor"></path>
                    </svg></span>
                    <div className="flex flex-col"><span>View plans</span><span
                      className="line-clamp-1 text-xs text-token-text-tertiary">Unlimited access, team features, and
                      more</span></div>
                  </div>
                </span></a>
                <div className="flex w-full items-center md:hidden">
                  <div className="max-w-[100%] grow">
                    <div className="group relative" data-headlessui-state=""><button
                      className="flex w-full max-w-[100%] items-center gap-2 rounded-lg text-sm group-ui-open:bg-token-sidebar-surface-secondary p-2 hover:bg-token-sidebar-surface-secondary"
                      data-testid="accounts-profile-button" id="headlessui-menu-button-:rg:" type="button"
                      aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">
                      <div className="flex-shrink-0" style={{ "viewTransitionName": "var(--vt-profile-avatar-sidebar)" }}>
                        <div className="flex items-center justify-center overflow-hidden rounded-full">
                          <div className="relative flex"><img alt="User" width="32" height="32" className="rounded-sm"
                            referrerPolicy="no-referrer"
                            src="https://s.gravatar.com/avatar/4a520f9847d41ae10e1325ce2a7a0da7?s=480&amp;r=pg&amp;d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fam.png" />
                          </div>
                        </div>
                      </div>
                      <div className="relative -top-px grow -space-y-px truncate text-start text-token-text-primary">
                        <div dir="auto">Amaz Idea</div>
                      </div>
                    </button></div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar;
