// ─────────────────────────────────────────────────────────────────────────────
//  lib/projects.ts
//  Structure: heroMedia (single object) + sections (each with optional media[])
// ─────────────────────────────────────────────────────────────────────────────

export type ProjectCategory =
  | '3d-models'
  | 'pcb-designs'
  | 'robots'
  | 'uavs'
  | 'embedded'

export type MediaSize = 'small' | 'medium' | 'large' | 'portrait' | 'cinematic' | 'full' | 'square'

// ── HERO MEDIA — single object at top of project page ────────────────────────
export type HeroMedia =
  | { type: 'video';  videoFile?: string; videoUrl?: string; size?: MediaSize }
  | { type: 'model';  modelUrl?: string;  modelEmbedUrl?: string; size?: MediaSize }
  | { type: 'image';  src: string; alt?: string; size?: MediaSize }

// ── SECTION MEDIA — array inside each engineering section ────────────────────
export type SectionMediaItem =
  | { type: 'image';   title?: string; src: string; alt?: string; size?: MediaSize }
  | { type: 'gallery'; title?: string; images: { src: string; caption?: string }[]; size?: MediaSize }
  | { type: 'video';   title?: string; videoFile?: string; videoUrl?: string; size?: MediaSize }
  | { type: 'model';   title?: string; modelUrl?: string; modelEmbedUrl?: string; size?: MediaSize }
  | { type: 'diagram'; title?: string; src: string; alt?: string; size?: MediaSize }

// ── ENGINEERING SECTION ───────────────────────────────────────────────────────
export interface ProjectSection {
  heading: string
  body: string
  bullets?: string[]
  media?: SectionMediaItem[]
}

export interface Spec {
  label: string
  value: string
}

// ── PROJECT ───────────────────────────────────────────────────────────────────
export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  categories: ProjectCategory[]
  tags: string[]
  thumbnail: string
  year?: string
  heroMedia?: HeroMedia
  specs?: Spec[]
  sections?: ProjectSection[]
  githubUrl?: string
  cadUrl?: string
  docsUrl?: string
}

// ── CATEGORIES ────────────────────────────────────────────────────────────────
export const categories: { id: ProjectCategory | 'all'; label: string }[] = [
  { id: 'all',         label: 'All Projects' },
  { id: '3d-models',   label: '3D Models'    },
  { id: 'pcb-designs', label: 'PCB Designs'  },
  { id: 'robots',      label: 'Robots'       },
  { id: 'uavs',        label: 'UAVs'         },
  { id: 'embedded',    label: 'Embedded'     },
]

