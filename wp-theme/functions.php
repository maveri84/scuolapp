
<?php
/**
 * School Administration System functions and definitions
 */

// Impostazione del tema
function school_admin_setup() {
    // Aggiungi supporto per il titolo del sito
    add_theme_support('title-tag');
    
    // Aggiungi supporto per le immagini in evidenza
    add_theme_support('post-thumbnails');
    
    // Registra menu di navigazione
    register_nav_menus(array(
        'primary' => __('Menu principale', 'school-admin'),
        'sidebar' => __('Menu laterale', 'school-admin')
    ));
}
add_action('after_setup_theme', 'school_admin_setup');

// Registra stili e script
function school_admin_scripts() {
    // Stili principali
    wp_enqueue_style('school-admin-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // Google Fonts
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', array(), null);
    
    // Font Awesome per le icone
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css', array(), '6.0.0');
    
    // Script principali
    wp_enqueue_script('school-admin-script', get_template_directory_uri() . '/js/script.js', array('jquery'), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'school_admin_scripts');

// Registra i custom post types
function school_admin_register_post_types() {
    // Custom Post Type per Studenti
    register_post_type('studenti', array(
        'labels' => array(
            'name' => __('Studenti', 'school-admin'),
            'singular_name' => __('Studente', 'school-admin')
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-groups'
    ));
    
    // Custom Post Type per Docenti
    register_post_type('docenti', array(
        'labels' => array(
            'name' => __('Docenti', 'school-admin'),
            'singular_name' => __('Docente', 'school-admin')
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-welcome-learn-more'
    ));
    
    // Custom Post Type per Certificati
    register_post_type('certificati', array(
        'labels' => array(
            'name' => __('Certificati', 'school-admin'),
            'singular_name' => __('Certificato', 'school-admin')
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'custom-fields'),
        'menu_icon' => 'dashicons-media-document'
    ));
    
    // Custom Post Type per Protocollo
    register_post_type('protocollo', array(
        'labels' => array(
            'name' => __('Protocollo', 'school-admin'),
            'singular_name' => __('Protocollo', 'school-admin')
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'custom-fields'),
        'menu_icon' => 'dashicons-clipboard'
    ));
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
}
add_action('add_meta_boxes', 'school_admin_add_meta_boxes');

// Callback per i dettagli dello studente
function studente_details_callback($post) {
    wp_nonce_field('save_studente_details', 'studente_details_nonce');
    
    $data_nascita = get_post_meta($post->ID, '_data_nascita', true);
    $classe = get_post_meta($post->ID, '_classe', true);
    $email = get_post_meta($post->ID, '_email', true);
    $telefono = get_post_meta($post->ID, '_telefono', true);
    
    echo '<p><label for="data_nascita">' . __('Data di nascita:', 'school-admin') . '</label><br>';
    echo '<input type="date" id="data_nascita" name="data_nascita" value="' . esc_attr($data_nascita) . '" class="widefat"></p>';
    
    echo '<p><label for="classe">' . __('Classe:', 'school-admin') . '</label><br>';
    echo '<input type="text" id="classe" name="classe" value="' . esc_attr($classe) . '" class="widefat"></p>';
    
    echo '<p><label for="email">' . __('Email:', 'school-admin') . '</label><br>';
    echo '<input type="email" id="email" name="email" value="' . esc_attr($email) . '" class="widefat"></p>';
    
    echo '<p><label for="telefono">' . __('Telefono:', 'school-admin') . '</label><br>';
    echo '<input type="text" id="telefono" name="telefono" value="' . esc_attr($telefono) . '" class="widefat"></p>';
}

// Callback per i dettagli del docente
function docente_details_callback($post) {
    wp_nonce_field('save_docente_details', 'docente_details_nonce');
    
    $data_nascita = get_post_meta($post->ID, '_data_nascita', true);
    $materia = get_post_meta($post->ID, '_materia', true);
    $email = get_post_meta($post->ID, '_email', true);
    $telefono = get_post_meta($post->ID, '_telefono', true);
    
    echo '<p><label for="data_nascita">' . __('Data di nascita:', 'school-admin') . '</label><br>';
    echo '<input type="date" id="data_nascita" name="data_nascita" value="' . esc_attr($data_nascita) . '" class="widefat"></p>';
    
    echo '<p><label for="materia">' . __('Materia:', 'school-admin') . '</label><br>';
    echo '<input type="text" id="materia" name="materia" value="' . esc_attr($materia) . '" class="widefat"></p>';
    
    echo '<p><label for="email">' . __('Email:', 'school-admin') . '</label><br>';
    echo '<input type="email" id="email" name="email" value="' . esc_attr($email) . '" class="widefat"></p>';
    
    echo '<p><label for="telefono">' . __('Telefono:', 'school-admin') . '</label><br>';
    echo '<input type="text" id="telefono" name="telefono" value="' . esc_attr($telefono) . '" class="widefat"></p>';
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
    
    if (isset($_POST['data_nascita'])) {
        update_post_meta($post_id, '_data_nascita', sanitize_text_field($_POST['data_nascita']));
    }
    
    if (isset($_POST['classe'])) {
        update_post_meta($post_id, '_classe', sanitize_text_field($_POST['classe']));
    }
    
    if (isset($_POST['email'])) {
        update_post_meta($post_id, '_email', sanitize_email($_POST['email']));
    }
    
    if (isset($_POST['telefono'])) {
        update_post_meta($post_id, '_telefono', sanitize_text_field($_POST['telefono']));
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
    
    if (isset($_POST['data_nascita'])) {
        update_post_meta($post_id, '_data_nascita', sanitize_text_field($_POST['data_nascita']));
    }
    
    if (isset($_POST['materia'])) {
        update_post_meta($post_id, '_materia', sanitize_text_field($_POST['materia']));
    }
    
    if (isset($_POST['email'])) {
        update_post_meta($post_id, '_email', sanitize_email($_POST['email']));
    }
    
    if (isset($_POST['telefono'])) {
        update_post_meta($post_id, '_telefono', sanitize_text_field($_POST['telefono']));
    }
}
add_action('save_post_docenti', 'save_docente_details');

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
