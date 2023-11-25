"use strict"

// Read-only Select Example

const createComboMenu = () => {
 let fruitNames = ['Apple', 'Banana', 'Blueberry', 'Boysenberry', 'Cherry', 'Durian', 'Eggplant', 'Fig', 'Grape', 'Guava', 'Huckleberry'];

    let comboMenu = document.querySelector(".combo-menu");

    for (let i = 0; i < fruitNames.length; i++) {
        let option = document.createElement('div');
        option.className = 'combo-option';
        option.setAttribute('role', 'option');
        option.id = 'combo1-' + i;
        option.setAttribute('aria-selected', 'false');
        option.textContent = fruitNames[i];

        comboMenu.appendChild(option);
    }
}
createComboMenu();

const setupComboMenu = () => {
    let comboInput = document.getElementById('combo1');
    let comboMenu = document.querySelector('.combo.js-select');

    let isOpen = false;

    const toggleComboMenu = () => {
        isOpen = !isOpen;
        comboMenu.classList.toggle('open', isOpen);
        comboInput.setAttribute('aria-expanded', isOpen.toString());

        if (isOpen) {
            comboInput.setAttribute('aria-activedescendant', 'combo1-0');
        } else {
            comboInput.setAttribute('aria-activedescendant', 'combo1-value');
        }
    };
  
    comboInput.addEventListener('click', toggleComboMenu);
  
    document.addEventListener('click', (event) => {
        if (!comboInput.contains(event.target) && !comboMenu.contains(event.target)) {
            isOpen = false;
            comboMenu.classList.remove('open');
            comboInput.setAttribute('aria-expanded', 'false');
            comboInput.setAttribute('aria-activedescendant', 'combo1-value');
        }
    });
};

setupComboMenu()

const updateComboValue = (selectedOptionId) => {

    let comboValue = document.getElementById('combo1-value');

    let selectedOption = document.getElementById(selectedOptionId);

    comboValue.textContent = selectedOption.textContent;

    selectedOption.setAttribute('aria-selected', 'true');
    selectedOption.classList.add('option-current');

    let comboOptions = document.querySelectorAll('.combo-option');
    comboOptions.forEach(option => {
        if (option.id !== selectedOptionId) {
            option.setAttribute('aria-selected', 'false');
            option.classList.remove('option-current');
        }
    });
};

updateComboValue("combo1-0")

let comboOptions = document.querySelectorAll('.combo-option');
comboOptions.forEach(option => {
    option.addEventListener('click', function() {
        updateComboValue(option.id);
    });
});


//Editable Combobox Example




  
