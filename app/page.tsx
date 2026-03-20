'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const sections = [
  { id: 'section-1', label: '01', title: '소개' },
  { id: 'section-2', label: '02', title: '로그인/사이드바' },
  { id: 'section-3', label: '03', title: '언어/분석기록' },
  { id: 'section-4', label: '04', title: '기피재료/결과' },
  { id: 'section-5', label: '05', title: '분석 완료' }
] as const;

type DeviceShotProps = {
  title: string;
  src: string;
  alt: string;
  kind?: 'phone' | 'tablet';
};

function DeviceShot({ title, src, alt, kind = 'phone' }: DeviceShotProps) {
  const width = kind === 'phone' ? 420 : 1080;
  const height = kind === 'phone' ? 900 : 760;

  return (
    <article className="shot-card">
      <h3>{title}</h3>
      <div className={`device-frame ${kind}`}>
        {kind === 'phone' && <span className="device-notch" aria-hidden="true" />}
        <div className="device-screen">
          <Image src={src} alt={alt} width={width} height={height} className="screenshot" />
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('section-1');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      { threshold: [0.35, 0.6, 0.85] }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="page">
      <div className="bg-layer" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#section-1">
          SafePlate
        </a>
        <nav className="top-links" aria-label="상단 메뉴">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
        </nav>
      </header>

      <nav className="scroll-nav" aria-label="섹션 이동">
        {sections.map((section) => (
          <a
            key={section.id}
            className={`dot ${activeSection === section.id ? 'is-active' : ''}`}
            href={`#${section.id}`}
          >
            {section.label}
          </a>
        ))}
      </nav>

      <section className="panel" id="section-1">
        <div className="content hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">Flutter App Landing</p>
            <h1>SafePlate</h1>
            <p className="section-copy lead">
              알러지, 종교, 식습관에 따른 기피 재료를 반영해 메뉴판을 분석하고,
              더 안전한 메뉴 선택을 돕는 앱입니다.
            </p>
            <div className="summary-box">
              로그인 → 언어 설정 → 사이드바 탐색 → 기피재료 입력 → 메뉴 분석 결과
            </div>
            <ul className="feature-tags" aria-label="핵심 키워드">
              <li>Flutter</li>
              <li>Riverpod</li>
              <li>다국어 지원</li>
              <li>메뉴 이미지 분석</li>
            </ul>
            <div className="actions">
              <a
                className="btn primary"
                href="https://github.com/GDGoC-CAU-Team-9/frontend"
                target="_blank"
                rel="noreferrer"
              >
                GitHub 저장소 보기
              </a>
              <a className="btn ghost" href="#section-2">
                기능 화면 보기
              </a>
            </div>
          </div>
          <div className="hero-visual-wrap">
            <div className="device-frame phone hero-device">
              <span className="device-notch" aria-hidden="true" />
              <div className="device-screen logo-screen">
                <Image
                  src="/images/Logo_noText.png"
                  alt="SafePlate 앱 로고"
                  width={520}
                  height={520}
                  priority
                  className="logo-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel" id="section-2">
        <div className="content section-layout">
          <div className="section-head">
            <p className="eyebrow">Step 1</p>
            <h2>로그인과 사이드바</h2>
            <p className="section-copy">
              인증 후 바로 사이드바에서 홈, 분석 기록, 팀 화면으로 빠르게 이동해
              작업 흐름을 시작할 수 있습니다.
            </p>
          </div>
          <div className="frames-grid">
            <DeviceShot title="로그인 화면" src="/images/login.png" alt="SafePlate 로그인 화면" />
            <DeviceShot
              title="사이드바 화면"
              src="/images/sidebar.png"
              alt="SafePlate 사이드바 화면"
            />
          </div>
        </div>
      </section>

      <section className="panel" id="section-3">
        <div className="content section-layout">
          <div className="section-head">
            <p className="eyebrow">Step 2</p>
            <h2>언어 변경과 분석기록 화면</h2>
            <p className="section-copy">
              앱 언어를 팀/사용자 환경에 맞게 설정하고, 기존 분석 이력을 확인해
              빠르게 다음 분석을 이어갈 수 있습니다.
            </p>
          </div>
          <div className="frames-grid">
            <DeviceShot
              title="언어 변경 화면"
              src="/images/language.png"
              alt="SafePlate 언어 변경 화면"
            />
            <DeviceShot
              title="분석 기록 화면"
              src="/images/history.png"
              alt="SafePlate 분석 기록 화면"
            />
          </div>
        </div>
      </section>

      <section className="panel" id="section-4">
        <div className="content section-layout">
          <div className="section-head">
            <p className="eyebrow">Step 3</p>
            <h2>기피재료 입력과 분석 결과</h2>
            <p className="section-copy">
              개인 기준 기피재료를 입력한 뒤, 현재 메뉴판 분석 결과를 바로 확인해
              실제 주문 전 위험 메뉴를 빠르게 걸러낼 수 있습니다.
            </p>
          </div>
          <div className="frames-grid">
            <DeviceShot
              title="기피재료 입력 화면"
              src="/images/avoid.png"
              alt="SafePlate 기피재료 입력 화면"
            />
            <DeviceShot
              title="분석 결과 화면"
              src="/images/result.png"
              alt="SafePlate 메뉴 분석 결과 화면"
            />
          </div>
        </div>
      </section>

      <section className="panel" id="section-5">
        <div className="content section-layout">
          <div className="section-head">
            <p className="eyebrow">Step 4</p>
            <h2>분석 전 → 분석 후 자동 전환</h2>
            <p className="section-copy">
              검은 스캔 바가 왼쪽에서 오른쪽으로 이동하면서 분석 전 메뉴가 분석 후
              메뉴로 자연스럽게 바뀌는 과정을 보여줍니다.
            </p>
          </div>
          <div className="scan-card">
            <div className="scan-stage">
              <div className="scan-layer base">
                <Image
                  className="scan-image"
                  src="/images/menu_english.png"
                  alt="분석 전 영문 메뉴"
                  fill
                  sizes="(max-width: 900px) 94vw, 1020px"
                />
              </div>
              <div className="scan-layer after">
                <Image
                  className="scan-image"
                  src="/images/menu_english_result.png"
                  alt="분석 후 영문 메뉴"
                  fill
                  sizes="(max-width: 900px) 94vw, 1020px"
                />
              </div>
              <div className="scan-sheen" aria-hidden="true" />
              <div className="scan-bar" aria-hidden="true" />
            </div>
            <div className="scan-legend">
              <span>Before</span>
              <span>After</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
