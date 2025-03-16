
<?php get_header(); ?>

<div class="container mx-auto p-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Card Statistiche -->
        <div class="card">
            <h2 class="text-lg font-bold mb-4">Statistiche</h2>
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-blue-100 p-4 rounded-lg text-center">
                    <p class="text-2xl font-bold text-blue-700">
                        <?php 
                        $students_count = wp_count_posts('studenti')->publish;
                        echo $students_count;
                        ?>
                    </p>
                    <p class="text-sm text-blue-700">Studenti</p>
                </div>
                <div class="bg-green-100 p-4 rounded-lg text-center">
                    <p class="text-2xl font-bold text-green-700">
                        <?php 
                        $teachers_count = wp_count_posts('docenti')->publish;
                        echo $teachers_count;
                        ?>
                    </p>
                    <p class="text-sm text-green-700">Docenti</p>
                </div>
                <div class="bg-yellow-100 p-4 rounded-lg text-center">
                    <p class="text-2xl font-bold text-yellow-700">
                        <?php 
                        $certificates_count = wp_count_posts('certificati')->publish;
                        echo $certificates_count;
                        ?>
                    </p>
                    <p class="text-sm text-yellow-700">Certificati</p>
                </div>
                <div class="bg-purple-100 p-4 rounded-lg text-center">
                    <p class="text-2xl font-bold text-purple-700">
                        <?php 
                        $protocols_count = wp_count_posts('protocollo')->publish;
                        echo $protocols_count;
                        ?>
                    </p>
                    <p class="text-sm text-purple-700">Protocolli</p>
                </div>
            </div>
        </div>
        
        <!-- Card Attività Recenti -->
        <div class="card">
            <h2 class="text-lg font-bold mb-4">Attività Recenti</h2>
            <ul class="space-y-2">
                <?php 
                $recent_posts = wp_get_recent_posts(array(
                    'numberposts' => 5,
                    'post_status' => 'publish'
                ));
                
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
                <?php endforeach; ?>
            </ul>
        </div>
        
        <!-- Card Collegamenti Rapidi -->
        <div class="card">
            <h2 class="text-lg font-bold mb-4">Collegamenti Rapidi</h2>
            <div class="grid grid-cols-2 gap-3">
                <a href="<?php echo home_url('/studenti'); ?>" class="button flex items-center justify-center p-3">
                    <i class="fas fa-user-graduate mr-2"></i> Studenti
                </a>
                <a href="<?php echo home_url('/docenti'); ?>" class="button flex items-center justify-center p-3">
                    <i class="fas fa-chalkboard-teacher mr-2"></i> Docenti
                </a>
                <a href="<?php echo home_url('/certificati'); ?>" class="button flex items-center justify-center p-3">
                    <i class="fas fa-certificate mr-2"></i> Certificati
                </a>
                <a href="<?php echo home_url('/protocollo'); ?>" class="button flex items-center justify-center p-3">
                    <i class="fas fa-clipboard-list mr-2"></i> Protocollo
                </a>
            </div>
        </div>
    </div>
    
    <!-- Ultimi studenti aggiunti -->
    <div class="card mt-6">
        <h2 class="text-lg font-bold mb-4">Ultimi Studenti Aggiunti</h2>
        <div class="overflow-x-auto">
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Classe</th>
                        <th>Email</th>
                        <th>Data Iscrizione</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $students = get_posts(array(
                        'post_type' => 'studenti',
                        'posts_per_page' => 5,
                        'orderby' => 'date',
                        'order' => 'DESC'
                    ));
                    
                    if ($students) :
                        foreach ($students as $student) :
                            $classe = get_post_meta($student->ID, '_classe', true);
                            $email = get_post_meta($student->ID, '_email', true);
                    ?>
                    <tr>
                        <td><?php echo $student->post_title; ?></td>
                        <td><?php echo $classe; ?></td>
                        <td><?php echo $email; ?></td>
                        <td><?php echo get_the_date('d/m/Y', $student->ID); ?></td>
                        <td>
                            <a href="<?php echo get_permalink($student->ID); ?>" class="text-blue-600 hover:underline">
                                <i class="fas fa-eye"></i> Visualizza
                            </a>
                        </td>
                    </tr>
                    <?php
                        endforeach;
                    else :
                    ?>
                    <tr>
                        <td colspan="5" class="text-center py-4">Nessuno studente trovato</td>
                    </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<?php get_footer(); ?>
