
<?php
/**
 * Custom Metaboxes
 *
 * @package School_Admin
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Aggiungi metabox per campi personalizzati
function school_admin_add_meta_boxes() {
    // Metabox per Studenti
    add_meta_box(
        'studente_details',
        __('Dettagli Studente', 'school-admin'),
        'studente_details_callback',
        'studenti',
        'normal',
        'high'
    );
    
    // Metabox per Docenti
    add_meta_box(
        'docente_details',
        __('Dettagli Docente', 'school-admin'),
        'docente_details_callback',
        'docenti',
        'normal',
        'high'
    );
    
    // Metabox per Certificati
    add_meta_box(
        'certificato_details',
        __('Dettagli Certificato', 'school-admin'),
        'certificato_details_callback',
        'certificati',
        'normal',
        'high'
    );
    
    // Metabox per Protocollo
    add_meta_box(
        'protocollo_details',
        __('Dettagli Protocollo', 'school-admin'),
        'protocollo_details_callback',
        'protocollo',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'school_admin_add_meta_boxes');

// Callback per i dettagli dello studente
function studente_details_callback($post) {
    wp_nonce_field('save_studente_details', 'studente_details_nonce');
    
    $data_nascita = get_post_meta($post->ID, '_data_nascita', true);
    $classe = get_post_meta($post->ID, '_classe', true);
    $email = get_post_meta($post->ID, '_email', true);
    $telefono = get_post_meta($post->ID, '_telefono', true);
    $indirizzo = get_post_meta($post->ID, '_indirizzo', true);
    $codice_fiscale = get_post_meta($post->ID, '_codice_fiscale', true);
    
    echo '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">';
    
    echo '<div>';
    echo '<p><label for="data_nascita">' . __('Data di nascita:', 'school-admin') . '</label><br>';
    echo '<input type="date" id="data_nascita" name="data_nascita" value="' . esc_attr($data_nascita) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="classe">' . __('Classe:', 'school-admin') . '</label><br>';
    echo '<input type="text" id="classe" name="classe" value="' . esc_attr($classe) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="email">' . __('Email:', 'school-admin') . '</label><br>';
    echo '<input type="email" id="email" name="email" value="' . esc_attr($email) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="telefono">' . __('Telefono:', 'school-admin') . '</label><br>';
    echo '<input type="text" id="telefono" name="telefono" value="' . esc_attr($telefono) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="indirizzo">' . __('Indirizzo:', 'school-admin') . '</label><br>';
    echo '<input type="text" id="indirizzo" name="indirizzo" value="' . esc_attr($indirizzo) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="codice_fiscale">' . __('Codice Fiscale:', 'school-admin') . '</label><br>';
    echo '<input type="text" id="codice_fiscale" name="codice_fiscale" value="' . esc_attr($codice_fiscale) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '</div>';
}

// Callback per i dettagli del docente
function docente_details_callback($post) {
    wp_nonce_field('save_docente_details', 'docente_details_nonce');
    
    $data_nascita = get_post_meta($post->ID, '_data_nascita', true);
    $materia = get_post_meta($post->ID, '_materia', true);
    $email = get_post_meta($post->ID, '_email', true);
    $telefono = get_post_meta($post->ID, '_telefono', true);
    $indirizzo = get_post_meta($post->ID, '_indirizzo', true);
    $codice_fiscale = get_post_meta($post->ID, '_codice_fiscale', true);
    $data_assunzione = get_post_meta($post->ID, '_data_assunzione', true);
    $tipo_contratto = get_post_meta($post->ID, '_tipo_contratto', true);
    
    echo '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">';
    
    echo '<div>';
    echo '<p><label for="data_nascita">' . __('Data di nascita:', 'school-admin') . '</label><br>';
    echo '<input type="date" id="data_nascita" name="data_nascita" value="' . esc_attr($data_nascita) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="materia">' . __('Materia:', 'school-admin') . '</label><br>';
    echo '<input type="text" id="materia" name="materia" value="' . esc_attr($materia) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="email">' . __('Email:', 'school-admin') . '</label><br>';
    echo '<input type="email" id="email" name="email" value="' . esc_attr($email) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="telefono">' . __('Telefono:', 'school-admin') . '</label><br>';
    echo '<input type="text" id="telefono" name="telefono" value="' . esc_attr($telefono) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="indirizzo">' . __('Indirizzo:', 'school-admin') . '</label><br>';
    echo '<input type="text" id="indirizzo" name="indirizzo" value="' . esc_attr($indirizzo) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="codice_fiscale">' . __('Codice Fiscale:', 'school-admin') . '</label><br>';
    echo '<input type="text" id="codice_fiscale" name="codice_fiscale" value="' . esc_attr($codice_fiscale) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="data_assunzione">' . __('Data Assunzione:', 'school-admin') . '</label><br>';
    echo '<input type="date" id="data_assunzione" name="data_assunzione" value="' . esc_attr($data_assunzione) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="tipo_contratto">' . __('Tipo Contratto:', 'school-admin') . '</label><br>';
    echo '<select id="tipo_contratto" name="tipo_contratto" class="widefat">';
    echo '<option value="indeterminato" ' . selected($tipo_contratto, 'indeterminato', false) . '>' . __('Tempo Indeterminato', 'school-admin') . '</option>';
    echo '<option value="determinato" ' . selected($tipo_contratto, 'determinato', false) . '>' . __('Tempo Determinato', 'school-admin') . '</option>';
    echo '<option value="supplente" ' . selected($tipo_contratto, 'supplente', false) . '>' . __('Supplente', 'school-admin') . '</option>';
    echo '</select></p>';
    echo '</div>';
    
    echo '</div>';
}

// Callback per i dettagli del certificato
function certificato_details_callback($post) {
    wp_nonce_field('save_certificato_details', 'certificato_details_nonce');
    
    $tipo_certificato = get_post_meta($post->ID, '_tipo_certificato', true);
    $destinatario = get_post_meta($post->ID, '_destinatario', true);
    $data_emissione = get_post_meta($post->ID, '_data_emissione', true);
    $data_scadenza = get_post_meta($post->ID, '_data_scadenza', true);
    $protocollo = get_post_meta($post->ID, '_protocollo', true);
    $stato = get_post_meta($post->ID, '_stato', true);
    
    echo '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">';
    
    echo '<div>';
    echo '<p><label for="tipo_certificato">' . __('Tipo Certificato:', 'school-admin') . '</label><br>';
    echo '<select id="tipo_certificato" name="tipo_certificato" class="widefat">';
    echo '<option value="iscrizione" ' . selected($tipo_certificato, 'iscrizione', false) . '>' . __('Iscrizione', 'school-admin') . '</option>';
    echo '<option value="frequenza" ' . selected($tipo_certificato, 'frequenza', false) . '>' . __('Frequenza', 'school-admin') . '</option>';
    echo '<option value="diploma" ' . selected($tipo_certificato, 'diploma', false) . '>' . __('Diploma', 'school-admin') . '</option>';
    echo '<option value="altro" ' . selected($tipo_certificato, 'altro', false) . '>' . __('Altro', 'school-admin') . '</option>';
    echo '</select></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="destinatario">' . __('Destinatario:', 'school-admin') . '</label><br>';
    echo '<input type="text" id="destinatario" name="destinatario" value="' . esc_attr($destinatario) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="data_emissione">' . __('Data Emissione:', 'school-admin') . '</label><br>';
    echo '<input type="date" id="data_emissione" name="data_emissione" value="' . esc_attr($data_emissione) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="data_scadenza">' . __('Data Scadenza:', 'school-admin') . '</label><br>';
    echo '<input type="date" id="data_scadenza" name="data_scadenza" value="' . esc_attr($data_scadenza) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="protocollo">' . __('Numero Protocollo:', 'school-admin') . '</label><br>';
    echo '<input type="text" id="protocollo" name="protocollo" value="' . esc_attr($protocollo) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="stato">' . __('Stato:', 'school-admin') . '</label><br>';
    echo '<select id="stato" name="stato" class="widefat">';
    echo '<option value="emesso" ' . selected($stato, 'emesso', false) . '>' . __('Emesso', 'school-admin') . '</option>';
    echo '<option value="in_attesa" ' . selected($stato, 'in_attesa', false) . '>' . __('In Attesa', 'school-admin') . '</option>';
    echo '<option value="scaduto" ' . selected($stato, 'scaduto', false) . '>' . __('Scaduto', 'school-admin') . '</option>';
    echo '</select></p>';
    echo '</div>';
    
    echo '</div>';
}

// Callback per i dettagli del protocollo
function protocollo_details_callback($post) {
    wp_nonce_field('save_protocollo_details', 'protocollo_details_nonce');
    
    $numero_protocollo = get_post_meta($post->ID, '_numero_protocollo', true);
    $data_protocollo = get_post_meta($post->ID, '_data_protocollo', true);
    $mittente = get_post_meta($post->ID, '_mittente', true);
    $destinatario = get_post_meta($post->ID, '_destinatario', true);
    $oggetto = get_post_meta($post->ID, '_oggetto', true);
    $tipo_documento = get_post_meta($post->ID, '_tipo_documento', true);
    $stato = get_post_meta($post->ID, '_stato', true);
    
    echo '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">';
    
    echo '<div>';
    echo '<p><label for="numero_protocollo">' . __('Numero Protocollo:', 'school-admin') . '</label><br>';
    echo '<input type="text" id="numero_protocollo" name="numero_protocollo" value="' . esc_attr($numero_protocollo) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="data_protocollo">' . __('Data Protocollo:', 'school-admin') . '</label><br>';
    echo '<input type="date" id="data_protocollo" name="data_protocollo" value="' . esc_attr($data_protocollo) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="mittente">' . __('Mittente:', 'school-admin') . '</label><br>';
    echo '<input type="text" id="mittente" name="mittente" value="' . esc_attr($mittente) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="destinatario">' . __('Destinatario:', 'school-admin') . '</label><br>';
    echo '<input type="text" id="destinatario" name="destinatario" value="' . esc_attr($destinatario) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '<div class="md:col-span-2">';
    echo '<p><label for="oggetto">' . __('Oggetto:', 'school-admin') . '</label><br>';
    echo '<input type="text" id="oggetto" name="oggetto" value="' . esc_attr($oggetto) . '" class="widefat"></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="tipo_documento">' . __('Tipo Documento:', 'school-admin') . '</label><br>';
    echo '<select id="tipo_documento" name="tipo_documento" class="widefat">';
    echo '<option value="ingresso" ' . selected($tipo_documento, 'ingresso', false) . '>' . __('Ingresso', 'school-admin') . '</option>';
    echo '<option value="uscita" ' . selected($tipo_documento, 'uscita', false) . '>' . __('Uscita', 'school-admin') . '</option>';
    echo '<option value="interno" ' . selected($tipo_documento, 'interno', false) . '>' . __('Interno', 'school-admin') . '</option>';
    echo '</select></p>';
    echo '</div>';
    
    echo '<div>';
    echo '<p><label for="stato">' . __('Stato:', 'school-admin') . '</label><br>';
    echo '<select id="stato" name="stato" class="widefat">';
    echo '<option value="registrato" ' . selected($stato, 'registrato', false) . '>' . __('Registrato', 'school-admin') . '</option>';
    echo '<option value="in_lavorazione" ' . selected($stato, 'in_lavorazione', false) . '>' . __('In Lavorazione', 'school-admin') . '</option>';
    echo '<option value="completato" ' . selected($stato, 'completato', false) . '>' . __('Completato', 'school-admin') . '</option>';
    echo '<option value="archiviato" ' . selected($stato, 'archiviato', false) . '>' . __('Archiviato', 'school-admin') . '</option>';
    echo '</select></p>';
    echo '</div>';
    
    echo '</div>';
}
