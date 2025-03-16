
document.addEventListener('DOMContentLoaded', function() {
    // Tab system for detail pages
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
                document.getElementById(tabId).classList.remove('hidden');
            });
        });
    }
    
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const sidebar = document.querySelector('.admin-sidebar');
    
    if (mobileMenuButton && sidebar) {
        mobileMenuButton.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
        });
    }
    
    // Handle form submissions
    const forms = document.querySelectorAll('form[data-confirm]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const confirmMessage = this.getAttribute('data-confirm');
            if (!confirm(confirmMessage)) {
                e.preventDefault();
            }
        });
    });
    
    // Handle protocol approval/rejection
    const approveButtons = document.querySelectorAll('.approve-button');
    const rejectButtons = document.querySelectorAll('.reject-button');
    
    approveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const protocolId = this.getAttribute('data-id');
            if (confirm('Sei sicuro di voler approvare questo protocollo?')) {
                // Here you would use AJAX to update the protocol status
                console.log('Approving protocol:', protocolId);
                
                // Example for updating UI
                const statusElement = document.querySelector(`.protocol-status-${protocolId}`);
                if (statusElement) {
                    statusElement.innerHTML = '<span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Approvato</span>';
                }
            }
        });
    });
    
    rejectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const protocolId = this.getAttribute('data-id');
            const reason = prompt('Inserisci il motivo del rifiuto:');
            
            if (reason) {
                // Here you would use AJAX to update the protocol status
                console.log('Rejecting protocol:', protocolId, 'Reason:', reason);
                
                // Example for updating UI
                const statusElement = document.querySelector(`.protocol-status-${protocolId}`);
                if (statusElement) {
                    statusElement.innerHTML = '<span class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Respinto</span>';
                }
            }
        });
    });
    
    // Handle certificate generation
    const generateCertificateButton = document.querySelector('#generate-certificate');
    
    if (generateCertificateButton) {
        generateCertificateButton.addEventListener('click', function() {
            const template = document.querySelector('#certificate-template').value;
            const recipient = document.querySelector('#certificate-recipient').value;
            
            if (!template || !recipient) {
                alert('Seleziona un modello e un destinatario per generare il certificato.');
                return;
            }
            
            // Here you would generate the certificate
            console.log('Generating certificate with template:', template, 'for recipient:', recipient);
            
            // Simulate certificate generation with a notification
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg';
            notification.innerHTML = '<p>Certificato generato con successo!</p>';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        });
    }
});