// ─────────────────────────────────────────────────────────────────────────────
//  PROJECTS
// ─────────────────────────────────────────────────────────────────────────────
export const projects: Project[] = [

  // ── 1. FIXED WING UAV ─────────────────────────────────────────────────────
  {
    id: 'fixed-wing-uav',
    title: 'Fixed Wing UAV',
    subtitle: 'Custom Depron Foam Trainer Aircraft · Brushless Propulsion · Flysky RC',
    description:
      'Hand-built fixed-wing trainer UAV with Depron foam airframe, brushless motor drivetrain, and Flysky RC system. Designed for stable low-speed flight with high lift-to-drag wing geometry.',
    categories: ['uavs'],
    tags: ['Fixed Wing', 'RC Aircraft', 'Flysky', 'Brushless', 'Aerodynamics', 'Depron'],
    thumbnail: '/plane/rcplane.jpg',
    year: '2024',

    heroMedia: {
      type: 'video',
      videoFile: '/plane/planeflight.MP4',
      size: 'large',
    },

    specs: [
      { label: 'Wingspan',    value: '~1250mm' },
      { label: 'Airframe',    value: '5mm Depron Foam' },
      { label: 'Motor',       value: 'A2212 1000KV Brushless' },
      { label: 'ESC',         value: '30A SimonK' },
      { label: 'Battery',     value: '3S 2200mAh LiPo' },
      { label: 'RC System',   value: 'Flysky FS-i6' },
      { label: 'Servos',      value: '4x SG90 (flaps, elevator, rudder) + 2x MG90 (ailerons)' },
    ],

    sections: [
    {
      heading: 'Project Objective',
      body:
        'The objective of this project was to design and fabricate a lightweight fixed-wing trainer UAV capable of stable low-speed flight, forgiving handling characteristics, and efficient aerodynamic performance while remaining inexpensive and easily repairable. The aircraft was intentionally designed as a trainer platform to prioritise stability, predictable control response, and rapid field maintenance over aggressive maneuverability.',
    },

    {
      heading: 'Aerodynamic Architecture',
      body:
        'The aircraft utilises a high-wing monoplane configuration combined with moderate dihedral geometry to maximise passive roll stability during low-speed flight. Wing loading and aspect ratio were selected to favour efficient lift generation and predictable stall behaviour, enabling smoother handling during takeoff, landing, and slow cruise conditions.',
      bullets: [
        'High-wing configuration improves pendulum stability during flight',
        'Moderate dihedral angle enhances passive roll correction',
        'Large wing surface area improves low-speed lift generation',
        'Control surface sizing tuned for smooth pilot response',
        'Aerodynamic profile prioritised stable cruise over high-speed agility',
      ],
      media: [
        {
          type: 'gallery',
          images: [
            { src: '/plane/planeplans.jpg', caption: 'Plane design layout and wing geometry' },
          ],
          size: 'large',
        },
      ],
    },

    {
      heading: 'Airframe Engineering & Fabrication',
      body:
        'The airframe was fabricated primarily from 7mm Depron foam to minimise structural weight while maintaining adequate rigidity for stable flight. Foam structure spars were integrated into the wing to reduce bending deformation under aerodynamic loading without significantly increasing mass.',
      bullets: [
        '7mm Depron foam selected for low density and rapid repairability',
        'Foam structure spars integrated to minimise wing flex during maneuvers',
        'Modular fuselage layout simplifies electronics access and maintenance',
        'Hot glue bonding used for rapid structural assembly',
        'Control surfaces fabricated with lightweight hinge tape mechanisms',
      ],
      media: [
        {
          type: 'gallery',
          images: [
            { src: '/plane/wingfab.jpeg', caption: 'Wing fabrication' },
            { src: '/plane/airfoil.jpg', caption: 'Foam spar reinforcement and airfoil' },
            { src: '/plane/dihedral.jpg', caption: 'Wing assembly and dihedral angle' },
            { src: '/plane/fuselage.jpeg', caption: 'Fuselage assembly' },
            { src: '/plane/finalbody.jpg', caption: 'Final airframe structural assembly' },
          ],
          size: 'large',
        },
      ],
    },

    {
      heading: 'Propulsion & Electronics Integration',
      body:
        'The propulsion system consists of an A2212 1000KV brushless motor paired with a 30A ESC and powered by a 3S LiPo battery. Flight control is achieved through Flysky FS-i6 RC system driving four SG90 servos responsible for flaps, elevator, and rudder actuation and two MG90 servos for ailerons. Electronics were positioned to optimise centre-of-gravity distribution while maintaining accessibility for tuning and maintenance.',
      bullets: [
        'A2212 1000KV brushless motor selected for efficient thrust-to-weight ratio',
        '3S LiPo configuration balanced endurance and thrust output',
        'Flysky FS-i6 radio system used for reliable long-range control',
        'Servo linkage geometry tuned to minimise control deadband',
        'Component placement iteratively adjusted for CG optimisation',
      ],
      media: [
        {
          type: 'gallery',
          images: [
            { src: '/plane/propulsion.jpg', caption: 'Propulsion setup' },
            { src: '/plane/servolinkage.jpg', caption: 'Servo control linkage' },
            { src: '/plane/electronics.jpg', caption: 'Electronics integration' },
          ],
          size: 'medium',
        },
      ],
    },

    {
      heading: 'Ground Testing & Iterative Refinement',
      body:
        'Multiple ground-testing sessions were conducted to evaluate control responsiveness, thrust performance, and control surface synchronization. Successive iterations focused on refining centre-of-gravity positioning, adjusting control throws, and reducing structural flex to achieve smoother cruise behaviour and improved handling consistency.',
      bullets: [
        'CG location iteratively refined through repeated test flights',
        'Control throw tuning reduced overshoot during maneuvers',
        'Structural reinforcement added after observing wing flex under load',
        'Landing behaviour improved through elevator trim adjustments',
        'Stable low-speed cruise achieved after aerodynamic balancing',
      ],
      media: [
        {
          type: 'video',
          videoFile: '/plane/groundtest.mp4',
          size: 'large',
        },
      ],
    },

    {
      heading: 'Engineering Challenges',
      body:
        'One of the primary engineering challenges was achieving sufficient structural rigidity while maintaining a lightweight airframe. Additional challenges included designing a structurally strong landing gear while keeping the build light weight, maintaining stable CG placement across battery configurations, and tuning control surfaces for symmetric actuation and ideal resolution.',
      bullets: [
        'Balancing structural stiffness against total airframe weight',
        'Designing custom landing gear that is both lightweight and durable',
        'Managing centre-of-gravity variation from battery placement',
        'Suppressing vibration transfer from motor to foam structure',
        'Achieving symmetric and ideal resolution control surface response',
      ],
    },

    {
      heading: 'Outcome & Technical Learnings',
      body:
        'The project successfully demonstrated stable fixed-wing flight using a fully hand-built foam airframe and custom-integrated propulsion system. Beyond fabrication experience, the project provided practical understanding of aerodynamic stability, thrust-to-weight optimisation, structural reinforcement strategies, RC system integration, and real-world flight testing methodologies.',
    },
  ]
  },

  // ── 2. ORNITHOPTER ────────────────────────────────────────────────────────
  {
    id: 'ornithopter',
    title: 'Ornithopter — Bio-Inspired Flapping Wing Drone',
    subtitle: 'Fusion 360 · Crank-Rocker Mechanism · Composite Structure · University Funded',
    description:
      'Bio-inspired aerial robot mimicking avian flight dynamics through flapping-wing actuation. Targeting stable flight and hover via lightweight composite structures and an optimised four-bar flapping mechanism. Currently in design and prototyping phase.',
    categories: ['uavs', '3d-models', 'robots'],
    tags: ['Ornithopter', 'Fusion 360', 'Bio-Inspired', 'Flapping Wing', 'Composite', 'Aerodynamics', 'University Funded'],
    thumbnail: '/ornithopter/orni-thumb.jpg',
    year: '2026',

  heroMedia: {
    type: 'model',
    modelEmbedUrl:
      'https://sketchfab.com/models/3077be2a00984be2a64c9c26c3ae107b/embed?autostart=1&autospin=0.3&transparent=1&ui_controls=0&ui_infos=0&ui_stop=0&ui_watermark=0',
    size: 'large',
  },

    specs: [
      { label: 'Type',        value: 'Flapping wing ornithopter' },
      { label: 'Inspiration', value: 'Avian flight dynamics' },
      { label: 'CAD Tool',    value: 'Autodesk Fusion 360' },
      { label: 'Mechanism',   value: 'Four-bar crank-rocker linkage' },
      { label: 'Total Mass',  value: '> 300g exceeding the target' },
      { label: 'Wing',        value: 'Carbon spar + Mylar membrane' },
      { label: 'Target',      value: 'Stable flight and hover capability' },
      { label: 'Status',      value: 'Ongoing iterations to achieve flight' },
      { label: 'Funding',     value: 'University Funded Project' },
    ],

    sections: [
      {
        heading: 'Project Objective',
        body:
          'Design and develop a lightweight flapping-wing ornithopter capable of biologically inspired aerial locomotion using mechanical wing actuation instead of conventional rotary propulsion. The project explores how avian flight principles can enable quieter operation, improved maneuverability, and efficient low-speed flight for future compact UAV systems.',
      },

      {
        heading: 'Bio-Inspired Flight Concept',
        body:
          'The ornithopter architecture draws inspiration from natural avian flight mechanics, where lift and thrust are simultaneously generated through rhythmic wing flapping. Unlike fixed-wing aircraft that require forward velocity or multirotors relying on continuous high-RPM propellers, this system utilises oscillatory wing motion to achieve biologically efficient aerodynamic behaviour.',
        bullets: [
          'Flapping-wing locomotion inspired by small bird morphology',
          'Target wingbeat frequency: 4–6 Hz',
          'Low Reynolds number aerodynamic operating regime',
          'Passive aerodynamic efficiency through unsteady airflow generation',
          'Reduced acoustic signature compared to conventional quadrotors',
        ],
      },

      {
        heading: 'Mechanical Transmission System',
        body:
          'A crank-rocker four-bar linkage converts high-speed rotational motion from the brushless DC motor into controlled reciprocating wing motion. A custom 55:1 reduction gearbox was designed to reduce motor speed while amplifying torque required for sustained flapping actuation.',
        bullets: [
          'Crank-rocker four-bar mechanism designed using Grashof condition',
          '55:1 reduction gearbox for high torque transmission',
          'Helical gear architecture for smoother meshing and lower vibration',
          '180° phase-offset wing motion for inertial balancing',
          'PTFE-lubricated joints for reduced friction losses',
        ],
        media: [
          {
            type: 'video',
            videoFile: '/ornithopter/mechanism.mp4',
            size: 'large',
          },
          {
            type: 'gallery',
            images: [
              { src: '/ornithopter/gearmech.jpg', caption: 'Gear mechanism' },
              { src: '/ornithopter/orniassembly.jpg', caption: 'Full ornithopter assembly in Fusion 360' },
            ],
            size: 'large',
          },
        ],
      },

      {
        heading: 'Wing Architecture & Aerodynamics',
        body:
          'The wing system was engineered to maximise lift generation while maintaining extremely low structural mass. Carbon fibre spars provide bending stiffness, while lightweight membrane surfaces enable controlled aeroelastic deformation during the flapping cycle.',
        bullets: [
          'Carbon fibre leading spars for stiffness-to-weight optimisation',
          'Mylar membrane wings for lightweight aeroelastic response',
          'Wing geometry tuned for stable low-speed flight',
          'Symmetric flapping configuration for balanced force generation',
          'Large effective wing area for enhanced lift production',
        ],
        media: [
          {
            type: 'gallery',
            images: [
              { src: '/ornithopter/wing1.jpg', caption: 'Wing structure fabrication process' },
              { src: '/ornithopter/wing2.jpg', caption: 'Carbon spar reinforcement structure' },
            ],
            size: 'large',
          },
        ],
      },

      {
        heading: 'CAD Design & Simulation',
        body:
          'All structural and transmission components were designed in Autodesk Fusion 360. Motion studies and interference validation were performed to ensure smooth mechanism operation across the intended flapping cycle before physical fabrication.',
        bullets: [
          'Full assembly designed parametrically in Fusion 360',
          'Motion simulation for linkage validation',
          'Interference and clearance analysis for moving joints',
          'Iterative geometry optimisation for weight reduction',
          'Rapid design iteration enabled through modular CAD workflow',
        ],
      },

      {
        heading: 'Fabrication & Materials',
        body:
          'The prototype was primarily fabricated using additive manufacturing to enable rapid iteration and lightweight structural integration. Material selection prioritised stiffness, fatigue resistance, manufacturability, and low mass.',
        bullets: [
          'PLA+ structural frame for lightweight rigidity',
          'PETG gears for improved wear resistance',
          'FDM 3D printing for rapid prototyping',
          'Press-fit shaft integration with miniature bearings',
          'Modular assembly for simplified maintenance and redesign',
        ],
        // media: [
        //   {
        //     type: 'gallery',
        //     images: [
        //       { src: '/ornithopter/build1.jpg', caption: '3D printed transmission assembly' },
        //       { src: '/ornithopter/build2.jpg', caption: 'Wing structure fabrication' },
        //       { src: '/ornithopter/build3.jpg', caption: 'Mechanical subsystem integration' },
        //     ],
        //     size: 'large',
        //   },
        // ],
      },

      {
        heading: 'Prototype Assembly',
        body:
          'The final assembly integrates the gearbox, crank-rocker transmission, wing spars, membrane structure, motor system, and control electronics into a compact lightweight bio-inspired aerial platform.',
        bullets: [
          'Integrated drivetrain and flapping mechanism',
          'Balanced dual-wing oscillation architecture',
          'Compact embedded electronics layout',
          'Modular structural access for rapid testing',
          'Low-vibration mechanical integration',
        ],
        media: [
          {
            type: 'gallery',
            images: [
              { src: '/ornithopter/wingintegration.jpg', caption: 'Wing integration' },
              { src: '/ornithopter/final.jpg', caption: 'Assembled ornithopter prototype' },
            ],
            size: 'large',
          },
        ],
      },

      {
        heading: 'Testing & Performance Validation',
        body:
          'Mechanical and structural testing validated drivetrain efficiency, wingbeat consistency, vibration behaviour, and structural durability under repeated flapping cycles. Bench testing confirmed stable oscillatory wing motion and reliable power transmission.',
        bullets: [
          'Stable wingbeat frequency maintained at 4–6 Hz',
          'Mechanical transmission efficiency exceeding 85%',
          'Frame deflection below 1 mm under operational load',
          'Successful endurance testing over 1000+ flapping cycles',
          'Reduced vibration through phase-offset wing motion',
        ],
        media: [
          {
            type: 'video',
            videoFile: '/ornithopter/working.mp4',
            size: 'large',
          },
        ],
      },

      {
        heading: 'Engineering Challenges',
        body:
          'The primary engineering challenge involved balancing lightweight construction with sufficient structural rigidity under cyclic aerodynamic loading. Additional complexity arose from choosing gear ratios and transmission mechanisms for efficient torque transmission, vibration minimisation, and synchronised flapping motion.',
        bullets: [
          'Reducing drivetrain losses at high reduction ratios',
          'Maintaining structural stiffness under repeated oscillation',
          'Balancing wing inertia for vibration reduction',
          'Achieving low system mass without sacrificing durability',
          'Synchronising dual-wing flapping dynamics',
        ],
      },

      {
        heading: 'Future Development',
        body:
          'Future iterations will focus on reducing total system mass, improving aerodynamic efficiency through CFD-driven wing optimisation and optimising gear and transmission mechanisms for higher efficiency and reduced weight.',
        bullets: [
          'CFD-based wing geometry optimisation',
          'Lightweight material exploration for frame and gears',
          'Efficiency improvements in gears and mechanical transmission',
          'Free-flight testing and stability validation',
          'Integration of IMU-based flight control',
          'Wireless telemetry and remote control system',
          'Adaptive wing morphing exploration',
          'Autonomous flapping-flight stabilisation',
        ],
      },
    ]
  },

  // ── 3. SMART PARCEL BOX ───────────────────────────────────────────────────
  {
    id: 'smart-parcel-box',
    title: 'Smart Parcel Box',
    subtitle: 'ESP32 · Fusion 360 · Barcode Auth · OTP · Theft Detection · Patented',
    description:
      'Patented intelligent parcel delivery box with authenticated access and theft detection. Designed in Fusion 360, 3D-printed in PLA+, powered by ESP32 with barcode scanning, OTP, IR/vibration sensors, and Blynk IoT — awarded 2nd place at Department Project Expo.',
    categories: ['embedded', '3d-models'],
    tags: ['ESP32', 'Fusion 360', 'IoT', 'Blynk', 'Barcode', 'PLA+', '3D Print', 'Patent'],
    thumbnail: '/safedrop/safedrop-thumb.jpg',
    year: '2025',

    heroMedia: {
      type: 'model', 
       modelEmbedUrl: 'https://sketchfab.com/models/7fee9ed177ab4e51be73d29c374a3215/embed?autostart=1&autospin=0.2&transparent=1&ui_controls=0&ui_infos=0&ui_stop=0&ui_watermark=0',
      size: 'large',
    },

    specs: [
      { label: 'MCU',              value: 'ESP32-WROOM-32D (WiFi + BLE)' },
      { label: 'Authentication',   value: 'OTP keypad' },
      { label: 'Sensors',          value: 'IR sensor, Vibration sensor, Hall effect sensor' },
      { label: 'Actuation',        value: 'Servo-driven locking mechanism' },
      { label: 'IoT Platform',     value: 'Blynk IoT — real-time notifications' },
      { label: 'CAD Tool',         value: 'Autodesk Fusion 360' },
      { label: 'Fabrication',      value: 'FDM — PLA+ (Creality printer)' },
      { label: 'Patent (India)',   value: 'Application No. 202511076582' },
      { label: 'Patent (Germany)', value: 'No. 202025104999 — Granted' },
      { label: 'Award',            value: '2nd Place — Department Project Expo' },
    ],

    sections: [
      {
        heading: 'Project Objective',
        body:
          'Safe Drop is a secure IoT-enabled parcel delivery system engineered to eliminate missed deliveries, unauthorised access, and unattended package theft. The system autonomously authenticates delivery personnel, secures parcels through automatic locking, and provides real-time remote monitoring and tamper alerts without requiring the recipient to be physically present.',
      },

      {
        heading: 'System Architecture',
        body:
          'The system architecture combines embedded sensing, electromechanical locking, cloud connectivity, and event-driven firmware into a fully integrated smart parcel handling platform. The ESP32 microcontroller coordinates all sensing, authentication, locking, notification, and security operations in real time.',
        bullets: [
          'ESP32-WROOM-32D as the central embedded controller',
          'Real-time Wi-Fi communication using Blynk IoT platform',
          'Interrupt-driven event handling for critical security events',
          'Integrated sensing, locking, and cloud notification architecture',
          'Autonomous parcel monitoring and secure access workflow',
        ],
        // media: [
        //   {
        //     type: 'diagram',
        //     src: '/safedrop/architecture.png',
        //     size: 'full',
        //   },
        // ],
      },

      {
        heading: 'Mechanical Design & Enclosure Engineering',
        body:
          'The enclosure was fully designed in Autodesk Fusion 360 with emphasis on structural rigidity, modularity, printability, and integrated component mounting. The design involves modular walls and compartments with sliding-joints and mechanical interlocking for DIY printability and assembly. It also separates the parcel storage chamber from the electronics compartment to improve electrical safety, maintainability, and long-term operational reliability.',
        bullets: [
          'Complete parametric CAD design developed in Fusion 360',
          'Sliding-joint assembly eliminates screws and adhesives',
          'Dual-compartment architecture for parcel isolation and electronics protection',
          'Integrated mounting geometry for sensors, servo, display, and keypad',
          'Optimised for support-free FDM printing using PLA+ filament',
          'Dedicated cable-routing channels and maintenance access paths',
        ],
        media: [
          {
            type: 'gallery',
            images: [
              { src: '/safedrop/design.jpg', caption: 'Enclosure model in Fusion 360' },
              { src: '/safedrop/interlockwalls.jpg', caption: 'Sliding-joint modular walls' },
              { src: '/safedrop/lowercompartment1.jpg', caption: 'Separate electronics compartment' },
            ],
            size: 'large',
          },
        ],
      },

      {
        heading: 'Embedded Electronics & Hardware Integration',
        body:
          'The hardware subsystem integrates sensing, locking, user interaction, and wireless communication into a compact embedded architecture. Components were selected based on reliability, ease of integration, and suitability for real-time IoT operation.',
        bullets: [
          'ESP32 microcontroller with integrated Wi-Fi and Bluetooth',
          'IR sensors for parcel presence detection',
          'Hall-effect sensor for door-state monitoring',
          'Servo-actuated locking mechanism for automated securing',
          '4×4 keypad for authenticated access control',
          '2.8-inch SPI TFT display for OTP and system feedback',
          'WS2812 RGB LED matrix for visual state indication',
          'SW-520D vibration sensor for tamper detection',
          'Active speaker for audible alerts and interaction feedback',
        ],
        media: [
          {
            type: 'diagram',
            src: '/safedrop/schematic.png',
            size: 'full',
          },
          {
            type: 'gallery',
            images: [
              { src: '/safedrop/wiring.jpg', caption: 'ESP32 and electronics wiring' },
              { src: '/safedrop/wiring1.jpg', caption: 'Separate wiring compartment' },
            ],
            size: 'medium',
          },
        ],
      },

      {
        heading: 'Firmware & Autonomous Control Logic',
        body: 'The embedded firmware was developed around an event-driven control architecture running on the ESP32-WROOM-32D using Embedded C and the Arduino framework. The system coordinates delivery authentication, parcel detection, lock actuation, tamper monitoring, OTP management, and cloud communication through parallel state handling and interrupt-driven execution.',
        bullets: [
          'Finite-state workflow controlling authentication, parcel deposition, secure locking, and recipient access',
          'Parallel interrupt routine for vibration-based tamper detection and real-time theft alert generation',
          'Dynamic OTP generation and secure access verification for recipient-side authentication',
          'Hall sensor and IR sensor fusion for door-state and parcel-presence monitoring',
          'Automatic timeout, failed-attempt lockout, and intrusion alert handling logic',
          'Real-time Blynk cloud synchronisation for mobile notifications and remote system monitoring',
        ],
        media: [
          {
            type: 'diagram',
            src: '/safedrop/logicflow.png',
            size: 'full',
          },
        ],
      },

      {
        heading: 'Authentication & Security Workflow',
        body:
          'Safe Drop implements a multi-stage authentication and security pipeline to ensure controlled access and secure unattended parcel delivery. The workflow autonomously validates access, monitors delivery status, and responds instantly to abnormal events.',
        bullets: [
          'Unique password generated and transmitted to recipient through Blynk',
          'Delivery access granted only after correct password verification',
          'Automatic door locking after parcel insertion and closure confirmation',
          'Lockout timer triggered after repeated incorrect password attempts',
          'Tampering events generate immediate cloud alerts and audible alarms',
          'Real-time parcel placement and removal monitoring',
          
        ],
        media: [
          {
            type: 'gallery',
            images: [
              { src: '/safedrop/password.jpg', caption: 'Unique password generation and transmission' },
              { src: '/safedrop/correctpass.jpg', caption: 'Correct password verification' },
              { src: '/safedrop/lockout.jpg', caption: 'Lockout timer' },
              { src: '/safedrop/detected.jpg', caption: 'Parcel placement validation' },
              { src: '/safedrop/tamper.jpg', caption: 'Tamper detection' },
              { src: '/safedrop/removed.jpg', caption: 'Parcel removal detection' },
            ],
            size: 'large',
          },
        ],
      },

      // {
      //   heading: 'Implementation & System Integration',
      //   body:
      //     'The final prototype was implemented by integrating all hardware subsystems within the custom 3D-printed enclosure and deploying the embedded firmware onto the ESP32 platform. Functional validation was performed across authentication, parcel detection, tamper response, and remote notification workflows.',
      //   bullets: [
      //     'Integrated embedded hardware within modular enclosure architecture',
      //     'Cloud-connected remote monitoring through Blynk IoT dashboard',
      //     'Sequential main-loop logic combined with interrupt subsystems',
      //     'Validated parcel insertion, OTP verification, and auto-lock operation',
      //     'Real-time synchronisation between physical events and mobile alerts',
      //   ],
      // },

      {
        heading: 'Performance Validation',
        body:
          'Experimental testing evaluated system responsiveness, cloud communication latency, locking reliability, and structural capability under operational conditions. The platform demonstrated stable IoT communication and reliable autonomous parcel handling behaviour.',
        bullets: [
          'Average complete delivery process time: ~26 seconds',
          'Sub-second notification latency under normal network conditions',
          'Average Wi-Fi connection delay between 6–8 seconds',
          'Automatic lock engagement validated after parcel confirmation',
          'Load-bearing capability optimised through controlled infill selection',
          '50% infill configuration supported approximately 32 kg load capacity',
        ],
        media: [
          {
            type: 'video',
            videoFile: '/safedrop/working.mp4',
            size: 'large',
          },
          {
            type: 'gallery',
            images: [
              { src: '/safedrop/detected.jpg', caption: 'Parcel placement detection' },
              { src: '/safedrop/received.jpg', caption: 'Parcel placement and autolocking validation' },
            ],
            size: 'large',
          },
        ],
      },

      {
        heading: 'Engineering Challenges',
        body:
          'The primary engineering challenge involved integrating mechanical locking, embedded sensing, and cloud-based communication into a compact, serviceable enclosure while maintaining reliable autonomous operation under real-world delivery conditions.',
        bullets: [
          'Synchronising physical events with real-time cloud communication',
          'Designing a reliable servo-based locking mechanism',
          'Managing wiring density within constrained enclosure volume',
          'Reducing false triggers in vibration-based tamper detection',
          'Ensuring modular assembly for maintenance and upgrades',
          'Balancing structural strength with print time and material usage',
        ],
      },

      {
        heading: 'Results & Recognition',
        body:
          'The Safe Drop system successfully demonstrated autonomous parcel authentication, secure locking, real-time monitoring, and tamper detection within a fully self-contained IoT-enabled platform. The project was awarded 2nd place at the departmental project expo and subsequently filed for intellectual property protection.',
        bullets: [
          'Awarded 2nd place at Department Project Expo',
          'Patent published in India — Application No. 202511076582',
          'Patent granted in Germany — Patent No. 202025104999',
          'Successfully validated end-to-end autonomous delivery workflow',
        ],
      },
    ]
  },

  // ── 4. GO-TO-GOAL ROBOT ───────────────────────────────────────────────────
  {
    id: 'go-to-goal-robot',
    title: 'Go-to-Goal Autonomous Mobile Robot',
    subtitle: 'Arduino · MPU6050 · Polar Coordinate Control · Cascaded PID · Bluetooth',
    description:
      'Autonomous differential-drive robot navigating to Bluetooth-specified XY coordinates using dead-reckoning, MPU6050 IMU, encoder feedback, and a cascaded Polar Coordinate + PID controller for smooth multi-waypoint trajectories.',
    categories: ['robots', '3d-models','embedded'],
    tags: ['Arduino', 'MPU6050', 'PID', 'Dead Reckoning', 'Polar Control', 'HC-05', 'Bluetooth', 'Autonomous'],
    thumbnail: '/gotogoal/thumbnail.jpg',
    year: '2025',

    heroMedia: {
      type: 'model',
      modelEmbedUrl: 
          'https://sketchfab.com/models/33b4ae1a77044e0c9be8a3496da06ea8/embed?autostart=1&autospin=0.2&transparent=1&ui_controls=0&ui_infos=0&ui_stop=0&ui_watermark=0',
      size: 'large',
    },

    specs: [
      { label: 'MCU',        value: 'Arduino (ATmega328P)' },
      { label: 'IMU',        value: 'MPU6050 — 6-axis, I2C' },
      { label: 'Motors',     value: 'TT Gear Motors with encoders' },
      { label: 'Navigation', value: 'Dead reckoning + encoder odometry' },
      { label: 'Input',      value: 'HC-05 Bluetooth — XY coordinate input' },
      { label: 'Controller', value: 'Polar Coordinate cascaded with PID' },
      { label: 'Funding',    value: 'Mentor Funded Project' },
    ],

    sections: [
      {
        heading: 'Project Objective',
        body: 'Develop an autonomous differential-drive mobile robot capable of navigating to user-defined XY coordinates and sequential waypoints using onboard odometry, inertial sensing, and closed-loop control — without external localisation infrastructure.',
      },

      {
        heading: 'Navigation Strategy & Motion Logic',
        body: 'The initial navigation framework used a geometry-based turn-and-move approach where the robot calculated the required heading angle and Euclidean distance to the target coordinate. The robot first aligned itself toward the target heading, translated linearly, and then repeated the sequence for subsequent waypoints.',
        bullets: [
          'Coordinate input received wirelessly through HC-05 Bluetooth communication',
          'Geometric heading calculation using inverse tangent relations',
          'Sequential Turn → Move → Correct workflow for waypoint traversal',
          'Distance estimation from wheel encoder pulse integration',
          'Origin referenced at (0,0) with incremental pose updates',
        ],
        media: [
          {
            type: 'video',
            videoFile: '/gotogoal/intiallogic.mp4',
            //caption: 'Initial geometry-based navigation and waypoint traversal logic',
            size: 'large',
          },
        ],
      },

      {
        heading: 'Polar Coordinate Control Architecture',
        body: 'The navigation system was later upgraded to a continuous polar-coordinate control architecture for smoother and more stable trajectory generation. The controller computes translational distance error (ρ) and heading error (α) relative to the target, enabling simultaneous orientation correction and forward motion instead of discrete stop-and-turn behaviour.',
        bullets: [
          'Polar coordinate navigation using distance (ρ) and heading error (α)',
          'Continuous heading correction during translational motion',
          'Reduced oscillation and smoother trajectory convergence',
          'Improved waypoint transition without abrupt stopping',
          'Real-time pose estimation from encoder and IMU feedback fusion',
        ],
        media: [
          {
            type: 'diagram',
            src: '/gotogoal/logic2.png',
            //caption: 'Polar coordinate controller and continuous trajectory correction architecture',
            size: 'large',
          },
        ],
      },

      {
        heading: 'Closed-Loop Control & Sensor Fusion',
        body: 'A cascaded feedback control system combines wheel encoder odometry with MPU6050 inertial feedback to minimise heading drift and maintain stable trajectory tracking. PID-based correction dynamically compensates for wheel mismatch, surface disturbances, and orientation errors during motion.',
        bullets: [
          'Quadrature encoder feedback for wheel velocity and displacement estimation',
          'MPU6050 gyroscope integration for yaw stabilisation',
          'PID heading correction for straight-line trajectory maintenance',
          'Differential wheel velocity correction during turning manoeuvres',
          'Real-time sensor fusion for robust pose estimation',
        ],
        // media: [
        //   {
        //     type: 'gallery',
        //     images: [
        //       { src: '/gtg/mpu.jpg', caption: 'MPU6050 inertial sensing integration' },
        //       { src: '/gtg/encoders.jpg', caption: 'Encoder feedback system for odometry' },
        //       { src: '/gtg/control.jpg', caption: 'Closed-loop control electronics and wiring' },
        //     ],
        //     size: 'large',
        //   },
        // ],
      },

      {
        heading: 'Mechanical & Electronic System Design',
        body: 'The robot utilises a custom designed 3D printed chassis housing a compact differential-drive architecture. The robot is powered by encoder-equipped N20 geared motors and controlled through a TB6612FNG motor driver. The modular chassis was designed to provide stable sensor placement, reliable wheel traction, and accessible electronics integration.',
        bullets: [
          'Compact custom-designed modular chassis for rapid prototyping and testing',
          'Differential-drive mobile robot configuration',
          'N20 geared DC motors with integrated hall effect quadrature encoders',
          'TB6612FNG dual motor driver for bidirectional motor control',
          'HC-05 Bluetooth interface for wireless coordinate transmission',
        ],
        media: [
          {
            type: 'gallery',
            images: [
              { src: '/gotogoal/top.jpg', caption: '3D Model Top View' },
              { src: '/gotogoal/bottom.jpg', caption: '3D Model Bottom View' },
            ],
            size: 'large',
          },
          {
            type: 'diagram',
            src: '/gotogoal/ckt.png',
            //caption: 'Polar coordinate controller and continuous trajectory correction architecture',
            size: 'large',
          },
        ],
      },

      {
        heading: 'Experimental Validation & Results',
        body: 'The robot successfully demonstrated autonomous point-to-point navigation and multi-waypoint traversal using onboard sensing alone. Transitioning from discrete geometric motion logic to polar-coordinate control significantly improved trajectory smoothness, heading stability, and waypoint convergence accuracy.',
        bullets: [
          'Autonomous navigation without external localisation systems',
          'Stable waypoint tracking using closed-loop heading correction',
          'Reduced overshoot and smoother motion using polar-coordinate control',
          'Reliable wireless coordinate reception and execution',
          'Demonstrated practical implementation of embedded autonomous navigation algorithms',
        ],
        media: [
          {
            type: 'video',
            videoFile: '/gotogoal/smooth.mp4',
            size: 'large',
          },
        ],
      },

      {
        heading: 'Future Scope',
        body: 'Future development aims to transition the platform from waypoint-based indoor navigation toward fully autonomous mobile robotics with improved localisation, mapping, and trajectory planning capabilities.',
        bullets: [
          'Obstacle avoidance using TOF sensors and real-time path replanning',
          'Path planning using A* and dynamic trajectory generation',
          'Migration to ROS-based modular robotics architecture',
          'Autonomous docking/parking application and multi-robot swarm coordination',
        ],
      }
    ],
  },

  // ── 5. DIGITAL TIMER — 8051 ───────────────────────────────────────────────
  {
    id: 'digital-timer-8051',
    title: 'Digital Countdown Timer — 8051',
    subtitle: 'AT89S52 · Multiplexed 7-Segment · Touch Sensor · Keil µVision',
    description:
      'Countdown timer on the AT89S52 (8051) with a multiplexed 4-digit 7-segment display, TTP223 capacitive touch sensor for start/stop, push-button time adjustment, and buzzer alarm. Achieves <1% timing deviation on a 12MHz crystal — all firmware in bare-metal C.',
    categories: ['embedded'],
    tags: ['8051', 'AT89S52', 'C Firmware', 'Keil µVision', '7-Segment', 'Touch Sensor', 'Bare-Metal'],
    thumbnail: '/8051/8051-thumb.jpg',
    year: '2024',

    heroMedia: {
      type: 'video',
      videoFile: '/8051/8051.mp4',
      size: 'large',
    },

    specs: [
      { label: 'MCU',        value: 'AT89S52 (8051 architecture)' },
      { label: 'Display',    value: '4-digit 7-segment (multiplexed at 400Hz)' },
      { label: 'Input',      value: 'TTP223 capacitive touch + push buttons' },
      { label: 'Alarm',      value: 'GPIO buzzer on countdown completion' },
      { label: 'Oscillator', value: '12MHz crystal oscillator' },
      { label: 'Accuracy',   value: '< 1% timing deviation' },
      { label: 'IDE',        value: 'Keil µVision — C language' },
    ],

    sections: [
      {
        heading: 'Project Objective',
        body: 'Implement a reliable countdown timer on bare 8051 hardware — no HAL, no RTOS — demonstrating direct register manipulation, timer interrupt configuration, and multiplexed display driving.',
      },
      {
        heading: 'Hardware Design',
        body: 'The 4-digit display is driven via multiplexing at 400Hz refresh — each digit enabled for ~2.5ms in rotation, invisible to the human eye. TTP223 handles start/stop; push buttons adjust minutes and seconds.',
        bullets: [
          '4-digit 7-segment multiplexing at 400Hz refresh',
          'TTP223 capacitive touch — debounce-free input',
          'Push buttons with 50ms software debounce filter',
          '12MHz crystal for accurate interrupt timebase',
        ],
        media: [
          {
            type: 'gallery',
            images: [
              { src: '/8051/circuit.jpg', caption: 'Circuit wiring' },
              { src: '/8051/8051-thumb.jpg', caption: 'Circuit powered ON' },
            ],
            size: 'medium',
          },
        ],
      },
      {
        heading: 'Firmware Architecture',
        body: 'Written in C with Keil µVision. Timer 0 in Mode 1 (16-bit) generates 10ms interrupts as the timebase. The ISR decrements the countdown counter, refreshes the display multiplexer, and monitors debounced button state.',
        bullets: [
          'Timer 0 Mode 1 — 10ms interrupt timebase',
          'ISR handles display refresh + countdown decrement',
          'Software debounce for push buttons (50ms filter)',
          'Buzzer driven via GPIO on countdown completion',
        ],
      },
      {
        heading: 'Results',
        body: 'Achieved <1% timing deviation across a 10-minute countdown. No visible display flicker. Touch input more reliable than mechanical buttons in repeated testing. Total BOM cost under Rs.200.',
      },
    ],
  },

  // ── 6. GEAR TEST RIG ──────────────────────────────────────────────────────
  {
    id: 'gear-test-rig',
    title: 'Mechanical Gear Test Rig',
    subtitle: 'Fusion 360 · Dynamic Simulation · Torque & Efficiency Testing · Ongoing',
    description:
      'University-funded test rig for evaluating torque capacity, efficiency, and failure limits of mechanical gears. Fully designed and motion-simulated in Fusion 360. Currently in fabrication with sensor instrumentation and automated data acquisition integration.',
    categories: ['3d-models'],
    tags: ['Fusion 360', 'Dynamic Simulation', 'Torque Testing', 'Gear Analysis', 'DAQ', 'University Funded'],
    thumbnail: '/geartestrig/Gear Test Rig Assembly.jpg',
    year: '2025 - Present',

    heroMedia: {
      type: 'model',
      modelEmbedUrl: 
          'https://sketchfab.com/models/48136c9568c24f90be51efdedb6e4925/embed?autostart=1&autospin=0.2&transparent=1&ui_controls=0&ui_infos=0&ui_stop=0&ui_watermark=0',
      size: 'large',
    },

    specs: [
      { label: 'Purpose',         value: 'Gear torque, efficiency and failure testing' },
      { label: 'CAD Tool',        value: 'Autodesk Fusion 360' },
      { label: 'Simulation',      value: 'Dynamic motion analysis in Fusion 360' },
      { label: 'Instrumentation', value: 'Torque sensor, load cell, rotary encoder' },
      { label: 'DAQ',             value: 'Automated data acquisition with real-time plot' },
      { label: 'Status',          value: 'Ongoing — fabrication and electronics integration' },
      { label: 'Funding',         value: 'University Funded Project' },
    ],

    sections: [
      {
        heading: 'Project Objective',
        body: 'Develop a novel test rig to systematically characterise the torque capacity, mechanical efficiency, and failure behaviour of different gear geometries under controlled, repeatable loading conditions.',
      },
      {
        heading: 'Mechanical Design',
        body: 'All components — frame, gear mounts, bearing housings, loading mechanism — designed in Fusion 360. Dynamic motion analysis validated gear meshing behaviour and identified stress concentrations before fabrication.',
        bullets: [
          'Full assembly modelled parametrically in Fusion 360',
          'Dynamic motion analysis — verified gear meshing forces',
          'Modular gear mount — accommodates different modules and ratios',
          'Adjustable torque loading mechanism',
        ],
        media: [
          {
            type: 'video',
            videoFile: '/geartestrig/animation.mp4',
            size: 'large',
          },
        ],
      },
      {
        heading: 'Instrumentation & Data Acquisition',
        body: 'Torque sensors on input and output shafts for efficiency calculation, load cells for radial/axial force measurement, and rotary encoders for speed and slip — feeding automated DAQ with real-time plotting.',
        bullets: [
          'Input and output torque sensors for efficiency curve',
          'Load cell for radial and axial force measurement',
          'Rotary encoder for speed and slip quantification',
          'Automated DAQ with real-time data plotting',
        ],
      },
      {
        heading: 'Current Status',
        body: 'Mechanical design and simulation complete. Fabrication in progress under university workshop oversight. Electronics integration and sensor calibration are the next milestones.',
      },
    ],
  },

]
