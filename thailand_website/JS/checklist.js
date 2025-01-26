document.addEventListener('DOMContentLoaded', function () {
    const userId = localStorage.getItem('userId') || `user-${Date.now()}`;
    localStorage.setItem('userId', userId);
    const pageId = window.location.pathname.split('/').pop().replace('.html', '');
    const checklistItems = document.getElementById('checklist-items');
    const newItemText = document.getElementById('new-item-text');
    const addItemButton = document.getElementById('add-item-button');

    async function fetchChecklist() {
        const response = await fetch(`/api/checklist?userId=${userId}&pageId=${pageId}`);
        const items = await response.json();
        checklistItems.innerHTML = ''; // Clear existing items
        items.forEach(({ id, text, checked }) => createChecklistItem(id, text, checked));
    }

    function createChecklistItem(id, text, checked = false) {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = checked;
        checkbox.addEventListener('change', () => updateChecklistItem(id, checkbox.checked));

        const label = document.createElement('label');
        label.textContent = text;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => deleteChecklistItem(id));

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(removeButton);
        checklistItems.appendChild(li);
    }

    async function addChecklistItem(text) {
        const itemId = `item-${Date.now()}`;
        await fetch('/api/checklist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, pageId, itemId, text })
        });
        fetchChecklist();
    }

    async function updateChecklistItem(id, checked) {
        await fetch(`/api/checklist/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ checked })
        });
    }

    async function deleteChecklistItem(id) {
        await fetch(`/api/checklist/${id}`, { method: 'DELETE' });
        fetchChecklist();
    }

    addItemButton.addEventListener('click', () => {
        const text = newItemText.value.trim();
        if (text) {
            addChecklistItem(text);
            newItemText.value = '';
        }
    });

    fetchChecklist();
});