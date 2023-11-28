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
    let comboOptions = document.querySelectorAll('.combo-option');

    let isOpen = false;
    let selectedOption = null;

    const toggleComboMenu = () => {
        isOpen = !isOpen;
        comboMenu.classList.toggle('open', isOpen);
        comboInput.setAttribute('aria-expanded', isOpen.toString());

        if (isOpen) {
            comboInput.setAttribute('aria-activedescendant', selectedOption ? selectedOption.id : '');
        } else {
            comboInput.setAttribute('aria-activedescendant', '');
        }
    };

    const updateComboValue = (selectedOptionId) => {
        let comboValue = document.getElementById('combo1-value');
        let selectedOption = document.getElementById(selectedOptionId);

        comboValue.textContent = selectedOption.textContent;

        selectedOption.setAttribute('aria-selected', 'true');
        selectedOption.classList.add('option-current');

        comboOptions.forEach(option => {
            if (option.id !== selectedOptionId) {
                option.setAttribute('aria-selected', 'false');
                option.classList.remove('option-current');
            }
        });

        isOpen = false;
        comboMenu.classList.remove('open');
        comboInput.setAttribute('aria-expanded', 'false');
        comboInput.setAttribute('aria-activedescendant', 'combo1-value');
    };

    const navigateOptions = (direction) => {
        const currentIndex = Array.from(comboOptions).findIndex(option => option.classList.contains('option-current'));

        if (currentIndex !== -1) {
            comboOptions[currentIndex].classList.remove('option-current');
        }

        let newIndex = currentIndex + direction;
        if (newIndex < 0) {
            newIndex = comboOptions.length - 1;
        } else if (newIndex >= comboOptions.length) {
            newIndex = 0;
        }

        const newSelectedOption = comboOptions[newIndex];

        if (newSelectedOption) {
            newSelectedOption.classList.add('option-current');
            comboInput.setAttribute('aria-activedescendant', newSelectedOption.id);
        }

        selectedOption = newSelectedOption;
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

    comboOptions.forEach(option => {
        option.addEventListener('click', () => {
            updateComboValue(option.id);
        });

        option.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                updateComboValue(option.id);
            }
        });
    });

    comboInput.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            navigateOptions(1);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            navigateOptions(-1);
        } else if (event.key === 'Tab' && isOpen && selectedOption) {
            event.preventDefault();
            updateComboValue(selectedOption.id);
        }
    });
};

setupComboMenu();



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

