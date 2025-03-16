
<?php get_header(); ?>

<div class="container mx-auto p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 class="text-2xl font-bold mb-2 md:mb-0">Protocollo</h1>
        
        <div class="flex flex-col sm:flex-row gap-3">
            <div class="relative">
                <input type="text" placeholder="Cerca protocolli..." class="pl-10 pr-4 py-2 border rounded-md w-full">
                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            
            <a href="<?php echo admin_url('post-new.php?post_type=protocollo'); ?>" class="button inline-flex items-center justify-center">
                <i class="fas fa-plus mr-2"></i> Nuovo Protocollo
            </a>
        </div>
    </div>
    
    <div class="card">
        <div class="overflow-x-auto">
            <table class="min-w-full">
                <thead>
                    <tr>
                        <th>Numero</th>
                        <th>Oggetto</th>
                        <th>Data</th>
                        <th>Tipo</th>
                        <th>Mittente/Destinatario</th>
                        <th>Stato</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (have_posts()) : while (have_posts()) : the_post(); 
                        $numero = get_post_meta(get_the_ID(), '_numero', true);
                        $tipo = get_post_meta(get_the_ID(), '_tipo', true);
                        $mittente = get_post_meta(get_the_ID(), '_mittente', true);
                        $destinatario = get_post_meta(get_the_ID(), '_destinatario', true);
                        $stato = get_post_meta(get_the_ID(), '_stato', true);
                    ?>
                    <tr>
                        <td><?php echo $numero; ?></td>
                        <td>
                            <a href="<?php the_permalink(); ?>" class="font-medium text-blue-600 hover:underline">
                                <?php the_title(); ?>
                            </a>
                        </td>
                        <td><?php echo get_the_date('d/m/Y'); ?></td>
                        <td><?php echo $tipo == 'ingresso' ? 'Ingresso' : 'Uscita'; ?></td>
                        <td><?php echo $tipo == 'ingresso' ? $mittente : $destinatario; ?></td>
                        <td>
                            <?php if ($stato == 'approvato') : ?>
                                <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Approvato</span>
                            <?php elseif ($stato == 'respinto') : ?>
                                <span class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Respinto</span>
                            <?php else : ?>
                                <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">In attesa</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <div class="flex space-x-2">
                                <a href="<?php the_permalink(); ?>" class="text-blue-600 hover:underline">
                                    <i class="fas fa-eye"></i>
                                </a>
                                <a href="<?php echo get_edit_post_link(); ?>" class="text-yellow-600 hover:underline">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <a href="#" class="text-red-600 hover:underline">
                                    <i class="fas fa-trash"></i>
                                </a>
                            </div>
                        </td>
                    </tr>
                    <?php endwhile; else : ?>
                    <tr>
                        <td colspan="7" class="text-center py-4">Nessun protocollo trovato</td>
                    </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
        
        <div class="mt-4">
            <?php the_posts_pagination(array(
                'mid_size' => 2,
                'prev_text' => '<i class="fas fa-chevron-left"></i>',
                'next_text' => '<i class="fas fa-chevron-right"></i>',
                'before_page_number' => '<span class="px-2 py-1 mx-1 border rounded-md">',
                'after_page_number' => '</span>'
            )); ?>
        </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <!-- Statistiche Protocollo -->
        <div class="card">
            <h2 class="text-lg font-bold mb-4">Statistiche Protocollo</h2>
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-blue-100 p-4 rounded-lg text-center">
                    <p class="text-2xl font-bold text-blue-700">
                        <?php
                        $ingresso_count = new WP_Query(array(
                            'post_type' => 'protocollo',
                            'meta_key' => '_tipo',
                            'meta_value' => 'ingresso',
                            'posts_per_page' => -1
                        ));
                        echo $ingresso_count->found_posts;
                        ?>
                    </p>
                    <p class="text-sm text-blue-700">Protocolli in Ingresso</p>
                </div>
                <div class="bg-green-100 p-4 rounded-lg text-center">
                    <p class="text-2xl font-bold text-green-700">
                        <?php
                        $uscita_count = new WP_Query(array(
                            'post_type' => 'protocollo',
                            'meta_key' => '_tipo',
                            'meta_value' => 'uscita',
                            'posts_per_page' => -1
                        ));
                        echo $uscita_count->found_posts;
                        ?>
                    </p>
                    <p class="text-sm text-green-700">Protocolli in Uscita</p>
                </div>
                <div class="bg-yellow-100 p-4 rounded-lg text-center">
                    <p class="text-2xl font-bold text-yellow-700">
                        <?php
                        $attesa_count = new WP_Query(array(
                            'post_type' => 'protocollo',
                            'meta_key' => '_stato',
                            'meta_value' => 'attesa',
                            'posts_per_page' => -1
                        ));
                        echo $attesa_count->found_posts;
                        ?>
                    </p>
                    <p class="text-sm text-yellow-700">In Attesa</p>
                </div>
                <div class="bg-red-100 p-4 rounded-lg text-center">
                    <p class="text-2xl font-bold text-red-700">
                        <?php
                        $today_count = new WP_Query(array(
                            'post_type' => 'protocollo',
                            'date_query' => array(
                                array(
                                    'after' => date('Y-m-d', strtotime('-1 day')),
                                    'before' => date('Y-m-d', strtotime('+1 day')),
                                    'inclusive' => true,
                                ),
                            ),
                            'posts_per_page' => -1
                        ));
                        echo $today_count->found_posts;
                        ?>
                    </p>
                    <p class="text-sm text-red-700">Oggi</p>
                </div>
            </div>
        </div>
        
        <!-- Richieste di Approvazione -->
        <div class="card">
            <h2 class="text-lg font-bold mb-4">Richieste in Attesa di Approvazione</h2>
            <ul class="space-y-2">
                <?php 
                $attesa_protocolli = new WP_Query(array(
                    'post_type' => 'protocollo',
                    'meta_key' => '_stato',
                    'meta_value' => 'attesa',
                    'posts_per_page' => 5
                ));
                
                if ($attesa_protocolli->have_posts()) : 
                    while ($attesa_protocolli->have_posts()) : $attesa_protocolli->the_post(); 
                ?>
                <li class="p-3 border rounded flex items-center justify-between">
                    <div>
                        <a href="<?php the_permalink(); ?>" class="font-medium text-blue-600 hover:underline">
                            <?php the_title(); ?>
                        </a>
                        <p class="text-xs text-gray-500">
                            <?php echo get_the_date('d/m/Y'); ?> - <?php echo get_post_meta(get_the_ID(), '_tipo', true) == 'ingresso' ? 'Ingresso' : 'Uscita'; ?>
                        </p>
                    </div>
                    <div class="flex space-x-1">
                        <button class="px-2 py-1 bg-green-500 text-white rounded text-sm">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="px-2 py-1 bg-red-500 text-white rounded text-sm">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </li>
                <?php 
                    endwhile;
                    wp_reset_postdata();
                else : 
                ?>
                <li class="py-4 text-center text-gray-500">
                    Nessuna richiesta in attesa
                </li>
                <?php endif; ?>
            </ul>
        </div>
    </div>
</div>

<?php get_footer(); ?>
