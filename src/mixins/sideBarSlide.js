export default {
  mounted() {
    if (window.innerWidth < 992) {
      this.sidebarVisible = false;
    }
  },
  data() {
    return {
      sidebarVisible: true,
    }
  },
  methods: {
    $_sidebarSlide_showSidebar(e) {
      if (window.innerWidth < 992 && !this.sidebarVisible) {
        this.sidebarVisible = true;
      }
    },
    $_sidebarSlide_hideSidebar(e) {
      if (window.innerWidth < 992 && this.sidebarVisible) {
        this.sidebarVisible = false;
      }
    }
  }
}