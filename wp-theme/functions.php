
<?php
/**
 * School Administration System functions and definitions
 */

// Setup del tema
function school_admin_setup() {
    // Aggiungi supporto per il titolo del sito
    add_theme_support('title-tag');
    
    // Aggiungi supporto per le immagini in evidenza
    add_theme_support('post-thumbnails');
    
    // Supporto per HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'script',
        'style',
    ));
    
    // Supporto per il logo personalizzato
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 100,
        'flex-width'  => true,
        'flex-height' => true,
    ));
    
    // Registra menu di navigazione
    register_nav_menus(array(
        'primary' => __('Menu principale', 'school-admin'),
        'sidebar' => __('Menu laterale', 'school-admin')
    ));
    
    // Registra dimensioni personalizzate per le immagini
    add_image_size('profile-thumbnail', 150, 150, true);
}
add_action('after_setup_theme', 'school_admin_setup');

// Registra stili e script
function school_admin_scripts() {
    // Stili principali
    wp_enqueue_style('school-admin-style', get_stylesheet_uri(), array(), '1.0.1');
    
    // Google Fonts
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', array(), null);
    
    // Font Awesome per le icone
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css', array(), '6.0.0');
    
    // Script principali
    wp_enqueue_script('school-admin-script', get_template_directory_uri() . '/js/script.js', array('jquery'), '1.0.1', true);
    
    // Passa i dati al JS
    wp_localize_script('school-admin-script', 'schoolAdmin', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('school-admin-nonce'),
        'site_url' => site_url(),
        'theme_url' => get_template_directory_uri(),
    ));
}
add_action('wp_enqueue_scripts', 'school_admin_scripts');

