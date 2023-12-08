document.addEventListener('DOMContentLoaded', () => {
    loadReminders();
  });
  
  function addReminder() {
    const reminderInput = document.getElementById('reminder');
    const colorSelect = document.getElementById('color');
    const reminderList = document.getElementById('reminderList');
  
    const reminderText = reminderInput.value;
    const reminderColor = colorSelect.value;
  
    if (reminderText.trim() === '') {
      alert('Por favor, ingresa un recordatorio válido.');
      return;
    }
  
    const reminder = {
      text: reminderText,
      color: reminderColor,
    };
  
    // Save reminder to localStorage
    saveReminder(reminder);
  
    // Display the reminder
    displayReminder(reminder, reminderList);
  
    // Clear input fields
    reminderInput.value = '';
  }
  
  function saveReminder(reminder) {
    let reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    reminders.push(reminder);
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }
  
  function loadReminders() {
    const reminderList = document.getElementById('reminderList');
    let reminders = JSON.parse(localStorage.getItem('reminders')) || [];
  
    reminders.forEach((reminder) => {
      displayReminder(reminder, reminderList);
    });
  }
  
  function displayReminder(reminder, reminderList) {
    const li = document.createElement('li');
    li.textContent = reminder.text;
    li.style.color = reminder.color;
  
    // Agregar botón de editar
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.onclick = () => editReminder(reminder, li);
  
    // Agregar botón de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.onclick = () => deleteReminder(reminder, li);
  
    // Agregar botones al elemento li
    li.appendChild(editButton);
    li.appendChild(deleteButton);
  
    reminderList.appendChild(li);
  }
  
  function editReminder(reminder, li) {
    const newText = prompt('Edita el recordatorio:', reminder.text);
    if (newText !== null) {
      reminder.text = newText;
      saveRemindersToLocalStorage();
      li.textContent = newText;
    }
  }
  
  function deleteReminder(reminder, li) {
    const confirmDelete = confirm('¿Seguro que deseas eliminar este recordatorio?');
    if (confirmDelete) {
      li.remove();
      const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
      const updatedReminders = reminders.filter((r) => r !== reminder);
      localStorage.setItem('reminders', JSON.stringify(updatedReminders));
    }
  }
  
  function saveRemindersToLocalStorage() {
    const reminderList = document.getElementById('reminderList');
    const reminders = [];
    reminderList.childNodes.forEach((li) => {
      const text = li.textContent;
      const color = li.style.color;
      reminders.push({ text, color });
    });
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }