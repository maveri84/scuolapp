
<?php
/**
 * Handle saving meta data
 *
 * @package School_Admin
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Salva i metadati per gli studenti
function save_studente_details($post_id) {
    if (!isset($_POST['studente_details_nonce']) || !wp_verify_nonce($_POST['studente_details_nonce'], 'save_studente_details')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    
    $fields = array('data_nascita', 'classe', 'email', 'telefono', 'indirizzo', 'codice_fiscale');
    
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, '_' . $field, sanitize_text_field($_POST[$field]));
        }
    }
}
add_action('save_post_studenti', 'save_studente_details');

// Salva i metadati per i docenti
function save_docente_details($post_id) {
    if (!isset($_POST['docente_details_nonce']) || !wp_verify_nonce($_POST['docente_details_nonce'], 'save_docente_details')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    
    $fields = array('data_nascita', 'materia', 'email', 'telefono', 'indirizzo', 'codice_fiscale', 'data_assunzione', 'tipo_contratto');
    
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, '_' . $field, sanitize_text_field($_POST[$field]));
        }
    }
}
add_action('save_post_docenti', 'save_docente_details');

// Salva i metadati per i certificati
function save_certificato_details($post_id) {
    if (!isset($_POST['certificato_details_nonce']) || !wp_verify_nonce($_POST['certificato_details_nonce'], 'save_certificato_details')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    
    $fields = array('tipo_certificato', 'destinatario', 'data_emissione', 'data_scadenza', 'protocollo', 'stato');
    
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, '_' . $field, sanitize_text_field($_POST[$field]));
        }
    }
}
add_action('save_post_certificati', 'save_certificato_details');

// Salva i metadati per i protocolli
function save_protocollo_details($post_id) {
    if (!isset($_POST['protocollo_details_nonce']) || !wp_verify_nonce($_POST['protocollo_details_nonce'], 'save_protocollo_details')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    
    $fields = array('numero_protocollo', 'data_protocollo', 'mittente', 'destinatario', 'oggetto', 'tipo_documento', 'stato');
    
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, '_' . $field, sanitize_text_field($_POST[$field]));
        }
    }
}
add_action('save_post_protocollo', 'save_protocollo_details');
