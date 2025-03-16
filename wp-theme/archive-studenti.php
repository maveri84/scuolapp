
<?php get_header(); ?>

<div class="container mx-auto p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 class="text-2xl font-bold mb-2 md:mb-0">Studenti</h1>
        
        <div class="flex flex-col sm:flex-row gap-3">
            <div class="relative">
                <input type="text" placeholder="Cerca studenti..." class="pl-10 pr-4 py-2 border rounded-md w-full">
                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            
            <a href="<?php echo admin_url('post-new.php?post_type=studenti'); ?>" class="button inline-flex items-center justify-center">
                <i class="fas fa-plus mr-2"></i> Nuovo Studente
            </a>
        </div>
    </div>
    
    <div class="card">
        <div class="overflow-x-auto">
            <table class="min-w-full">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Classe</th>
                        <th>Email</th>
                        <th>Telefono</th>
                        <th>Data Iscrizione</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (have_posts()) : while (have_posts()) : the_post(); 
                        $classe = get_post_meta(get_the_ID(), '_classe', true);
                        $email = get_post_meta(get_the_ID(), '_email', true);
                        $telefono = get_post_meta(get_the_ID(), '_telefono', true);
                    ?>
                    <tr>
                        <td>
                            <div class="flex items-center">
                                <?php if (has_post_thumbnail()) : ?>
                                    <img src="<?php the_post_thumbnail_url('thumbnail'); ?>" alt="<?php the_title(); ?>" class="w-8 h-8 rounded-full mr-2">
                                <?php else : ?>
                                    <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                                        <i class="fas fa-user text-gray-400"></i>
                                    </div>
                                <?php endif; ?>
                                <a href="<?php the_permalink(); ?>" class="font-medium text-blue-600 hover:underline">
                                    <?php the_title(); ?>
                                </a>
                            </div>
                        </td>
                        <td><?php echo $classe; ?></td>
                        <td><?php echo $email; ?></td>
                        <td><?php echo $telefono; ?></td>
                        <td><?php echo get_the_date('d/m/Y'); ?></td>
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
                        <td colspan="6" class="text-center py-4">Nessuno studente trovato</td>
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
