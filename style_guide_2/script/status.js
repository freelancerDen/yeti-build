
// const options = {
//   success: {
//     container: "conection-block-wrap_green",
//     svg: "success-color",
//     text: "text__color_light-green",
//   },
//   warning: {
//     container: "conection-block-wrap_yellow",
//     svg: "warning-color",
//     text: "text__color_yellow"
//   },
//   error: {
//     container: "conection-block-wrap_red",
//     svg: "error-color",
//     text: "text__color_dark_brown"
//   },
//   disabled: {
//     container: "conection-block-wrap_grey",
//     svg: "disabled-color",
//     text: "text__color_dark-grey"
//   }
// };

// //init variables
// let Success = options.success;
// let Warning = options.warning;
// let Error = options.error;
// let Disabled = options.disabled;
// let Message = 'success message';
// const changeStatus = (...data) => {
//     const [container, svg, textColor, text] = data;
    
//     return `
//     <div
//     class="conection-block-wrap ${container}"
//     >
//         <div class="conection-image-wrap">
//             <svg 
//                 xmlns="http://www.w3.org/2000/svg"
//                 class="${svg}"
//                 width="100%"
//                 height="100%"
//                 viewBox="0 0 16 16"
//             >
//                 <path
//                 d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm0-2A6 6 0 1 1 8 2a6 6 0 0 1 0 12zM7 9h2V4H7v5zm0 3h2v-2H7v2z"
//                 fill-rule="evenodd"
//                 />
//             </svg>
//         </div>
//         <div class="conection-text-wrap">
//             <p class="text_small-2 ${textColor}">${text}</p>
//         </div>
//     </div>
//     `
// }


// const initState = (status, message ) => {
  
//   const statusContainers = document.querySelectorAll('.status_wrapper');
//   statusContainers.forEach(container => {
//     container.innerHTML = changeStatus(status.container, status.svg, status.text, message);
//   });
// }

// // initState(Success, Message);
// window.addEventListener('load', initState(Warning, Message));
// // initState(Error, Message);
// // initState(Disabled, Message);



// statusDisplay.js
export const displayStatus = (panel, status = Error, message = 'Error') => {
  const statusContainers = panel.querySelectorAll('.status_wrapper');
  if (!statusContainers.length) {
    throw new Error("No status wrappers found in the document.");
  }
  statusContainers.forEach(container => {
    container.innerHTML = `
      <div class="conection-block-wrap ${status.container}">
        <div class="conection-image-wrap">
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            class="${status.svg}"
            width="100%"
            height="100%"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm0-2A6 6 0 1 1 8 2a6 6 0 0 1 0 12zM7 9h2V4H7v5zm0 3h2v-2H7v2z"
              fill-rule="evenodd"
            />
          </svg>
        </div>
        <div class="conection-text-wrap">
          <p class="text_small-2 ${status.text}">${message}</p>
        </div>
      </div>
    `;
  });
};

export const Success = {
  container: "conection-block-wrap_green",
  svg: "success-color",
  text: "text__color_light-green"
};

export const Warning = {
  container: "conection-block-wrap_yellow",
  svg: "warning-color",
  text: "text__color_yellow"
};

export const Error = {
  container: "conection-block-wrap_red",
  svg: "error-color",
  text: "text__color_dark_brown"
};

export const Disabled = {
  container: "conection-block-wrap_grey",
  svg: "disabled-color",
  text: "text__color_dark-grey"
};

