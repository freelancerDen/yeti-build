// Функция для получения данных из JSON-файла
const fetchData = async () => {
  try {
    const response = await fetch('./style_guide_2/script/profitRange.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Функция для обновления HTML с использованием данных из JSON
const updateHTML = async (element) => {
  const data = await fetchData();

  // Check if data exists and is valid
  if (!data || typeof data !== 'object') {
    console.error('Invalid or missing data');
    return;
  }

  // Ensure required properties exist
  const requiredProperties = [
    'position',
    'step',
    'leverage',
    'cryptocurrency',
    'pnl_percentage',
    'total_profit',
    'account',
    'runner',
    'status',
    'strategy',
    'price',
    'pnl',
    'balance_pnl',
    'rr',
    'trailing',
    'sl',
    'breakeven',
    'tag',
    'fee',
    'margin',
    'fr',
    'create_duration',
    'start_duration',
    'create_time',
    'start_time',
    'end_time',
    'slogan',
  ];
  const missingProperties = requiredProperties.filter(
    (prop) => !data.hasOwnProperty(prop),
  );
  if (missingProperties.length > 0) {
    console.error('Missing required properties:', missingProperties);
    return;
  }

  // Determine position text and class based on position value
  const positionText = data.position ? 'Long' : 'Short';
  const positionClass = data.position ? 'text__color_green' : 'text__color_red';

  // Generate HTML for steps and circle
  const stepsHTML = Array.from({ length: 4 }, (_, i) => {
    const stepClass = `step-${i + 1}`;
    return `<div class="info-profit-range__line-step ${stepClass}"></div>`;
  }).join('');

  const circleStepClass = `step-${data.step}`;
  const circleHTML = `<div class="info-profit-range__line-circle ${circleStepClass}"></div>`;

  const profitRangeHTML = `
    <div class="profit-range-wrap">
      <div class="profit-range-row profit-range-header">
        <div class="logo flex-container_vertical">
          <div class="logo-svg">
          <svg xmlns="http://www.w3.org/2000/svg" width="63" height="58" viewBox="0 0 63 58" fill="none">
          <path d="M13.7812 9L16.3125 8L17.4375 9.14286L18.2812 9.85714L18.8438 9C18.4688 7.71429 17.2969 5.08571 17.2969 4.85714C17.2969 4.57143 17.2969 4.28571 17.4375 4C17.5781 3.71429 17.7188 3.57143 18 3.57143C18.2812 3.57143 18.4219 3.28571 18.7031 3.28571C18.9844 3.28571 19.5469 3.57143 19.6875 3.71429L20.3906 4.42857C20.5312 4.57143 20.9531 4.71429 21.0938 4.71429C21.2344 4.71429 21.6562 4.42857 21.7969 4.14286C21.9375 3.85714 23.0625 3 23.2031 2.71429C23.3438 2.42857 24.75 1.14286 24.8906 1.14286C25.0031 1.14286 26.25 0.380952 26.8594 0H35.0156L37.125 0.428571L39.2344 1.57143L42.0469 4.28571L42.6094 4.42857C42.7969 4.33333 43.2281 4.08571 43.4531 3.85714C43.7344 3.57143 43.875 3.57143 44.2969 3.42857C44.7188 3.28571 44.7188 3.28571 44.8594 3.28571C44.9719 3.28571 45.5625 3.7619 45.8438 4L45.5625 5.42857L44.8594 9.85714C45.1875 9.47619 45.8719 8.68571 45.9844 8.57143C46.0969 8.45714 46.5 7.95238 46.6875 7.71429L47.1094 7.57143L52.3125 11L56.5312 15.4286H54.7031L56.6719 17.1429L59.7656 21.1429L62.4375 25.5714L63 29L60.4688 27.7143L62.1562 33.7143L62.5781 38.7143C61.8398 38.0111 60.3747 36.5881 60.3292 36.4349C60.3483 36.6541 60.6145 41.1339 60.75 43.4286L60.4688 46.1429L59.7656 48.2857L57.7969 50.5714L55.2656 51.7143H52.3125C51.6562 51.2381 50.3438 50.2571 50.3438 50.1429C50.3438 50.0286 49.5938 49.1429 49.2188 48.7143L48.9375 46.5714L48.7969 45.2857L49.2188 45.1429L50.4844 46.1429H51.4688C51.5156 45.9524 51.6094 45.5429 51.6094 45.4286V43.2857L50.0625 40.4286L49.2188 42.1429L48.9375 41.4286L48.2344 37.8571V31.2857C48.2812 29.7143 48.375 26.5429 48.375 26.4286C48.375 26.2857 47.1094 28.8571 46.9688 28.8571C46.8563 28.8571 46.3594 31.0476 46.125 32.1429L45.8438 35.8571V53.5714L45.1406 55.2857L43.0312 57.1429L40.5 58H36.5625L35.0156 56.8571L34.1719 54.7143V51L33.0469 50H29.9531L28.9688 51.1429L29.1094 54.5714L28.125 56.7143L26.2969 58H24.1875L22.0781 57.7143L19.5469 56.4286C19.0312 55.9048 18 54.8286 18 54.7143C18 54.6 17.625 53.7143 17.4375 53.2857L17.7188 41.7143V34.8571L16.3125 28.4286L14.625 26.1429L15.1875 29.2857L15.0469 37.2857L14.0625 42.2857L13.6406 40.5714L13.2188 40.4286L12.0938 42.7143L11.6719 44.7143L11.8125 46L12.375 46.4286C12.6562 46.2381 13.2469 45.8286 13.3594 45.7143C13.4719 45.6 13.7812 45.1905 13.9219 45L14.3438 45.2857C14.3906 45.7143 14.4844 46.6 14.4844 46.7143C14.4844 46.8571 14.2031 48.4286 14.2031 48.5714C14.2031 48.6857 13.4531 49.8571 13.0781 50.4286L10.9688 51.5714L8.01562 51.7143L5.34375 50.4286L3.09375 47.5714L2.67188 44L2.95312 36.1429L0.5625 38.4286L1.54688 32.5714L2.8125 27.4286L0 28.8571L0.140625 27.4286L2.53125 22.4286L5.90625 18.1429L8.71875 15.1429L7.03125 15.2857C7.35938 14.8095 8.07187 13.8286 8.29688 13.7143C8.52188 13.6 12.0469 10.5238 13.7812 9Z" fill="white"/>
          </svg>
          </div>
          <div class="flex-container flex-container_horizontal">
            <div class="logo__font_carter-one-regular logo__font_size-big text__color_white">yeti</div>
            <div class="logo__font_blinker-regular logo__font_size-small text__color_white">trading platform</div>
          </div>
        </div>
        <button type="button" class="profit-range-header__close closeModalTrigger">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 1L11 10.6645" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M1 11L11 1.3355" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
        <div class="profit-range-header__content">
          <div class="line text_regular text__color_white text__weight_bold d-flex gap-3 justify-content-center">
            <div class="line-position ${positionClass}">
              <span>${positionText}</span>
            </div>
            <div class="line-leverage">
              <span>${data.leverage}</span>
            </div>
            <div class="line-cryptocurrency">
              <span>${data.cryptocurrency}</span>
              perp
            </div>
          </div>
          <div class="line text_regular text__color_white mb-2 text__weight_bold text__family_inconsolata">
            <div class="line-pnl">
              <span>${data.pnl_percentage}</span>
            </div>
            <div class="line-total-profit">
              <span>${data.total_profit}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="profit-range-row profit-range-content">
      <div class="profit-range-content__content">
        <div class="d-flex justify-content-between gap-2 mb-4">
          <div class="column">
            <div class="line text_small-2 text__color_white">
              <p>
                Account: 
              </p>
              <span>
                ${data.account}
              </span>
            </div>
            <div class="line text_small-2 text__color_white">
              
              <span>
                ${data.runner}
              </span>
            </div>
            <div class="line text_small-2 text__color_white">
              
              <span>
                ${data.cryptocurrency} -> ${positionText}
              </span>
            </div>
            <div class="line text_small-2 text__color_white">
              <p>Status: </p>
              <span>
                ${data.status}
              </span>
            </div>
            <div class="line text_small-2 text__color_white">
              <p>Strategy: </p>
              <span>
                ${data.strategy}
              </span>
            </div>
            <div class="line text_small-2 text__color_white">
              <p>Price: </p>
              <span>
                ${data.price}
              </span>
            </div>
            <div class="line text_small-2 text__color_white">
              <p>PnL:  </p>
              <span>
                ${data.pnl}
              </span>
            </div>
            <div class="line text_small-2 text__color_white">
              <p>Balance PnL:</p>
              <span>
                ${data.balance_pnl}
              </span>
            </div>
          </div>
          <div class="column">
            <div class="line text_small-2 text__color_white">
              <p>
                R/R: 
              </p>
              <span>
                ${data.rr}
              </span>
            </div>
            <div class="line text_small-2 text__color_white">
              <p>
                Trailing: 
              </p>
              <span>
                ${data.trailing}
              </span>
            </div>
            <div class="line text_small-2 text__color_white">
              <p>
                SL: 
              </p>
              <span>
                ${data.sl}
              </span>
            </div>
            <div class="line text_small-2 text__color_white">
              <p>Breakeven:  </p>
              <span>
                ${data.breakeven}
              </span>
            </div>
            <div class="line text_small-2 text__color_white">
              <p>Tag:  </p>
              <span>
                ${data.tag}
              </span>
            </div>
            
            <div class="line text_small-2 text__color_white d-flex align-content-center gap-1 flex-wrap">
              <div class="line mb-0">
                <p>Fee:</p>
                <span>
                  ${data.fee}
                </span>
              </div>
              <div class="line mb-0">
                <p>Margin:  </p>
                <span>
                  ${data.margin}
                </span>
              </div>
              <div class="line mb-0">
                <p>FR:</p>
                <span>
                  ${data.fr}
                </span>
              </div>
            </div>
            
          </div>
        </div>
        <div class="profit-range-content__info info-profit-range">
          <div class="info-profit-range__header">
            <div class="d-flex gap-2 justify-content-between mb-2">
              <div class="position-relative flex-grow-1">
                <p class="text_small-2 text__color_white">
                  Create
                </p>
                <i class="date-from-create-to-start position-absolute text_small-2 text__color_white ">
                  ${data.create_duration}
                </i>
              </div>
              <div class="position-relative flex-grow-1 text-center">
                <p class="text_small-2 text__color_white">
                  Start
                </p>
                <i class="date-form-start-to-end position-absolute text_small-2 text__color_white ">
                ${data.start_duration}
                </i>
              </div>
              <div class="position-relative flex-grow-1 text-end">
                <p class="text_small-2 text__color_white">
                  ${data.status}
                </p>
              </div>
            </div>
            <div class="info-profit-range__line mb-2">
              <div class="line-dashed">
                
              </div>
              <div class="info-profit-range__line-steps">
                ${stepsHTML}
                ${circleHTML}
              </div>
            </div>
            <div class="info-profit-range__times d-flex justify-content-between gap-2">
              <div class="info-profit-range__times__column text_small-2 text__color_white">
                <span>${data.create_time.date}</span>
                <span>${data.create_time.time}</span>
              </div>
              <div class="info-profit-range__times__column text_small-2 text__color_white">
              <span>${data.start_time.date}</span>
              <span>${data.start_time.time}</span>
              </div>
              <div class="info-profit-range__times__column text_small-2 text__color_white">
              <span>${data.end_time.date}</span>
              <span>${data.end_time.time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div class="profit-range-row profit-range-slogan text-center py-1">
        <p class="text_large text__color_white text__family_inconsolata">
          "${data.slogan}"
        </p>
      </div>
    </div>
  `;
  if (element) {
    element.innerHTML = profitRangeHTML;
  }
};

const modalContainer = document.querySelector('.profit-range');
// Вызов функции для обновления HTML
updateHTML(modalContainer);

export default { updateHTML };