// Registra i custom post types
function school_admin_register_post_types() {
    // Custom Post Type per Studenti
    register_post_type('studenti', array(
        'labels' => array(
            'name' => __('Studenti', 'school-admin'),
            'singular_name' => __('Studente', 'school-admin'),
            'add_new' => __('Aggiungi Nuovo', 'school-admin'),
            'add_new_item' => __('Aggiungi Nuovo Studente', 'school-admin'),
            'edit_item' => __('Modifica Studente', 'school-admin'),
            'new_item' => __('Nuovo Studente', 'school-admin'),
            'view_item' => __('Visualizza Studente', 'school-admin'),
            'search_items' => __('Cerca Studenti', 'school-admin'),
            'not_found' => __('Nessuno studente trovato', 'school-admin'),
            'not_found_in_trash' => __('Nessuno studente trovato nel cestino', 'school-admin'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-groups',
        'menu_position' => 5,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'studenti')
    ));
    
    // Custom Post Type per Docenti
    register_post_type('docenti', array(
        'labels' => array(
            'name' => __('Docenti', 'school-admin'),
            'singular_name' => __('Docente', 'school-admin'),
            'add_new' => __('Aggiungi Nuovo', 'school-admin'),
            'add_new_item' => __('Aggiungi Nuovo Docente', 'school-admin'),
            'edit_item' => __('Modifica Docente', 'school-admin'),
            'new_item' => __('Nuovo Docente', 'school-admin'),
            'view_item' => __('Visualizza Docente', 'school-admin'),
            'search_items' => __('Cerca Docenti', 'school-admin'),
            'not_found' => __('Nessun docente trovato', 'school-admin'),
            'not_found_in_trash' => __('Nessun docente trovato nel cestino', 'school-admin'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-welcome-learn-more',
        'menu_position' => 6,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'docenti')
    ));
    
    // Custom Post Type per Certificati
    register_post_type('certificati', array(
        'labels' => array(
            'name' => __('Certificati', 'school-admin'),
            'singular_name' => __('Certificato', 'school-admin'),
            'add_new' => __('Aggiungi Nuovo', 'school-admin'),
            'add_new_item' => __('Aggiungi Nuovo Certificato', 'school-admin'),
            'edit_item' => __('Modifica Certificato', 'school-admin'),
            'new_item' => __('Nuovo Certificato', 'school-admin'),
            'view_item' => __('Visualizza Certificato', 'school-admin'),
            'search_items' => __('Cerca Certificati', 'school-admin'),
            'not_found' => __('Nessun certificato trovato', 'school-admin'),
            'not_found_in_trash' => __('Nessun certificato trovato nel cestino', 'school-admin'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'custom-fields'),
        'menu_icon' => 'dashicons-media-document',
        'menu_position' => 7,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'certificati')
    ));
    
    // Custom Post Type per Protocollo
    register_post_type('protocollo', array(
        'labels' => array(
            'name' => __('Protocollo', 'school-admin'),
            'singular_name' => __('Protocollo', 'school-admin'),
            'add_new' => __('Aggiungi Nuovo', 'school-admin'),
            'add_new_item' => __('Aggiungi Nuovo Protocollo', 'school-admin'),
            'edit_item' => __('Modifica Protocollo', 'school-admin'),
            'new_item' => __('Nuovo Protocollo', 'school-admin'),
            'view_item' => __('Visualizza Protocollo', 'school-admin'),
            'search_items' => __('Cerca Protocolli', 'school-admin'),
            'not_found' => __('Nessun protocollo trovato', 'school-admin'),
            'not_found_in_trash' => __('Nessun protocollo trovato nel cestino', 'school-admin'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'custom-fields'),
        'menu_icon' => 'dashicons-clipboard',
        'menu_position' => 8,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'protocollo')
    ));
    
    // Registra le tassonomie
    register_taxonomy(
        'classe',
        'studenti',
        array(
            'labels' => array(
                'name' => __('Classi', 'school-admin'),
                'singular_name' => __('Classe', 'school-admin'),
                'search_items' => __('Cerca Classi', 'school-admin'),
                'all_items' => __('Tutte le Classi', 'school-admin'),
                'edit_item' => __('Modifica Classe', 'school-admin'),
                'update_item' => __('Aggiorna Classe', 'school-admin'),
                'add_new_item' => __('Aggiungi Nuova Classe', 'school-admin'),
                'new_item_name' => __('Nuova Classe', 'school-admin'),
                'menu_name' => __('Classi', 'school-admin'),
            ),
            'hierarchical' => true,
            'show_ui' => true,
            'show_admin_column' => true,
            'query_var' => true,
            'rewrite' => array('slug' => 'classe'),
            'show_in_rest' => true,
        )
    );
    
    register_taxonomy(
        'materia',
        array('docenti', 'studenti'),
        array(
            'labels' => array(
                'name' => __('Materie', 'school-admin'),
                'singular_name' => __('Materia', 'school-admin'),
                'search_items' => __('Cerca Materie', 'school-admin'),
                'all_items' => __('Tutte le Materie', 'school-admin'),
                'edit_item' => __('Modifica Materia', 'school-admin'),
                'update_item' => __('Aggiorna Materia', 'school-admin'),
                'add_new_item' => __('Aggiungi Nuova Materia', 'school-admin'),
                'new_item_name' => __('Nuova Materia', 'school-admin'),
                'menu_name' => __('Materie', 'school-admin'),
            ),
            'hierarchical' => true,
            'show_ui' => true,
            'show_admin_column' => true,
            'query_var' => true,
            'rewrite' => array('slug' => 'materia'),
            'show_in_rest' => true,
        )
    );
}
add_action('init', 'school_admin_register_post_types');

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

// Crea tabelle personalizzate per dati complessi
function school_admin_create_tables() {
    global $wpdb;
    
    $charset_collate = $wpdb->get_charset_collate();
    
    // Tabella per le presenze
    $table_presenze = $wpdb->prefix . 'presenze';
    $sql = "CREATE TABLE $table_presenze (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        studente_id mediumint(9) NOT NULL,
        data date NOT NULL,
        stato varchar(20) NOT NULL,
        note text,
        PRIMARY KEY  (id)
    ) $charset_collate;";
    
    // Tabella per i voti
    $table_voti = $wpdb->prefix . 'voti';
    $sql2 = "CREATE TABLE $table_voti (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        studente_id mediumint(9) NOT NULL,
        materia_id mediumint(9) NOT NULL,
        data date NOT NULL,
        voto float NOT NULL,
        tipo varchar(50) NOT NULL,
        note text,
        PRIMARY KEY  (id)
    ) $charset_collate;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
    dbDelta($sql2);
}
register_activation_hook(__FILE__, 'school_admin_create_tables');

// Verifica se le tabelle esistono durante l'attivazione del tema
function school_admin_theme_activation() {
    school_admin_create_tables();
}
add_action('after_switch_theme', 'school_admin_theme_activation');

// Aggiungi pagine di amministrazione personalizzate
function school_admin_menu_pages() {
    add_menu_page(
        __('Dashboard Scuola', 'school-admin'),
        __('Dashboard Scuola', 'school-admin'),
        'manage_options',
        'school-admin-dashboard',
        'school_admin_dashboard_page',
        'dashicons-welcome-learn-more',
        3
    );
    
    add_submenu_page(
        'school-admin-dashboard',
        __('Registro Presenze', 'school-admin'),
        __('Registro Presenze', 'school-admin'),
        'manage_options',
        'school-admin-presenze',
        'school_admin_presenze_page'
    );
    
    add_submenu_page(
        'school-admin-dashboard',
        __('Gestione Voti', 'school-admin'),
        __('Gestione Voti', 'school-admin'),
        'manage_options',
        'school-admin-voti',
        'school_admin_voti_page'
    );
}
add_action('admin_menu', 'school_admin_menu_pages');

// Funzione per la pagina Dashboard
function school_admin_dashboard_page() {
    include(get_template_directory() . '/admin/dashboard.php');
}

// Funzione per la pagina Presenze
function school_admin_presenze_page() {
    include(get_template_directory() . '/admin/presenze.php');
}

