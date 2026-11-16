// ============================================================
// script.js - 페이지를 "움직이게" 만드는 자바스크립트 파일
// (비유: HTML이 집의 뼈대, CSS가 인테리어라면, JavaScript는 전기 배선 같은 역할이에요)
// ============================================================

// 웹페이지가 완전히 준비되면 아래 코드를 실행하라는 약속
// (HTML이 다 그려지기 전에 버튼을 찾으면 못 찾을 수 있어서 이렇게 감싸요)
document.addEventListener('DOMContentLoaded', () => {

  // ----------------------------------------------------------
  // 1. 모바일 햄버거 메뉴 열기/닫기
  // ----------------------------------------------------------
  // HTML에서 id로 요소(버튼, 메뉴)를 찾아 변수에 담아둠
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  // 햄버거 버튼을 클릭하면 실행
  menuToggle.addEventListener('click', () => {
    // hidden 이름표를 붙였다 뗐다 하면 메뉴가 숨겨지거나 보임
    const isHidden = mobileMenu.classList.toggle('hidden');
    // 접근성(화면 읽기 도구)을 위해 "메뉴가 열려 있는지" 상태도 알려줌
    menuToggle.setAttribute('aria-expanded', String(!isHidden));
  });

  // 모바일 메뉴 안의 링크를 누르면 메뉴를 자동으로 닫음
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ----------------------------------------------------------
  // 2. 스크롤하면 요소가 서서히 나타나는 효과
  // ----------------------------------------------------------
  // IntersectionObserver: "이 요소가 화면에 보이기 시작했는지" 감시해주는 도구
  // (비유: 방 입구에 달린 센서등 - 사람이 들어오면 불이 켜짐)
  const revealItems = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // 요소가 화면에 들어왔을 때만 is-visible 이름표를 붙임
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // 한 번 나타난 요소는 더 이상 감시할 필요가 없으니 해제
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 } // 요소가 15% 이상 보이면 실행
  );

  revealItems.forEach((item) => observer.observe(item));

  // ----------------------------------------------------------
  // 3. 다크모드 전환 (선택한 모드는 브라우저에 저장)
  // ----------------------------------------------------------
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement; // <html> 태그를 가리킴

  // 저장된 설정이 있으면 그대로 적용 (새로고침해도 유지되도록)
  // localStorage: 브라우저 안에 작은 메모장을 두는 기능이에요
  // 기본은 다크모드. 사용자가 밝은 모드(light)를 골라 둔 경우에만 밝게 바꿈
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    root.classList.remove('dark');
  } else {
    root.classList.add('dark');
  }
  // 아이콘도 현재 모드에 맞게 설정
  themeToggle.textContent = root.classList.contains('dark') ? '☀️' : '🌙';

  // 다크모드 버튼 클릭 시 실행
  themeToggle.addEventListener('click', () => {
    // <html>에 dark 이름표를 붙였다 뗐다 함 -> Tailwind의 dark: 스타일이 켜졌다 꺼짐
    const isDark = root.classList.toggle('dark');
    // 선택 결과를 브라우저 메모장에 저장
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  });
});
