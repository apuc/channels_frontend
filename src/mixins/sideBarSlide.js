export default {
  mounted() {
    if (window.innerWidth < 768) {
      this.isSidebarVisible = false;
    }
  },
  data() {
    return {
      isSidebarVisible: true,
    }
  },
  methods: {
    $_sidebarSlide_showSidebar(e) {
      if (window.innerWidth < 768 && !this.isSidebarVisible) {
        this.isSidebarVisible = true;
      }
    },
    $_sidebarSlide_hideSidebar(e) {
      if (window.innerWidth < 768 && this.isSidebarVisible) {
        this.isSidebarVisible = false;
      }
    }
  }
}