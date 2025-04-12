document.addEventListener("DOMContentLoaded", () => {
  // TABS
  let tabButtons = document.querySelectorAll("#locationTabs button")
  let tabContents = document.querySelectorAll("#tabContainer > div")

  let hideTabContent = () => {
    tabContents.forEach((qiymat) => {
      qiymat.classList.add("hidden")
      qiymat.classList.add("opacity-0")
      qiymat.classList.add("translate-y-4")
    })

    tabButtons.forEach((qiymat) => {
      qiymat.classList.remove("bg-yellow-500", "text-white")
      qiymat.classList.add("text-yellow-500")
    })
  }

  let showTabContent = (index) => {
    tabContents[index].classList.remove("hidden")
    setTimeout(() => {
      tabContents[index].classList.remove("opacity-0")
      tabContents[index].classList.remove("translate-y-4")
    }, 100)
    tabButtons[index].classList.add("bg-yellow-500", "text-white")
    tabButtons[index].classList.remove("text-yellow-500")
  }

  hideTabContent()
  showTabContent(0)

  tabButtons.forEach((qiymat, index) => {
    qiymat.addEventListener("click", () => {
      hideTabContent()
      showTabContent(index)
    })
  })

  // LOADER
  let loaderWrapper = document.querySelector("#loader-wrapper")

  setTimeout(() => {
    loaderWrapper.classList.add("hidden")
  }, 1500)

  // Timer
  let deadline = "2025-04-30"

  let getTimeRemaining = (endtime) => {
    let time = Date.parse(endtime) - Date.parse(new Date())
    let days, hours, minutes, seconds

    if (time <= 0) {
      days = 0
      hours = 0
      minutes = 0
      seconds = 0
    } else {
      days = Math.floor(time / (1000 * 60 * 60 * 24))
      hours = Math.floor((time / (1000 * 60 * 60)) % 24)
      minutes = Math.floor((time / (1000 * 60)) % 60)
      seconds = Math.floor((time / 1000) % 60)
    }

    return {
      totalTime: time,
      days,
      hours,
      minutes,
      seconds,
    }
  }

  let formatNuber = (number) => {
    if (number >= 0 && number < 10) {
      return `0${number}`
    } else {
      return number
    }
  }

  let setClock = (selector, endtime) => {
    let timer = document.querySelector(selector)
    let days = timer.querySelector("#days")
    let hours = timer.querySelector("#hours")
    let minutes = timer.querySelector("#minutes")
    let seconds = timer.querySelector("#seconds")

    let updateClock = () => {
      let time = getTimeRemaining(endtime)

      days.textContent = formatNuber(time.days)
      hours.textContent = formatNuber(time.hours)
      minutes.textContent = formatNuber(time.minutes)
      seconds.textContent = formatNuber(time.seconds)

      if (time.totalTime <= 0) {
        clearInterval(timeInterval)
      }
    }
    timeInterval = setInterval(updateClock, 1000)
    updateClock()
  }

  setClock("#timer", deadline)

  // Modal
  let modalOpenBtns = document.querySelectorAll("[data-modal]")
  let modalCloseBtn = document.querySelector("#modalClose")
  let modal = document.querySelector("#modal")

  let openModal = () => {
    modal.classList.remove("hidden")
    setTimeout(() => {
      modal.classList.remove("opacity-0")
    }, 10)
    document.body.classList.add("overflow-hidden")
    clearTimeout(modalTimerId)
  }

  modalOpenBtns.forEach((qiymat) => {
    qiymat.addEventListener("click", openModal)
  })

  let closeModal = () => {
    modal.classList.add("opacity-0")
    setTimeout(() => {
      modal.classList.add("hidden")
    }, 500)
    document.body.classList.remove("overflow-hidden")
  }

  modalCloseBtn.addEventListener("click", closeModal)

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal()
    }
  })

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal()
    }
  })

  let modalTimerId = setTimeout(openModal, 5000)

  // Class
  class OfferMenu {
    constructor({ src, alt, title, descr, discount, sale, parentSelector }) {
      this.src = src
      this.alt = alt
      this.title = title
      this.descr = descr
      this.discount = discount
      this.sale = sale
      this.parent = document.querySelector(parentSelector)
      this.formatToUSD()
    }

    formatToUSD() {
      this.discount = this.discount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })
      this.sale = this.sale.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })
    }

    render() {
      let element = document.createElement("div")
      element.innerHTML = `
        <div
          class="p-5 rounded-lg hover:scale-105 duration-300 hover:shadow-lg hover:shadow-yellow-500 shadow-md"
        >
          <img
            src="${this.src}"
            alt="${this.alt}"
            class="w-2/3 mx-auto object-contain rounded-lg mb-4"
          />
          <h3 class="text-lg font-bold mb-2 text-white">${this.title}</h3>
          <p class="text-white mb-4">${this.descr}</p>
          <div class="flex items-center justify-center gap-2">
            <span class="text-gray-400 line-through">${this.discount}</span>
            <span class="text-yellow-500 font-bold text-xl">${this.sale}</span>
          </div>
        </div>
      `

      this.parent.append(element)
    }
  }

  let offers = [
    {
      src: "images/offer1.png",
      alt: "Quattro Pasta",
      title: "Quattro Pasta",
      descr:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
      discount: 55,
      sale: 18,
      parentSelector: "#offer",
    },
    {
      src: "images/offer2.png",
      alt: "Vegertarian Pasta",
      title: "Vegertarian Pasta",
      descr:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
      discount: 65,
      sale: 25,
      parentSelector: "#offer",
    },
    {
      src: "images/offer3.png",
      alt: "Gluten-Free Pasta",
      title: "Gluten-Free Pasta",
      descr:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
      discount: 25,
      sale: 15,
      parentSelector: "#offer",
    },
  ]

  offers.forEach((qiymat) => new OfferMenu(qiymat).render())

  // Class meal
  class MealMenu {
    constructor({ src, alt, title, from, to, shadow, parentSelector }) {
      this.src = src
      this.alt = alt
      this.title = title
      this.from = from
      this.to = to
      this.shadow = shadow
      this.parent = document.querySelector(parentSelector)
    }

    render() {
      let element = document.createElement("div")
      element.className = `flex flex-col items-center gap-1 text-white shadow-lg hover:shadow-${this.shadow}-500 duration-300 p-5 rounded-lg`
      element.innerHTML = `
        <img class="h-16 md:h-20" src="${this.src}" alt="${this.alt}" />
        <h3 class="text-2xl md:text-3xl font-bold">${this.title}</h3>
        <p>${this.from}:00 am to ${this.to}:00 am</p>
      `
      this.parent.append(element)
    }
  }

  let meals = [
    {
      src: "images/breckfastIcon.png",
      alt: "Breakfast",
      title: "Breakfast",
      from: 7,
      to: 10,
      shadow: "red",
      parentSelector: "#meal",
    },
    {
      src: "images/lunchIcon.png",
      alt: "Lunch",
      title: "Lunch",
      from: 12,
      to: 15,
      shadow: "green",
      parentSelector: "#meal",
    },
    {
      src: "images/dinnerIcon.png",
      alt: "Dinner",
      title: "Dinner",
      from: 18,
      to: 21,
      shadow: "blue",
      parentSelector: "#meal",
    },
    {
      src: "images/dessertIcon.png",
      alt: "Snack",
      title: "Snack",
      from: 15,
      to: 17,
      shadow: "purple",
      parentSelector: "#meal",
    },
  ]

  meals.forEach((qiymat) => new MealMenu(qiymat).render())

  // Form
  let form = document.querySelector("form")
  let telegramTokenBot = "7458632254:AAHXhIYOt73QDlREX8GMUGjklVziuD_kZMw"
  let chatId = "5414733748"

  let message = {
    loading: "Loading...",
    success: "Thanks for contacting with us",
    failure: "Something went wrong",
  }

  form.addEventListener("submit", (evt) => {
    evt.preventDefault()

    let statusMessage = document.createElement("div")
    statusMessage.textContent = message.loading
    statusMessage.className =
      "mt-5 px-4 py-2 rounded-xl text-sm font-medium text-white bg-blue-500 animate-pulse"
    form.append(statusMessage)

    let formData = new FormData(form)
    let object = {}
    formData.forEach((value, key) => {
      object[key] = value
    })

    axios
      .post(`https://api.telegram.org/bot${telegramTokenBot}/sendMessage`, {
        chat_id: chatId,
        text: `Name: ${object.name}\nPhone: ${object.phone}`,
      })
      .then(() => {
        statusMessage.textContent = message.success
        statusMessage.className =
          "mt-5 px-4 py-2 rounded-xl text-sm font-medium text-white bg-green-500"
        form.reset()
      })
      .catch(() => {
        statusMessage.textContent = message.failure
        statusMessage.className =
          "mt-5 px-4 py-2 rounded-xl text-sm font-medium text-white bg-red-500"
      })
      .finally(() => {
        setTimeout(() => {
          statusMessage.remove()
        }, 2500)
      })
  })
})
