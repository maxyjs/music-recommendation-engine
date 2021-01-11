const puppeteer = require('puppeteer')
const cookies = require('./settings/cookies')

const defaultLogger = () => {  }

async function addTracksToYandexMusic(tracks, logger = defaultLogger) {

  const resultsAdded = []

  for (const track of tracks) {
    try {
      const resultAdded = await addTrackToYandexMusic(track, logger)
      logger("result added: ", resultAdded)

      resultsAdded.push(resultAdded)
    } catch (err) {
      console.error("[ERROR addTracksToYandexMusic] \n ", err)
    }

  }

  return resultsAdded
}

async function addTrackToYandexMusic(track, logger) {

  const browser = await puppeteer.launch({
    headless: true,
    devtools: false
  })

  const page = await browser.newPage()

  await page.setViewport({
    width: 1920,
    height: 1080
  })

  await page.setCookie(...cookies)
  await page.goto(`https://music.yandex.ru/album/${track.albumId}/track/${track.id}`)
  await page.goto(`https://music.yandex.ru/album/${track.albumId}/track/${track.id}`) // Not delete line!

  try {
    const clickOptions = {
      delay: 100
    }

    const selectorMenu = '.sidebar__controls .d-button.deco-button.deco-button-transparent.d-button_rounded.d-button_size_L.d-button_w-icon.d-button_w-icon-centered.d-context-menu__opener'

    await sleep(3000)
    await page.click(selectorMenu, clickOptions)

    const addSelector = 'body > div.d-context-menu__popup.deco-popup-menu.popup.deco-pane-popup > div > div.d-context-menu__tab.d-context-menu__tab_main > ul > li.d-context-menu__item.deco-popup-menu__item.d-context-menu__item_add'

    await sleep(3000)
    await page.click(addSelector, clickOptions)

    //const addTrackToPlaylistSelector = '.d-addition__content .d-addition__item-text.deco-popup-menu__item-text.typo-track'

    await sleep(4000)
  } catch (error) {
    console.error("[ERROR: addTracksToYandexMusic]\n", error)
  }

  const result = await page.evaluate(() => {

    try {
      var allMenuItems = [...document.querySelectorAll('.d-addition__content .d-addition__item-text.deco-popup-menu__item-text.typo-track')]

      var targetItem = allMenuItems.find(item => {

        return item.outerText.includes('auto')
      })
      if (!targetItem) {
        return 'Not found playlist for add track'
      }

      const parent = targetItem.parentNode
      const targetIcon = parent.children[1]
      const isTrackAlreadyAdded = targetIcon.classList.contains('deco-popup-menu__item-icon_inactive')

      if (isTrackAlreadyAdded) {
        return "Track already added to playlist " + targetItem.innerText
      }

      targetItem.click()

    } catch (err) {
      return ("[ FAILED EVALUATE ] " + (err.message || ''))
    }

    return "successfully added to playlist " + targetItem.innerText

  })

  await browser.close()

  return result

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = addTracksToYandexMusic;