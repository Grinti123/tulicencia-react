<?php
// Get user data from session
$userData = isset($_SESSION['user']) ? json_decode($_SESSION['user'], true) : null;

// You would typically fetch procedures from your database here
$procedures = []; // Placeholder for procedures data
?>
<div class="p-6 bg-gradient-to-br from-[#e8f8ee] via-white to-[#e8f8ee] rounded-lg shadow-lg w-full">
<div class="space-y-6">
    <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-800">My Procedures</h2>
        <a href="?page=new-procedure" class="inline-flex items-center px-4 py-2 bg-[#1a602d] text-white rounded-lg hover:bg-[#144823] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            New Procedure
        </a>
    </div>

    <?php if (empty($procedures)): ?>
    <div class="text-center py-12">
        <div class="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No procedures yet</h3>
        <p class="text-gray-500 mb-6">Start by creating a new procedure</p>
        <a href="?page=new-procedure" class="inline-flex items-center px-4 py-2 bg-[#1a602d] text-white rounded-lg hover:bg-[#144823] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Create Your First Procedure
        </a>
    </div>
    <?php else: ?>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <?php foreach ($procedures as $procedure): ?>
        <div class="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                    <div class="h-10 w-10 rounded-full bg-[#e8f8ee] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#1a602d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <h3 class="text-lg font-medium text-gray-900"><?php echo htmlspecialchars($procedure['title'] ?? ''); ?></h3>
                        <p class="text-sm text-gray-500"><?php echo htmlspecialchars($procedure['status'] ?? ''); ?></p>
                    </div>
                </div>
            </div>
            <div class="space-y-2">
                <div class="flex justify-between text-sm">
                    <span class="text-gray-500">Created:</span>
                    <span class="text-gray-900"><?php echo htmlspecialchars($procedure['created_at'] ?? ''); ?></span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-500">Last Updated:</span>
                    <span class="text-gray-900"><?php echo htmlspecialchars($procedure['updated_at'] ?? ''); ?></span>
                </div>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-200">
                <a href="?page=procedure-details&id=<?php echo htmlspecialchars($procedure['id'] ?? ''); ?>" class="inline-flex items-center text-[#1a602d] hover:text-[#144823]">
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
    <?php endif; ?>
</div> 
</div>