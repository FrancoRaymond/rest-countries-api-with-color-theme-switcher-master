const countryCard = document.querySelectorAll('.countryCard')
const backBtn = document.querySelector('.backBtn')
const countryInfo = document.querySelector('.moreCountryInfo')
const form = document.querySelector('form')
const section = document.querySelector('section')
const regionSelector = document.querySelector('.regionSelector')
const searchInput = document.getElementById('searchText')
const modeEmoji = document.querySelector('.modeEmoji')
const body = document.body
const colorModeText = document.querySelector('.colorMode p')
const searchIcon = document.querySelector('.searchIcon')
const backArrow = document.querySelector('.backArrow')

modeEmoji.addEventListener('click', toggleColorMode)

function toggleColorMode(){
    if(body.classList.contains('lightMode')){
        body.classList.remove('lightMode')
        body.classList.add('darkMode')
        colorModeText.innerText = 'Light Mode'
        modeEmoji.src = "Images/light moon.png"
        searchIcon.src='Images/icons-search-light.svg'
        backArrow.src = 'Images/icons8-back-30.png'
    }else{
        body.classList.remove('darkMode')
        body.classList.add('lightMode')
        colorModeText.innerText = 'Dark Mode'
        modeEmoji.src = "Images/black moon.png"
        searchIcon.src='Images/search.png'
        backArrow.src = 'Images/arrow-back-black.svg'
    }
}

backBtn.addEventListener('click', () =>{
    countryInfo.classList.toggle('active')
    document.body.style.overflow = 'auto'
    const bc = document.querySelectorAll('.borderCountries')
    bc.forEach(c =>{
      c.innerText = ''
    })
})

form.addEventListener('submit', function(e){
    e.preventDefault()
    section.innerHTML = ''
    fetchCountries()
});

searchInput.addEventListener('input', function(){
  section.innerHTML = ''
  fetchCountries()
})

regionSelector.addEventListener('change', function(){
    section.innerHTML = ''
    fetchCountries()
})


const countriesURL = "https://restcountries.com/v3.1";

async function fetchCountries() {
  const regionValue = regionSelector.value.toLowerCase();
  const searchValue = searchInput.value.toLowerCase();
  let url;

  if (searchValue && regionValue) {

    url = `${countriesURL}/name/${searchValue}?region=${regionValue}`;

  } else if (searchValue) {

    url = `${countriesURL}/name/${searchValue}`;

  } else if (regionValue) {

    url = `${countriesURL}/region/${regionValue}`;

  } else {

    url = `${countriesURL}/all`;

  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    data.forEach(createCountryCard);
    document.querySelectorAll('.countryCard').forEach(countryCard =>
      countryCard.addEventListener('click', clickedCard)
    );
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
}

function createCountryCard(item) {
  const outerDiv = document.createElement('div');
  outerDiv.classList.add('countryCard');

  const image = document.createElement('img');
  image.src = item.flags.png;

  const innerDiv = document.createElement('div');
  innerDiv.classList.add('countryInfo');

  const h3 = document.createElement('h3');
  h3.classList.add('countryName');
  h3.innerText = item.name.common;

  const p1 = createParagraph('Population', item.population.toLocaleString(), 'cardPopulation');
  const p2 = createParagraph('Region', item.region, 'region');
  const p3 = createParagraph('Capital', item.capital || 'N/A', 'capital');

  const otherValues = document.createElement('div');
  otherValues.classList.add('otherValues');

  const p4 = createParagraph('Sub-region', item.subregion || 'N/A', 'CardSubregion');
  const p5 = createParagraph('Currencies', Object.values(item.currencies || {}).map(c => c.name).join(', ') || 'N/A', 'cardCurrencies');
  const p6 = createParagraph('Languages', Object.values(item.languages || {}).slice(0, 3).join(', ') || 'N/A', 'cardLanguages');
  const p7 = createParagraph('Borders', (item.borders || []).slice(0, 3).join(', ') || 'N/A', 'cardBorders');
  const p8 = createParagraph('Top-Level Domain', item.tld?.[0] ?? 'N/A', 'cardDomain');
  const p9 = createParagraph('Native Name', item.translations?.nld?.common || 'N/A', 'cardNativeName');
  const p10 = createParagraph('Short Name', item.fifa || 'N/A', 'shortName');

  innerDiv.append(h3, p1, p2, p3);
  otherValues.append(p4, p5, p6, p7, p8, p9, p10);
  outerDiv.append(image, innerDiv, otherValues);

  section.append(outerDiv);
}

function createParagraph(label, value, valueClass) {
  const p = document.createElement('p');
  const labelSpan = document.createElement('span');
  labelSpan.innerText = `${label}: `;
  const valueSpan = document.createElement('span');
  valueSpan.classList.add(valueClass);
  valueSpan.innerText = value;
  p.append(labelSpan, valueSpan);
  return p;
}
fetchCountries();

function clickedCard() {

  countryInfo.classList.toggle('active');
  body.style.overflow = 'hidden';

  const imgSrc = this.querySelector('img').src;
  const countryName = this.querySelector('.countryName').innerText;
  const nativeName = this.querySelector('.cardNativeName').innerText;
  const population = this.querySelector('.cardPopulation').innerText;
  const region = this.querySelector('.region').innerText;
  const subregion = this.querySelector('.CardSubregion').innerText;
  const capital = this.querySelector('.capital').innerText;
  const topLevelDomain = this.querySelector('.cardDomain').innerText;
  const languages = this.querySelector('.cardLanguages').innerText;
  const currencies = this.querySelector('.cardCurrencies').innerText;
  const borders = this.querySelector('.cardBorders').innerText.split(',').map(border => border.trim());

  document.querySelector('.countryFlag').src = imgSrc;
  document.querySelector('.infoDiv h3').innerText = countryName;
  document.querySelector('.information1 .nativeName').innerText = nativeName;
  document.querySelector('.information1 .population').innerText = population;
  document.querySelector('.infoDiv .region').innerText = region;
  document.querySelector('.infoDiv .subRegion').innerText = subregion;
  document.querySelector('.infoDiv .capital').innerText = capital;
  document.querySelector('.infoDiv .topLevelDomain').innerText = topLevelDomain;
  document.querySelector('.infoDiv .languages').innerText = languages;
  document.querySelector('.infoDiv .currencies').innerText = currencies;

  const infoBorders = document.querySelectorAll('.infoDiv .borderCountries');
  infoBorders.forEach((border, index) => {
    border.innerText = borders[index] || 'N/A';
  });
}
