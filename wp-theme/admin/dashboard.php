
<?php
// Dashboard amministrativo personalizzato
if (!current_user_can('manage_options')) {
    wp_die(__('Non hai i permessi per accedere a questa pagina.', 'school-admin'));
}
?>

<div class="wrap school-admin-dashboard">
    <h1><?php _e('Dashboard Sistema Scolastico', 'school-admin'); ?></h1>
    
    <div class="admin-container grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <!-- Statistiche -->
        <div class="card">
            <h2 class="text-lg font-bold mb-4"><?php _e('Statistiche', 'school-admin'); ?></h2>
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-blue-100 p-4 rounded-lg text-center">
                    <p class="text-2xl font-bold text-blue-700">
                        <?php 
                        $students_count = wp_count_posts('studenti')->publish;
                        echo $students_count;
                        ?>
                    </p>
                    <p class="text-sm text-blue-700"><?php _e('Studenti', 'school-admin'); ?></p>
                </div>
                <div class="bg-green-100 p-4 rounded-lg text-center">
                    <p class="text-2xl font-bold text-green-700">
                        <?php 
                        $teachers_count = wp_count_posts('docenti')->publish;
                        echo $teachers_count;
                        ?>
                    </p>
                    <p class="text-sm text-green-700"><?php _e('Docenti', 'school-admin'); ?></p>
                </div>
                <div class="bg-yellow-100 p-4 rounded-lg text-center">
                    <p class="text-2xl font-bold text-yellow-700">
                        <?php 
                        $certificates_count = wp_count_posts('certificati')->publish;
                        echo $certificates_count;
                        ?>
                    </p>
                    <p class="text-sm text-yellow-700"><?php _e('Certificati', 'school-admin'); ?></p>
                </div>
                <div class="bg-purple-100 p-4 rounded-lg text-center">
                    <p class="text-2xl font-bold text-purple-700">
                        <?php 
                        $protocols_count = wp_count_posts('protocollo')->publish;
                        echo $protocols_count;
                        ?>
                    </p>
                    <p class="text-sm text-purple-700"><?php _e('Protocolli', 'school-admin'); ?></p>
                </div>
            </div>
        </div>
        
        <!-- Attività recenti -->
        <div class="card">
            <h2 class="text-lg font-bold mb-4"><?php _e('Attività Recenti', 'school-admin'); ?></h2>
            <ul class="space-y-2">
                <?php 
                $recent_posts = wp_get_recent_posts(array(
                    'numberposts' => 5,
                    'post_status' => 'publish'
                ));
                
                if ($recent_posts) :
                    foreach($recent_posts as $post) : 
                    ?>
                    <li class="pb-2 border-b border-gray-200">
                        <a href="<?php echo get_permalink($post['ID']); ?>" class="text-blue-600 hover:underline">
                            <?php echo $post['post_title']; ?>
                        </a>
                        <p class="text-xs text-gray-500">
                            <?php echo get_the_date('d M Y', $post['ID']); ?>
                        </p>
                    </li>
                    <?php 
                    endforeach;
                else :
                    echo '<li>'.__('Nessuna attività recente', 'school-admin').'</li>';
                endif;
                ?>
            </ul>
        </div>
        
        <!-- Azioni rapide -->
        <div class="card">
            <h2 class="text-lg font-bold mb-4"><?php _e('Azioni Rapide', 'school-admin'); ?></h2>
            <div class="grid grid-cols-1 gap-3">
                <a href="<?php echo admin_url('post-new.php?post_type=studenti'); ?>" class="button flex items-center justify-center p-3">
                    <i class="fas fa-user-graduate mr-2"></i> <?php _e('Nuovo Studente', 'school-admin'); ?>
                </a>
                <a href="<?php echo admin_url('post-new.php?post_type=docenti'); ?>" class="button flex items-center justify-center p-3">
                    <i class="fas fa-chalkboard-teacher mr-2"></i> <?php _e('Nuovo Docente', 'school-admin'); ?>
                </a>
                <a href="<?php echo admin_url('post-new.php?post_type=certificati'); ?>" class="button flex items-center justify-center p-3">
                    <i class="fas fa-certificate mr-2"></i> <?php _e('Nuovo Certificato', 'school-admin'); ?>
                </a>
                <a href="<?php echo admin_url('post-new.php?post_type=protocollo'); ?>" class="button flex items-center justify-center p-3">
                    <i class="fas fa-clipboard-list mr-2"></i> <?php _e('Nuovo Protocollo', 'school-admin'); ?>
                </a>
            </div>
        </div>
    </div>
</div>