const createComboMenuInsert = () => {
    let fruitNames = ['Apple', 'Banana', 'Blueberry', 'Boysenberry', 'Cherry', 'Durian', 'Eggplant', 'Fig', 'Grape', 'Guava', 'Huckleberry'];
   
       let comboInsert = document.querySelector("#listbox2");
   
       for (let i = 0; i < fruitNames.length; i++) {
           let option = document.createElement('div');
           option.className = 'combo-option';
           option.setAttribute('role', 'option');
           option.id = 'combo1-' + i;
           option.setAttribute('aria-selected', 'false');
           option.textContent = fruitNames[i];
   
           comboInsert.appendChild(option);
       }
   }
   createComboMenuInsert();


   const updateComboValueEdit = (selectedOptionId) => {
    let comboInput = document.getElementById('combo2');
    let selectedOption = document.getElementById(selectedOptionId);

    comboInput.value = selectedOption.textContent;

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

updateComboValueEdit("combo1-0");

   
document.addEventListener('DOMContentLoaded', function () {
    const comboContainer = document.querySelector('.js-combobox');
    const comboInput = comboContainer.querySelector('.combo-input');
    const comboMenu = comboContainer.querySelector('.combo-menu');
    const comboOptions = comboMenu.querySelectorAll('.combo-option');

    let isOpen = false;
    let selectedOption = null;

    const toggleComboMenu = () => {
        isOpen = !isOpen;
        comboContainer.classList.toggle('open', isOpen);
        comboInput.setAttribute('aria-expanded', isOpen.toString());

        if (isOpen) {
            comboInput.setAttribute('aria-activedescendant', selectedOption ? selectedOption.id : '');
        } else {
            comboInput.setAttribute('aria-activedescendant', '');
        }
    };

    const updateComboValue = (newSelectedOption) => {
        const isInputEmpty = comboInput.value.trim() === '';

        if (selectedOption) {
            selectedOption.removeAttribute('aria-selected');
            selectedOption.classList.remove('option-current');
            selectedOption.style.backgroundColor = '';
            selectedOption.removeAttribute('tabindex');
        }

        selectedOption = newSelectedOption;

        if (selectedOption) {
            comboInput.value = selectedOption.textContent;
            comboInput.setAttribute('aria-activedescendant', selectedOption.id);
            comboInput.setAttribute('aria-expanded', 'false');

            selectedOption.setAttribute('aria-selected', 'true');
            selectedOption.classList.add('option-current');
            selectedOption.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            selectedOption.setAttribute('tabindex', '0');
        } else {
            comboInput.value = '';
            comboInput.setAttribute('aria-activedescendant', '');
            comboInput.setAttribute('aria-expanded', 'false');
        }

        isOpen = isInputEmpty || !!selectedOption;
        comboContainer.classList.toggle('open', isOpen);

        if (selectedOption) {
            comboContainer.classList.remove('open');
            selectedOption.focus();
        }
    };

    const findBestMatch = (inputValue) => {
        let maxMatch = 0;
        let bestMatchOption = null;

        comboOptions.forEach(option => {
            const optionText = option.textContent.toLowerCase();

            option.style.display = 'block';

            for (let i = 0; i < inputValue.length; i++) {
                if (optionText.includes(inputValue.substr(0, i + 1))) {
                    if (i + 1 > maxMatch) {
                        maxMatch = i + 1;
                        bestMatchOption = option;
                    }
                }
            }

            option.style.backgroundColor = option === bestMatchOption ? 'rgba(0, 0, 0, 0.1)' : '';
            option.setAttribute('tabindex', option === bestMatchOption ? '0' : '');
        });

        return bestMatchOption;
    };

    const handleTabKey = () => {
        const visibleOptions = Array.from(comboOptions).filter(option => option.style.display !== 'none');

        if (visibleOptions.length > 0 && isOpen) {
            const bestMatchOption = findBestMatch(comboInput.value.toLowerCase());
            updateComboValue(bestMatchOption || visibleOptions[0]);
        }
    };

    const navigateOptions = (direction) => {
        const currentIndex = Array.from(comboOptions).findIndex(option => option.style.backgroundColor === 'rgba(0, 0, 0, 0.1)');

        if (currentIndex !== -1) {
            comboOptions[currentIndex].style.backgroundColor = '';
            comboOptions[currentIndex].removeAttribute('tabindex');
        }

        let newIndex = currentIndex + direction;
        if (newIndex < 0) {
            newIndex = comboOptions.length - 1;
        } else if (newIndex >= comboOptions.length) {
            newIndex = 0;
        }

        const newSelectedOption = comboOptions[newIndex];

        if (newSelectedOption) {
            newSelectedOption.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            newSelectedOption.setAttribute('tabindex', '0');
            comboInput.setAttribute('aria-activedescendant', newSelectedOption.id);
            comboInput.value = newSelectedOption.textContent;
        }

        selectedOption = newSelectedOption;
    };

    const handleEnterKey = () => {
        if (isOpen && selectedOption) {
            updateComboValue(selectedOption);
        }
    };

    comboInput.addEventListener('click', toggleComboMenu);

    comboInput.addEventListener('input', () => {
        const inputValue = comboInput.value.trim().toLowerCase();
        const bestMatchOption = findBestMatch(inputValue);
        if (!bestMatchOption) {
            updateComboValue(null);
        }
    });

    comboInput.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            handleTabKey();
        } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            const direction = event.key === 'ArrowDown' ? 1 : -1;
            navigateOptions(direction);
        } else if (event.key === 'Enter') {
            event.preventDefault();
            handleEnterKey();
        }
    });

    comboOptions.forEach(option => {
        option.addEventListener('click', () => {
            updateComboValue(option);
        });

        option.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                updateComboValue(option);
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (!comboContainer.contains(event.target)) {
            isOpen = false;
            comboContainer.classList.remove('open');
        }
    });
});
//