// Funzione per la pagina Voti
function school_admin_voti_page() {
    include(get_template_directory() . '/admin/voti.php');
}

// Widget personalizzati
function school_admin_register_widgets() {
    register_sidebar(array(
        'name'          => __('Sidebar del Dashboard', 'school-admin'),
        'id'            => 'sidebar-dashboard',
        'description'   => __('Widget per la sidebar del dashboard', 'school-admin'),
        'before_widget' => '<div class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'school_admin_register_widgets');

// Shortcode per mostrare il conteggio degli studenti
function school_admin_student_count_shortcode($atts) {
    $atts = shortcode_atts(array(
        'classe' => '',
    ), $atts, 'student_count');
    
    $args = array(
        'post_type' => 'studenti',
        'posts_per_page' => -1,
    );
    
    if (!empty($atts['classe'])) {
        $args['meta_query'] = array(
            array(
                'key' => '_classe',
                'value' => $atts['classe'],
                'compare' => '='
            )
        );
    }
    
    $students = new WP_Query($args);
    
    return $students->found_posts;
}
add_shortcode('student_count', 'school_admin_student_count_shortcode');

// AJAX handler per la ricerca di studenti
function school_admin_search_students() {
    check_ajax_referer('school-admin-nonce', 'nonce');
    
    $search_term = sanitize_text_field($_POST['search_term']);
    
    $args = array(
        'post_type' => 'studenti',
        'posts_per_page' => 10,
        's' => $search_term,
    );
    
    $results = array();
    $students = new WP_Query($args);
    
    if ($students->have_posts()) {
        while ($students->have_posts()) {
            $students->the_post();
            $results[] = array(
                'id' => get_the_ID(),
                'title' => get_the_title(),
                'permalink' => get_permalink(),
                'classe' => get_post_meta(get_the_ID(), '_classe', true),
            );
        }
    }
    
    wp_reset_postdata();
    
    wp_send_json_success($results);
}
add_action('wp_ajax_school_admin_search_students', 'school_admin_search_students');

// Aggiungi supporto per l'importazione di studenti da CSV
function school_admin_handle_csv_import() {
    if (isset($_POST['action']) && $_POST['action'] === 'import_students' && 
        isset($_FILES['student_csv']) && 
        isset($_POST['csv_nonce']) && 
        wp_verify_nonce($_POST['csv_nonce'], 'import_students_csv')) {
        
        $file = $_FILES['student_csv'];
        
        if ($file['error'] > 0) {
            wp_die('Errore nel caricamento del file: ' . $file['error']);
            return;
        }
        
        if (pathinfo($file['name'], PATHINFO_EXTENSION) !== 'csv') {
            wp_die('Il file deve essere in formato CSV');
            return;
        }
        
        $handle = fopen($file['tmp_name'], 'r');
        
        // Ignora la prima riga (intestazioni)
        fgetcsv($handle, 1000, ',');
        
        $imported = 0;
        
        while (($data = fgetcsv($handle, 1000, ',')) !== false) {
            if (count($data) < 5) {
                continue;
            }
            
            $nome = sanitize_text_field($data[0]);
            $classe = sanitize_text_field($data[1]);
            $email = sanitize_email($data[2]);
            $telefono = sanitize_text_field($data[3]);
            $data_nascita = sanitize_text_field($data[4]);
            
            $post_id = wp_insert_post(array(
                'post_title' => $nome,
                'post_type' => 'studenti',
                'post_status' => 'publish',
            ));
            
            if ($post_id) {
                update_post_meta($post_id, '_classe', $classe);
                update_post_meta($post_id, '_email', $email);
                update_post_meta($post_id, '_telefono', $telefono);
                update_post_meta($post_id, '_data_nascita', $data_nascita);
                
                $imported++;
            }
        }
        
        fclose($handle);
        
        wp_redirect(admin_url('edit.php?post_type=studenti&imported=' . $imported));
        exit;
    }
}
add_action('admin_init', 'school_admin_handle_csv_import');

// Aggiungi notifiche di avviso per importazione CSV
function school_admin_admin_notices() {
    if (isset($_GET['imported']) && $_GET['imported'] > 0) {
        $count = intval($_GET['imported']);
        printf('<div class="notice notice-success is-dismissible"><p>' . __('Importati %d studenti con successo!', 'school-admin') . '</p></div>', $count);
    }
}
add_action('admin_notices', 'school_admin_admin_notices');

// Funzione per generare un certificato in PDF (esempio fittizio)
function school_admin_generate_certificate_pdf($certificate_id) {
    // In una implementazione reale, qui si userebbe una libreria come FPDF o TCPDF
    // per generare un vero PDF con i dati del certificato
    
    // Per ora, simula solo il processo di generazione
    update_post_meta($certificate_id, '_generated', 'yes');
    update_post_meta($certificate_id, '_generation_date', current_time('mysql'));
    
    return true;
}
