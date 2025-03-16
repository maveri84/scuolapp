
document.addEventListener('DOMContentLoaded', function() {
    // Tab system per pagine di dettaglio
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabs.length && tabContents.length) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Rimuove la classe active da tutti i tab
                tabs.forEach(t => t.classList.remove('active'));
                
                // Nasconde tutti i contenuti
                tabContents.forEach(content => content.classList.add('hidden'));
                
                // Attiva il tab cliccato
                tab.classList.add('active');
                
                // Mostra il contenuto corrispondente
                const tabId = tab.getAttribute('data-tab');
                const tabContent = document.getElementById(tabId);
                if (tabContent) {
                    tabContent.classList.remove('hidden');
                }
            });
        });
    }
    
    // Supporto mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const sidebar = document.querySelector('.admin-sidebar');
    
    if (mobileMenuButton && sidebar) {
        mobileMenuButton.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
        
        // Chiudi menu quando si clicca fuori
        document.addEventListener('click', (event) => {
            if (!sidebar.contains(event.target) && !mobileMenuButton.contains(event.target) && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });
    }
    
    // Gestione form con conferma
    const formConfirm = document.querySelectorAll('form[data-confirm]');
    
    formConfirm.forEach(form => {
        form.addEventListener('submit', function(e) {
            const confirmMessage = this.getAttribute('data-confirm');
            if (!confirm(confirmMessage)) {
                e.preventDefault();
            }
        });
    });
    
    // Ricerca dinamica per studenti e docenti
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (searchInput && searchResults) {
        let timeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(timeout);
            
            const searchTerm = this.value.trim();
            
            if (searchTerm.length < 2) {
                searchResults.innerHTML = '';
                searchResults.classList.add('hidden');
                return;
            }
            
            timeout = setTimeout(() => {
                fetch(schoolAdmin.ajaxurl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        action: 'school_admin_search_students',
                        search_term: searchTerm,
                        nonce: schoolAdmin.nonce
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success && data.data.length > 0) {
                        searchResults.innerHTML = '';
                        
                        data.data.forEach(item => {
                            const resultItem = document.createElement('div');
                            resultItem.className = 'p-2 border-b hover:bg-gray-100';
                            
                            resultItem.innerHTML = `
                                <a href="${item.permalink}" class="flex items-center">
                                    <span class="font-medium">${item.title}</span>
                                    <span class="ml-2 text-sm text-gray-500">${item.classe || ''}</span>
                                </a>
                            `;
                            
                            searchResults.appendChild(resultItem);
                        });
                        
                        searchResults.classList.remove('hidden');
                    } else {
                        searchResults.innerHTML = '<div class="p-2 text-gray-500">Nessun risultato trovato</div>';
                        searchResults.classList.remove('hidden');
                    }
                })
                .catch(error => {
                    console.error('Errore nella ricerca:', error);
                });
            }, 300);
        });
        
        // Nascondi risultati quando si clicca fuori
        document.addEventListener('click', (event) => {
            if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
                searchResults.classList.add('hidden');
            }
        });
    }
    
    // Gestione richieste di approvazione/rifiuto per protocolli
    const approveButtons = document.querySelectorAll('.approve-button');
    const rejectButtons = document.querySelectorAll('.reject-button');
    
    approveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const protocolId = this.getAttribute('data-id');
            if (confirm('Sei sicuro di voler approvare questo protocollo?')) {
                // In un'implementazione reale qui userei AJAX per aggiornare lo stato del protocollo
                console.log('Approvazione protocollo:', protocolId);
                
                // Aggiorna UI come esempio
                const statusElement = document.querySelector(`.protocol-status-${protocolId}`);
                if (statusElement) {
                    statusElement.innerHTML = '<span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Approvato</span>';
                    
                    // Mostra notifica
                    showNotification('Protocollo approvato con successo', 'success');
                }
            }
        });
    });
    
    rejectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const protocolId = this.getAttribute('data-id');
            const reason = prompt('Inserisci il motivo del rifiuto:');
            
            if (reason) {
                // In un'implementazione reale qui userei AJAX
                console.log('Rifiuto protocollo:', protocolId, 'Motivo:', reason);
                
                // Aggiorna UI come esempio
                const statusElement = document.querySelector(`.protocol-status-${protocolId}`);
                if (statusElement) {
                    statusElement.innerHTML = '<span class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Respinto</span>';
                    
                    // Mostra notifica
                    showNotification('Protocollo respinto', 'error');
                }
            }
        });
    });
    
    // Generazione certificati
    const generateCertificateButton = document.querySelector('#generate-certificate');
    
    if (generateCertificateButton) {
        generateCertificateButton.addEventListener('click', function() {
            const template = document.querySelector('#certificate-template');
            const recipient = document.querySelector('#certificate-recipient');
            
            if (!template || !recipient || !template.value || !recipient.value) {
                showNotification('Seleziona un modello e un destinatario', 'warning');
                return;
            }
            
            // In un'implementazione reale qui userei AJAX
            console.log('Generazione certificato:', template.value, 'per:', recipient.value);
            
            // Simula generazione con notifica
            showNotification('Certificato generato con successo!', 'success');
        });
    }
    
    // Funzione per mostrare notifiche
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `<p>${message}</p>`;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Gestione caricamento file
    const fileUploads = document.querySelectorAll('.file-upload-input');
    
    fileUploads.forEach(input => {
        input.addEventListener('change', function() {
            const fileNameDisplay = this.parentElement.querySelector('.file-name');
            
            if (fileNameDisplay && this.files.length > 0) {
                fileNameDisplay.textContent = this.files[0].name;
                fileNameDisplay.classList.remove('hidden');
            }
        });
    });
    
    // Inizializza i datepicker (se disponibili)
    const datepickers = document.querySelectorAll('.datepicker');
    
    if (datepickers.length && typeof flatpickr === 'function') {
        datepickers.forEach(picker => {
            flatpickr(picker, {
                dateFormat: 'd/m/Y',
                locale: 'it'
            });
        });
    }
    
    // Gestione visualizzazione degli alert
    const alerts = document.querySelectorAll('.alert');
    
    alerts.forEach(alert => {
        const closeButton = alert.querySelector('.alert-close');
        
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                alert.classList.add('fade-out');
                setTimeout(() => {
                    alert.remove();
                }, 300);
            });
        }
        
        // Auto-dismissal dopo 5 secondi
        if (alert.classList.contains('auto-dismiss')) {
            setTimeout(() => {
                alert.classList.add('fade-out');
                setTimeout(() => {
                    alert.remove();
                }, 300);
            }, 5000);
        }
    });
});
