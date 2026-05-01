const pptxgen = require('pptxgenjs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const sharp = require('sharp');

// Icon imports
const {
  FaGithub,
  FaRocket,
  FaCheckCircle,
  FaCog,
  FaCloudUploadAlt,
  FaEnvelope,
  FaCode,
  FaSync,
  FaKey,
  FaFileAlt,
  FaArrowRight,
  FaBolt,
} = require('react-icons/fa');
const { MdBuild, MdAutorenew, MdOpenInNew } = require('react-icons/md');

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) }),
  );
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return 'image/png;base64,' + pngBuffer.toString('base64');
}

async function main() {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  pres.title = 'CI/CD Automation with GitHub Actions';

  // Color Palette — Dark Navy + Electric Blue + White
  const C = {
    navy: '0A1628',
    navyMid: '0D2240',
    blue: '1D6FA4',
    blueLight: '2E9BD6',
    accent: '00C6FF',
    white: 'FFFFFF',
    offWhite: 'E8F4FD',
    muted: '8EB4CC',
    green: '00C896',
    orange: 'FF8C42',
    red: 'FF4F5E',
    gray: '1E3A52',
  };

  // ─── SLIDE 1: Title ───────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    // Top accent bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 10,
      h: 0.08,
      fill: { color: C.accent },
      line: { color: C.accent },
    });

    // GitHub icon
    const ghIcon = await iconToBase64Png(FaGithub, '#00C6FF', 512);
    s.addImage({ data: ghIcon, x: 4.4, y: 0.7, w: 1.2, h: 1.2 });

    // Title
    s.addText('CI/CD Pipeline Automation', {
      x: 0.5,
      y: 2.0,
      w: 9,
      h: 1.1,
      fontSize: 40,
      bold: true,
      color: C.white,
      align: 'center',
      fontFace: 'Calibri',
      margin: 0,
    });

    s.addText('with GitHub Actions', {
      x: 0.5,
      y: 3.05,
      w: 9,
      h: 0.7,
      fontSize: 26,
      bold: false,
      color: C.accent,
      align: 'center',
      fontFace: 'Calibri',
      margin: 0,
    });

    s.addText('From Manual Builds to Full Automation', {
      x: 1.5,
      y: 3.85,
      w: 7,
      h: 0.5,
      fontSize: 14,
      color: C.muted,
      align: 'center',
      fontFace: 'Calibri',
      margin: 0,
    });

    // Bottom decorative dots
    for (let i = 0; i < 5; i++) {
      s.addShape(pres.shapes.OVAL, {
        x: 4.5 + i * 0.22,
        y: 5.1,
        w: 0.1,
        h: 0.1,
        fill: { color: i === 0 ? C.accent : C.blue },
        line: { color: 'transparent' },
      });
    }
  }

  // ─── SLIDE 2: The Problem (Old Process) ───────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 10,
      h: 0.08,
      fill: { color: C.red },
      line: { color: C.red },
    });

    s.addText('The Problem', {
      x: 0.5,
      y: 0.25,
      w: 9,
      h: 0.6,
      fontSize: 30,
      bold: true,
      color: C.white,
      fontFace: 'Calibri',
      margin: 0,
    });
    s.addText('Our old manual process — slow, error-prone, and repetitive', {
      x: 0.5,
      y: 0.82,
      w: 9,
      h: 0.4,
      fontSize: 14,
      color: C.muted,
      fontFace: 'Calibri',
      margin: 0,
    });

    const steps = [
      {
        icon: FaCode,
        color: C.red,
        title: 'Manual Code Update',
        desc: 'Copy updated code from local repo into .aip project & set all paths manually every time',
      },
      {
        icon: MdBuild,
        color: C.orange,
        title: 'Local Build Creation',
        desc: 'Trigger build on local machine using Advanced Installer — no consistency, no tracking',
      },
      {
        icon: FaCloudUploadAlt,
        color: C.blue,
        title: 'SharePoint Upload',
        desc: 'Manually upload the .exe file to SharePoint and grab the downloadable link',
      },
      {
        icon: FaFileAlt,
        color: C.muted,
        title: 'Coda Card Creation',
        desc: 'Manually create a card on Coda, paste the SharePoint link — for EACH release',
      },
      {
        icon: FaEnvelope,
        color: C.green,
        title: 'Email Notification',
        desc: 'Manually write and send notification emails to stakeholders every single time',
      },
    ];

    const cols = [0.3, 5.2];
    steps.forEach(async (step, i) => {
      const col = cols[i % 2];
      const row = i < 2 ? 0 : i < 4 ? 1 : 2;
      const x = col;
      const y = 1.45 + row * 1.28;
      const w = 4.5;

      // Card bg
      s.addShape(pres.shapes.RECTANGLE, {
        x,
        y,
        w,
        h: 1.1,
        fill: { color: C.navyMid },
        line: { color: step.color, width: 1.2 },
        shadow: {
          type: 'outer',
          blur: 6,
          offset: 2,
          angle: 135,
          color: '000000',
          opacity: 0.25,
        },
      });
      // Left accent
      s.addShape(pres.shapes.RECTANGLE, {
        x,
        y,
        w: 0.06,
        h: 1.1,
        fill: { color: step.color },
        line: { color: step.color },
      });

      const iconData = await iconToBase64Png(step.icon, '#' + step.color, 256);
      s.addImage({
        data: iconData,
        x: x + 0.15,
        y: y + 0.28,
        w: 0.45,
        h: 0.45,
      });

      s.addText(`${i + 1}. ${step.title}`, {
        x: x + 0.7,
        y: y + 0.1,
        w: w - 0.8,
        h: 0.35,
        fontSize: 12,
        bold: true,
        color: C.white,
        fontFace: 'Calibri',
        margin: 0,
      });
      s.addText(step.desc, {
        x: x + 0.7,
        y: y + 0.45,
        w: w - 0.8,
        h: 0.58,
        fontSize: 10,
        color: C.muted,
        fontFace: 'Calibri',
        margin: 0,
      });

      // Step 5 is centered (last one, single card)
      if (i === 4) {
        // reposition last card to center
      }
    });

    // Center card 5
    // Override step 5 position with centered layout
    const step5 = steps[4];
    const cx = 2.75,
      cy = 4.0,
      cw = 4.5;
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx,
      y: cy,
      w: cw,
      h: 1.1,
      fill: { color: C.navyMid },
      line: { color: C.green, width: 1.2 },
      shadow: {
        type: 'outer',
        blur: 6,
        offset: 2,
        angle: 135,
        color: '000000',
        opacity: 0.25,
      },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx,
      y: cy,
      w: 0.06,
      h: 1.1,
      fill: { color: C.green },
      line: { color: C.green },
    });
    const icon5 = await iconToBase64Png(FaEnvelope, '#' + C.green, 256);
    s.addImage({ data: icon5, x: cx + 0.15, y: cy + 0.28, w: 0.45, h: 0.45 });
    s.addText('5. Email Notification', {
      x: cx + 0.7,
      y: cy + 0.1,
      w: cw - 0.8,
      h: 0.35,
      fontSize: 12,
      bold: true,
      color: C.white,
      fontFace: 'Calibri',
      margin: 0,
    });
    s.addText(
      'Manually write and send notification emails to stakeholders every single time',
      {
        x: cx + 0.7,
        y: cy + 0.45,
        w: cw - 0.8,
        h: 0.58,
        fontSize: 10,
        color: C.muted,
        fontFace: 'Calibri',
        margin: 0,
      },
    );
  }

  // ─── SLIDE 3: The Solution Overview ──────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 10,
      h: 0.08,
      fill: { color: C.green },
      line: { color: C.green },
    });

    s.addText('The Solution', {
      x: 0.5,
      y: 0.25,
      w: 9,
      h: 0.6,
      fontSize: 30,
      bold: true,
      color: C.white,
      fontFace: 'Calibri',
      margin: 0,
    });
    s.addText('End-to-end automation using GitHub Actions', {
      x: 0.5,
      y: 0.82,
      w: 9,
      h: 0.4,
      fontSize: 14,
      color: C.muted,
      fontFace: 'Calibri',
      margin: 0,
    });

    // Big stat boxes
    const stats = [
      { val: '2', label: 'Apps Automated' },
      { val: '0', label: 'Manual Steps' },
      { val: '1hr', label: 'Coda Sync Interval' },
      { val: '100%', label: 'Auto Email on Release' },
    ];
    stats.forEach((st, i) => {
      const x = 0.4 + i * 2.3;
      s.addShape(pres.shapes.RECTANGLE, {
        x,
        y: 1.45,
        w: 2.0,
        h: 1.3,
        fill: { color: C.navyMid },
        line: { color: C.accent, width: 1.2 },
        shadow: {
          type: 'outer',
          blur: 8,
          offset: 2,
          angle: 135,
          color: '000000',
          opacity: 0.3,
        },
      });
      s.addText(st.val, {
        x,
        y: 1.55,
        w: 2.0,
        h: 0.7,
        fontSize: 36,
        bold: true,
        color: C.accent,
        align: 'center',
        fontFace: 'Calibri',
        margin: 0,
      });
      s.addText(st.label, {
        x,
        y: 2.2,
        w: 2.0,
        h: 0.45,
        fontSize: 11,
        color: C.muted,
        align: 'center',
        fontFace: 'Calibri',
        margin: 0,
      });
    });

    // Flow diagram
    const flow = [
      { label: 'Code Push\n/ Trigger', color: C.blue },
      { label: 'Build on\nGH Runner', color: C.blueLight },
      { label: 'GitHub\nRelease', color: C.accent },
      { label: 'Coda Card\nCreated', color: C.green },
      { label: 'Email\nSent', color: C.orange },
    ];

    flow.forEach(async (f, i) => {
      const x = 0.4 + i * 1.85;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x,
        y: 3.05,
        w: 1.55,
        h: 0.85,
        fill: { color: f.color },
        line: { color: f.color },
        rectRadius: 0.12,
      });
      s.addText(f.label, {
        x,
        y: 3.05,
        w: 1.55,
        h: 0.85,
        fontSize: 10,
        bold: true,
        color: C.navy,
        align: 'center',
        valign: 'middle',
        fontFace: 'Calibri',
        margin: 0,
      });
      if (i < flow.length - 1) {
        const arrowIcon = await iconToBase64Png(
          FaArrowRight,
          '#' + C.muted,
          128,
        );
        s.addImage({ data: arrowIcon, x: x + 1.6, y: 3.25, w: 0.22, h: 0.22 });
      }
    });

    s.addText('Every step runs automatically — triggered by a single commit', {
      x: 1,
      y: 4.1,
      w: 8,
      h: 0.4,
      fontSize: 13,
      color: C.muted,
      align: 'center',
      italic: true,
      fontFace: 'Calibri',
      margin: 0,
    });

    // Key wins
    const wins = [
      'No more local builds',
      'No SharePoint uploads',
      'No manual Coda cards',
      'No manual emails',
    ];
    wins.forEach(async (w, i) => {
      const x = 0.5 + i * 2.35;
      const checkIcon = await iconToBase64Png(
        FaCheckCircle,
        '#' + C.green,
        128,
      );
      s.addImage({ data: checkIcon, x, y: 4.7, w: 0.25, h: 0.25 });
      s.addText(w, {
        x: x + 0.32,
        y: 4.68,
        w: 1.95,
        h: 0.3,
        fontSize: 11,
        color: C.white,
        fontFace: 'Calibri',
        margin: 0,
      });
    });
  }

  // ─── SLIDE 4: Phase 1 — Setup & Testing ──────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 10,
      h: 0.08,
      fill: { color: C.blue },
      line: { color: C.blue },
    });

    // Phase badge
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5,
      y: 0.2,
      w: 1.4,
      h: 0.42,
      fill: { color: C.blue },
      line: { color: C.blue },
      rectRadius: 0.08,
    });
    s.addText('PHASE 1', {
      x: 0.5,
      y: 0.2,
      w: 1.4,
      h: 0.42,
      fontSize: 11,
      bold: true,
      color: C.white,
      align: 'center',
      valign: 'middle',
      fontFace: 'Calibri',
      margin: 0,
    });

    s.addText('Setup & Validation', {
      x: 2.1,
      y: 0.22,
      w: 7.5,
      h: 0.45,
      fontSize: 26,
      bold: true,
      color: C.white,
      fontFace: 'Calibri',
      margin: 0,
    });

    const items = [
      {
        icon: FaKey,
        color: C.orange,
        title: 'License Key Verification',
        body: 'Validated that the Advanced Installer license key was active and functional inside the GitHub Actions runner environment — a critical first gate.',
      },
      {
        icon: FaFileAlt,
        color: C.blueLight,
        title: 'Temporary Certificate Creation',
        body: 'Generated a self-signed certificate within the workflow so the .aip project could sign the build successfully without requiring a physical machine.',
      },
      {
        icon: FaCode,
        color: C.accent,
        title: 'Shell Build (No Node Modules)',
        body: 'Created a minimal "shell" build first — stripping out node_modules and heavy dependencies to confirm the pipeline structure worked before adding complexity.',
      },
      {
        icon: MdBuild,
        color: C.green,
        title: 'Test Builds with npm install',
        body: 'Ran full test builds including npm install inside the workflow to validate the complete dependency chain and identify any path or environment issues.',
      },
    ];

    items.forEach(async (item, i) => {
      const col = i % 2 === 0 ? 0.4 : 5.2;
      const row = Math.floor(i / 2);
      const x = col,
        y = 1.0 + row * 2.05,
        w = 4.35,
        h = 1.85;

      s.addShape(pres.shapes.RECTANGLE, {
        x,
        y,
        w,
        h,
        fill: { color: C.navyMid },
        line: { color: item.color, width: 1.2 },
        shadow: {
          type: 'outer',
          blur: 6,
          offset: 2,
          angle: 135,
          color: '000000',
          opacity: 0.2,
        },
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x,
        y,
        w: 0.06,
        h,
        fill: { color: item.color },
        line: { color: item.color },
      });

      const iconData = await iconToBase64Png(item.icon, '#' + item.color, 256);
      s.addImage({ data: iconData, x: x + 0.18, y: y + 0.18, w: 0.5, h: 0.5 });

      s.addText(item.title, {
        x: x + 0.8,
        y: y + 0.15,
        w: w - 0.95,
        h: 0.4,
        fontSize: 13,
        bold: true,
        color: C.white,
        fontFace: 'Calibri',
        margin: 0,
      });
      s.addText(item.body, {
        x: x + 0.18,
        y: y + 0.75,
        w: w - 0.35,
        h: 1.0,
        fontSize: 11,
        color: C.muted,
        fontFace: 'Calibri',
        margin: 0,
      });
    });
  }

  // ─── SLIDE 5: Phase 2 — Version Management & Auto-PR ─────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 10,
      h: 0.08,
      fill: { color: C.blueLight },
      line: { color: C.blueLight },
    });

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5,
      y: 0.2,
      w: 1.4,
      h: 0.42,
      fill: { color: C.blueLight },
      line: { color: C.blueLight },
      rectRadius: 0.08,
    });
    s.addText('PHASE 2', {
      x: 0.5,
      y: 0.2,
      w: 1.4,
      h: 0.42,
      fontSize: 11,
      bold: true,
      color: C.white,
      align: 'center',
      valign: 'middle',
      fontFace: 'Calibri',
      margin: 0,
    });

    s.addText('Version Management & Auto-Merge PR', {
      x: 2.1,
      y: 0.22,
      w: 7.5,
      h: 0.45,
      fontSize: 22,
      bold: true,
      color: C.white,
      fontFace: 'Calibri',
      margin: 0,
    });

    // Left: explanation
    s.addText('The Challenge', {
      x: 0.4,
      y: 0.9,
      w: 4.5,
      h: 0.4,
      fontSize: 15,
      bold: true,
      color: C.orange,
      fontFace: 'Calibri',
      margin: 0,
    });
    s.addText(
      'Every build needed its version and release number updated in the .aip project AND synced back into the repository. Doing this manually would break the automation chain.',
      {
        x: 0.4,
        y: 1.32,
        w: 4.5,
        h: 1.0,
        fontSize: 12,
        color: C.muted,
        fontFace: 'Calibri',
        margin: 0,
      },
    );

    s.addText('The Solution', {
      x: 0.4,
      y: 2.4,
      w: 4.5,
      h: 0.4,
      fontSize: 15,
      bold: true,
      color: C.green,
      fontFace: 'Calibri',
      margin: 0,
    });
    s.addText(
      'Granted GitHub Actions bot admin credentials and generated a PAT token. The bot now automatically bumps the version and syncs it back to the repo.',
      {
        x: 0.4,
        y: 2.82,
        w: 4.5,
        h: 0.9,
        fontSize: 12,
        color: C.muted,
        fontFace: 'Calibri',
        margin: 0,
      },
    );

    // Right: Flow diagram
    const flowSteps = [
      { label: 'Workflow triggered', color: C.blue },
      { label: 'Bot creates temp branch', color: C.blueLight },
      { label: 'Version bumped in repo', color: C.accent },
      { label: 'Pull Request auto-created', color: C.green },
      { label: 'PR auto-merged ✓', color: C.green },
    ];

    flowSteps.forEach(async (f, i) => {
      const y = 1.0 + i * 0.85;
      s.addShape(pres.shapes.RECTANGLE, {
        x: 5.5,
        y,
        w: 4.0,
        h: 0.6,
        fill: { color: C.navyMid },
        line: { color: f.color, width: 1.2 },
        shadow: {
          type: 'outer',
          blur: 4,
          offset: 2,
          angle: 135,
          color: '000000',
          opacity: 0.2,
        },
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 5.5,
        y,
        w: 0.06,
        h: 0.6,
        fill: { color: f.color },
        line: { color: f.color },
      });
      s.addText(`${i + 1}.  ${f.label}`, {
        x: 5.65,
        y,
        w: 3.8,
        h: 0.6,
        fontSize: 12,
        color: C.white,
        valign: 'middle',
        fontFace: 'Calibri',
        margin: 0,
      });

      if (i < flowSteps.length - 1) {
        s.addShape(pres.shapes.LINE, {
          x: 7.4,
          y: y + 0.6,
          w: 0,
          h: 0.25,
          line: { color: C.muted, width: 1.5, dashType: 'dash' },
        });
      }
    });

    // Token note
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.4,
      y: 3.85,
      w: 4.5,
      h: 0.85,
      fill: { color: C.gray },
      line: { color: C.accent, width: 1 },
    });
    const keyIcon = await iconToBase64Png(FaKey, '#' + C.accent, 128);
    s.addImage({ data: keyIcon, x: 0.6, y: 4.02, w: 0.35, h: 0.35 });
    s.addText(
      'Admin token scoped to GitHub Actions[bot] only — secure, auditable, and revocable at any time.',
      {
        x: 1.1,
        y: 3.9,
        w: 3.65,
        h: 0.75,
        fontSize: 10,
        color: C.offWhite,
        fontFace: 'Calibri',
        margin: 0,
      },
    );
  }

  // ─── SLIDE 6: Phase 3 — Artifacts → GitHub Releases ──────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 10,
      h: 0.08,
      fill: { color: C.accent },
      line: { color: C.accent },
    });

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5,
      y: 0.2,
      w: 1.4,
      h: 0.42,
      fill: { color: C.accent },
      line: { color: C.accent },
      rectRadius: 0.08,
    });
    s.addText('PHASE 3', {
      x: 0.5,
      y: 0.2,
      w: 1.4,
      h: 0.42,
      fontSize: 11,
      bold: true,
      color: C.navy,
      align: 'center',
      valign: 'middle',
      fontFace: 'Calibri',
      margin: 0,
    });

    s.addText('Artifact → GitHub Release', {
      x: 2.1,
      y: 0.22,
      w: 7.5,
      h: 0.45,
      fontSize: 26,
      bold: true,
      color: C.white,
      fontFace: 'Calibri',
      margin: 0,
    });

    // Three stage cards
    const stages = [
      {
        icon: MdBuild,
        color: C.blue,
        title: 'Build on Runner',
        points: [
          'Advanced Installer runs inside GitHub Actions runner',
          'npm install executed as part of workflow',
          '.exe generated entirely in the cloud',
        ],
      },
      {
        icon: FaCloudUploadAlt,
        color: C.accent,
        title: 'Upload to Artifact',
        points: [
          'Build output stored as GitHub Actions artifact',
          'Accessible for inspection or rollback',
          'Acts as the handoff step before release',
        ],
      },
      {
        icon: FaRocket,
        color: C.green,
        title: 'Publish as Release',
        points: [
          'Artifact promoted to GitHub Release automatically',
          'Downloadable link generated instantly',
          'Coda integration uses this URL for card creation',
        ],
      },
    ];

    stages.forEach(async (st, i) => {
      const x = 0.4 + i * 3.1,
        y = 1.1,
        w = 2.85,
        h = 4.15;
      s.addShape(pres.shapes.RECTANGLE, {
        x,
        y,
        w,
        h,
        fill: { color: C.navyMid },
        line: { color: st.color, width: 1.5 },
        shadow: {
          type: 'outer',
          blur: 8,
          offset: 2,
          angle: 135,
          color: '000000',
          opacity: 0.25,
        },
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x,
        y,
        w,
        h: 0.06,
        fill: { color: st.color },
        line: { color: st.color },
      });

      const iconData = await iconToBase64Png(st.icon, '#' + st.color, 256);
      s.addImage({
        data: iconData,
        x: x + (w - 0.65) / 2,
        y: y + 0.25,
        w: 0.65,
        h: 0.65,
      });

      s.addText(st.title, {
        x,
        y: y + 1.05,
        w,
        h: 0.45,
        fontSize: 14,
        bold: true,
        color: C.white,
        align: 'center',
        fontFace: 'Calibri',
        margin: 0,
      });

      st.points.forEach(async (pt, pi) => {
        const checkIcon = await iconToBase64Png(
          FaCheckCircle,
          '#' + st.color,
          128,
        );
        s.addImage({
          data: checkIcon,
          x: x + 0.2,
          y: y + 1.72 + pi * 0.75,
          w: 0.22,
          h: 0.22,
        });
        s.addText(pt, {
          x: x + 0.5,
          y: y + 1.68 + pi * 0.75,
          w: w - 0.65,
          h: 0.62,
          fontSize: 11,
          color: C.muted,
          fontFace: 'Calibri',
          margin: 0,
        });
      });

      // Arrow between cards
      if (i < stages.length - 1) {
        const arrowIcon = await iconToBase64Png(
          FaArrowRight,
          '#' + C.muted,
          128,
        );
        s.addImage({
          data: arrowIcon,
          x: x + w + 0.01,
          y: y + h / 2 - 0.15,
          w: 0.28,
          h: 0.28,
        });
      }
    });
  }

  // ─── SLIDE 7: Phase 4 — Coda & Email Automation ──────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 10,
      h: 0.08,
      fill: { color: C.orange },
      line: { color: C.orange },
    });

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5,
      y: 0.2,
      w: 1.4,
      h: 0.42,
      fill: { color: C.orange },
      line: { color: C.orange },
      rectRadius: 0.08,
    });
    s.addText('PHASE 4', {
      x: 0.5,
      y: 0.2,
      w: 1.4,
      h: 0.42,
      fontSize: 11,
      bold: true,
      color: C.white,
      align: 'center',
      valign: 'middle',
      fontFace: 'Calibri',
      margin: 0,
    });

    s.addText('Coda Integration & Email Automation', {
      x: 2.1,
      y: 0.22,
      w: 7.5,
      h: 0.45,
      fontSize: 22,
      bold: true,
      color: C.white,
      fontFace: 'Calibri',
      margin: 0,
    });

    // Coda section (left)
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.4,
      y: 0.88,
      w: 4.4,
      h: 4.3,
      fill: { color: C.navyMid },
      line: { color: C.orange, width: 1.2 },
      shadow: {
        type: 'outer',
        blur: 6,
        offset: 2,
        angle: 135,
        color: '000000',
        opacity: 0.2,
      },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.4,
      y: 0.88,
      w: 4.4,
      h: 0.06,
      fill: { color: C.orange },
      line: { color: C.orange },
    });

    const syncIcon = await iconToBase64Png(FaSync, '#' + C.orange, 256);
    s.addImage({ data: syncIcon, x: 0.65, y: 1.05, w: 0.5, h: 0.5 });

    s.addText('Coda Auto-Sync', {
      x: 1.25,
      y: 1.05,
      w: 3.4,
      h: 0.5,
      fontSize: 16,
      bold: true,
      color: C.white,
      fontFace: 'Calibri',
      margin: 0,
    });

    const codaPoints = [
      'Coda polls GitHub Releases every 1 hour',
      'Detects new release automatically',
      'Creates a new card with title, version, and direct download link',
      'No manual SharePoint upload needed',
      'Links are always fresh and directly accessible',
    ];
    codaPoints.forEach(async (pt, i) => {
      const chk = await iconToBase64Png(FaCheckCircle, '#' + C.orange, 128);
      s.addImage({ data: chk, x: 0.6, y: 1.75 + i * 0.65, w: 0.22, h: 0.22 });
      s.addText(pt, {
        x: 0.92,
        y: 1.72 + i * 0.65,
        w: 3.72,
        h: 0.55,
        fontSize: 11,
        color: C.muted,
        fontFace: 'Calibri',
        margin: 0,
      });
    });

    // Email section (right)
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.2,
      y: 0.88,
      w: 4.4,
      h: 4.3,
      fill: { color: C.navyMid },
      line: { color: C.green, width: 1.2 },
      shadow: {
        type: 'outer',
        blur: 6,
        offset: 2,
        angle: 135,
        color: '000000',
        opacity: 0.2,
      },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.2,
      y: 0.88,
      w: 4.4,
      h: 0.06,
      fill: { color: C.green },
      line: { color: C.green },
    });

    const emailIcon = await iconToBase64Png(FaEnvelope, '#' + C.green, 256);
    s.addImage({ data: emailIcon, x: 5.45, y: 1.05, w: 0.5, h: 0.5 });

    s.addText('Automated Email Alerts', {
      x: 6.05,
      y: 1.05,
      w: 3.4,
      h: 0.5,
      fontSize: 16,
      bold: true,
      color: C.white,
      fontFace: 'Calibri',
      margin: 0,
    });

    const emailPoints = [
      'Triggered when a new Coda card is created',
      'Emails sent automatically to all stakeholders',
      'Includes version number and download link',
      'Zero manual effort after initial setup',
      'Coming soon: custom email templates per app',
    ];
    emailPoints.forEach(async (pt, i) => {
      const chk = await iconToBase64Png(FaCheckCircle, '#' + C.green, 128);
      s.addImage({ data: chk, x: 5.4, y: 1.75 + i * 0.65, w: 0.22, h: 0.22 });
      s.addText(pt, {
        x: 5.72,
        y: 1.72 + i * 0.65,
        w: 3.72,
        h: 0.55,
        fontSize: 11,
        color: C.muted,
        fontFace: 'Calibri',
        margin: 0,
      });
    });
  }

  // ─── SLIDE 8: application.json Fix ───────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 10,
      h: 0.08,
      fill: { color: C.red },
      line: { color: C.red },
    });

    s.addText('Known Issue & Fix', {
      x: 0.5,
      y: 0.22,
      w: 9,
      h: 0.55,
      fontSize: 28,
      bold: true,
      color: C.white,
      fontFace: 'Calibri',
      margin: 0,
    });
    s.addText('application.json was being overwritten on every run', {
      x: 0.5,
      y: 0.78,
      w: 9,
      h: 0.38,
      fontSize: 14,
      color: C.muted,
      fontFace: 'Calibri',
      margin: 0,
    });

    // Problem box
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.4,
      y: 1.3,
      w: 9.2,
      h: 0.95,
      fill: { color: '1A0A0A' },
      line: { color: C.red, width: 1.5 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.4,
      y: 1.3,
      w: 0.06,
      h: 0.95,
      fill: { color: C.red },
      line: { color: C.red },
    });
    s.addText('⚠  Problem:', {
      x: 0.6,
      y: 1.35,
      w: 2.5,
      h: 0.35,
      fontSize: 12,
      bold: true,
      color: C.red,
      fontFace: 'Calibri',
      margin: 0,
    });
    s.addText(
      'The workflow was writing directly to application.json, overriding the existing file instead of merging updates. This caused version data and other fields to be lost on each build run.',
      {
        x: 0.6,
        y: 1.65,
        w: 8.8,
        h: 0.52,
        fontSize: 11,
        color: C.muted,
        fontFace: 'Calibri',
        margin: 0,
      },
    );

    // Solutions
    const solutions = [
      {
        num: 'Option A',
        color: C.blueLight,
        title: 'Save Output to Variable → Write to File',
        steps: [
          'Read current application.json into memory',
          'Apply version/metadata updates to the object in the variable',
          'Write the merged object back to application.json',
          'Commit and push the updated file via the bot',
        ],
      },
      {
        num: 'Option B',
        color: C.green,
        title: 'Pull Updated File from Runner → Push to Git',
        steps: [
          'Let the runner generate the updated application.json',
          'The runner already has the correct merged state',
          'Pull the file from the runner output directly',
          'Push the correct file to the repository',
        ],
      },
    ];

    solutions.forEach(async (sol, i) => {
      const x = 0.4 + i * 4.7,
        y = 2.45,
        w = 4.45,
        h = 2.7;
      s.addShape(pres.shapes.RECTANGLE, {
        x,
        y,
        w,
        h,
        fill: { color: C.navyMid },
        line: { color: sol.color, width: 1.5 },
        shadow: {
          type: 'outer',
          blur: 6,
          offset: 2,
          angle: 135,
          color: '000000',
          opacity: 0.2,
        },
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x,
        y,
        w: 0.06,
        h,
        fill: { color: sol.color },
        line: { color: sol.color },
      });

      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: x + 0.15,
        y: y + 0.15,
        w: 1.15,
        h: 0.34,
        fill: { color: sol.color },
        line: { color: sol.color },
        rectRadius: 0.06,
      });
      s.addText(sol.num, {
        x: x + 0.15,
        y: y + 0.15,
        w: 1.15,
        h: 0.34,
        fontSize: 10,
        bold: true,
        color: C.navy,
        align: 'center',
        valign: 'middle',
        fontFace: 'Calibri',
        margin: 0,
      });

      s.addText(sol.title, {
        x: x + 0.18,
        y: y + 0.6,
        w: w - 0.35,
        h: 0.55,
        fontSize: 12,
        bold: true,
        color: C.white,
        fontFace: 'Calibri',
        margin: 0,
      });

      sol.steps.forEach(async (step, si) => {
        const chk = await iconToBase64Png(FaArrowRight, '#' + sol.color, 128);
        s.addImage({
          data: chk,
          x: x + 0.18,
          y: y + 1.3 + si * 0.35,
          w: 0.18,
          h: 0.18,
        });
        s.addText(step, {
          x: x + 0.44,
          y: y + 1.28 + si * 0.35,
          w: w - 0.6,
          h: 0.32,
          fontSize: 10,
          color: C.muted,
          fontFace: 'Calibri',
          margin: 0,
        });
      });
    });

    s.addText(
      'Both options are viable — Option A gives more control; Option B is simpler to implement.',
      {
        x: 0.5,
        y: 5.28,
        w: 9,
        h: 0.3,
        fontSize: 11,
        color: C.muted,
        italic: true,
        align: 'center',
        fontFace: 'Calibri',
        margin: 0,
      },
    );
  }

  // ─── SLIDE 9: Summary / What's Next ──────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 10,
      h: 0.08,
      fill: { color: C.accent },
      line: { color: C.accent },
    });

    s.addText("What We've Built", {
      x: 0.5,
      y: 0.22,
      w: 9,
      h: 0.6,
      fontSize: 30,
      bold: true,
      color: C.white,
      fontFace: 'Calibri',
      margin: 0,
    });

    const done = [
      {
        icon: FaCheckCircle,
        color: C.green,
        text: 'License + Certificate setup in runner',
      },
      {
        icon: FaCheckCircle,
        color: C.green,
        text: 'Shell + full npm install builds verified',
      },
      {
        icon: FaCheckCircle,
        color: C.green,
        text: 'Auto version bump via GitHub Actions bot with temp branch + PR',
      },
      {
        icon: FaCheckCircle,
        color: C.green,
        text: 'Build artifacts promoted to GitHub Releases',
      },
      {
        icon: FaCheckCircle,
        color: C.green,
        text: 'Coda auto-sync every hour from GitHub Releases',
      },
      {
        icon: FaCheckCircle,
        color: C.green,
        text: 'Automated email dispatch on new Coda card',
      },
    ];

    done.forEach(async (d, i) => {
      const chk = await iconToBase64Png(d.icon, '#' + d.color, 128);
      s.addImage({ data: chk, x: 0.5, y: 1.1 + i * 0.52, w: 0.3, h: 0.3 });
      s.addText(d.text, {
        x: 0.9,
        y: 1.08 + i * 0.52,
        w: 8.5,
        h: 0.38,
        fontSize: 13,
        color: C.white,
        fontFace: 'Calibri',
        margin: 0,
      });
    });

    s.addText("What's Next", {
      x: 0.5,
      y: 4.3,
      w: 4.5,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: C.accent,
      fontFace: 'Calibri',
      margin: 0,
    });

    const next = [
      {
        icon: FaBolt,
        color: C.orange,
        text: 'Fix application.json merge (Option A or B)',
      },
      {
        icon: FaBolt,
        color: C.orange,
        text: 'Custom email templates per application',
      },
      {
        icon: FaBolt,
        color: C.orange,
        text: 'Rollback workflow for failed releases',
      },
    ];

    next.forEach(async (n, i) => {
      const iconData = await iconToBase64Png(n.icon, '#' + n.color, 128);
      s.addImage({
        data: iconData,
        x: 0.5,
        y: 4.8 + i * 0.28,
        w: 0.22,
        h: 0.22,
      });
      s.addText(n.text, {
        x: 0.82,
        y: 4.78 + i * 0.28,
        w: 8.5,
        h: 0.25,
        fontSize: 12,
        color: C.muted,
        fontFace: 'Calibri',
        margin: 0,
      });
    });

    // Right: big rocket
    const rocketIcon = await iconToBase64Png(FaRocket, '#' + C.accent, 512);
    s.addImage({
      data: rocketIcon,
      x: 7.8,
      y: 0.9,
      w: 1.8,
      h: 1.8,
      transparency: 15,
    });

    // Footer
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 5.4,
      w: 10,
      h: 0.225,
      fill: { color: C.navyMid },
      line: { color: C.navyMid },
    });
    s.addText('GitHub Actions CI/CD Automation  •  Built with ❤ for the team', {
      x: 0,
      y: 5.42,
      w: 10,
      h: 0.2,
      fontSize: 9,
      color: C.muted,
      align: 'center',
      fontFace: 'Calibri',
      margin: 0,
    });
  }

  await pres.writeFile({ fileName: './cicd_automation.pptx' });
  console.log('Done!');
}

main().catch(console.error);
