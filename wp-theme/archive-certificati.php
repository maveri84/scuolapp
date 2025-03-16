
<?php get_header(); ?>

<div class="container mx-auto p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 class="text-2xl font-bold mb-2 md:mb-0">Certificati</h1>
        
        <div class="flex flex-col sm:flex-row gap-3">
            <div class="relative">
                <input type="text" placeholder="Cerca certificati..." class="pl-10 pr-4 py-2 border rounded-md w-full">
                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            
            <a href="<?php echo admin_url('post-new.php?post_type=certificati'); ?>" class="button inline-flex items-center justify-center">
                <i class="fas fa-plus mr-2"></i> Nuovo Certificato
            </a>
        </div>
    </div>
    
    <div class="card mb-6">
        <h2 class="text-lg font-bold mb-4">Modelli di Certificati</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div class="border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                <div class="text-center">
                    <i class="fas fa-file-alt text-blue-500 text-3xl mb-2"></i>
                    <h3 class="font-medium">Certificato di Iscrizione</h3>
                    <p class="text-sm text-gray-500">Per studenti</p>
                </div>
            </div>
            <div class="border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                <div class="text-center">
                    <i class="fas fa-file-alt text-green-500 text-3xl mb-2"></i>
                    <h3 class="font-medium">Certificato di Frequenza</h3>
                    <p class="text-sm text-gray-500">Per studenti</p>
                </div>
            </div>
            <div class="border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                <div class="text-center">
                    <i class="fas fa-file-alt text-red-500 text-3xl mb-2"></i>
                    <h3 class="font-medium">Certificato di Servizio</h3>
                    <p class="text-sm text-gray-500">Per docenti</p>
                </div>
            </div>
            <div class="border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                <div class="text-center">
                    <i class="fas fa-file-alt text-purple-500 text-3xl mb-2"></i>
                    <h3 class="font-medium">Nulla Osta</h3>
                    <p class="text-sm text-gray-500">Per studenti</p>
                </div>
            </div>
        </div>
    </div>
    
    <div class="card">
        <h2 class="text-lg font-bold mb-4">Certificati Generati</h2>
        <div class="overflow-x-auto">
            <table class="min-w-full">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Data</th>
                        <th>Destinatario</th>
                        <th>Stato</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (have_posts()) : while (have_posts()) : the_post(); 
                        $tipo = get_post_meta(get_the_ID(), '_tipo', true);
                        $destinatario = get_post_meta(get_the_ID(), '_destinatario', true);
                        $stato = get_post_meta(get_the_ID(), '_stato', true);
                    ?>
                    <tr>
                        <td>
                            <a href="<?php the_permalink(); ?>" class="font-medium text-blue-600 hover:underline">
                                <?php the_title(); ?>
                            </a>
                        </td>
                        <td><?php echo $tipo; ?></td>
                        <td><?php echo get_the_date('d/m/Y'); ?></td>
                        <td><?php echo $destinatario; ?></td>
                        <td>
                            <?php if ($stato == 'firmato') : ?>
                                <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Firmato</span>
                            <?php elseif ($stato == 'inviato') : ?>
                                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Inviato</span>
                            <?php else : ?>
                                <span class="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Bozza</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <div class="flex space-x-2">
                                <a href="<?php echo wp_get_attachment_url(get_post_meta(get_the_ID(), '_file', true)); ?>" target="_blank" class="text-blue-600 hover:underline">
                                    <i class="fas fa-download"></i>
                                </a>
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
                        <td colspan="6" class="text-center py-4">Nessun certificato trovato</td>
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
</div>

<?php get_footer(); ?>
