// Component Loader - Dynamically loads shared components
class ComponentLoader {
    static async loadComponent(componentPath, containerId) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${response.status}`);
            }
            const html = await response.text();
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = html;
            }
        } catch (error) {
            console.error('Error loading component:', error);
            // Fallback: create a basic navigation if component loading fails
            if (containerId === 'navigation-container') {
                this.createFallbackNavigation(containerId);
            }
        }
    }

    static createFallbackNavigation(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <nav class="fixed w-full z-50 glass-effect">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between h-16">
                        <div class="flex items-center">
                            <div class="text-2xl font-bold text-white">Arcaea Wiki</div>
                            <div class="hidden md:block ml-10">
                                <div class="flex items-baseline space-x-4 text-lg">
                                    <a href="index.html" class="nav-link">主页</a>
                                    <a href="layout.html" class="nav-link">界面</a>
                                    <a href="gameplay.html" class="nav-link">游戏玩法</a>
                                    <a href="version-updates.html" class="nav-link">版本更新</a>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div class="relative">
                                <input type="text" placeholder="搜索..." class="search-box w-64 text-lg">
                                <i class="fas fa-search absolute right-4 top-1/2 transform -translate-y-1/2 text-white opacity-70"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }

    static async loadAllComponents() {
        // Load navigation
        await this.loadComponent('components/navigation.html', 'navigation-container');
        
        // Load footer
        await this.loadComponent('components/footer.html', 'footer-container');
    }
}

// Auto-load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    ComponentLoader.loadAllComponents();
});

// Export for manual use
window.ComponentLoader = ComponentLoader;
