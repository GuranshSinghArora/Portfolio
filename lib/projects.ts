// ─────────────────────────────────────────────────────
//  EDIT THIS FILE to add/update all your projects
// ─────────────────────────────────────────────────────

export type ProjectCategory =
  | '3d-models'
  | 'pcb-designs'
  | 'robots'
  | 'uavs'
  | 'embedded'

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string        // full description shown in detail view
  category: ProjectCategory
  tags: string[]
  thumbnail: string          // path in /public/projects/ OR a color string like '#0d1220'
  // For 3D model projects:
  modelUrl?: string          // URL to a .glb or .gltf file
  modelEmbedUrl?: string     // GrabCAD / Sketchfab embed URL (iframe src)
  // For video projects:
  videoUrl?: string          // YouTube embed URL (use embed format)
  videoFile?: string         // path to local video in /public/
  // Links
  githubUrl?: string
  cadUrl?: string            // GrabCAD / OnShape link
  docsUrl?: string
  // Display options
  featured?: boolean
}

export const categories: { id: ProjectCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all',       label: 'All Projects', icon: '⬡' },
  { id: '3d-models', label: '3D Models',    icon: '◈' },
  { id: 'pcb-designs',label: 'PCB Designs', icon: '◻' },
  { id: 'robots',    label: 'Robots',       icon: '◎' },
  { id: 'uavs',      label: 'UAVs',         icon: '◈' },
  { id: 'embedded',  label: 'Embedded',     icon: '◉' },
]

export const projects: Project[] = [
  // ─── 3D MODELS ───────────────────────────────────────
  {
    id: 'gearbox-housing',
    title: 'Topology-Optimized Gearbox Housing',
    subtitle: 'SolidWorks · ANSYS FEA · FDM Print',
    description:
      'Parametric gearbox housing for a BLDC motor mount, designed in SolidWorks with full GD&T drawings. Ran static structural FEA in ANSYS under 500N worst-case axial load. Applied topology optimization targeting 35% mass reduction. Final design is 38% lighter with all stress safety factors above 2.5. Fabricated in PETG via FDM.',
    category: '3d-models',
    tags: ['SolidWorks', 'ANSYS FEA', 'Topology Optimization', 'GD&T', 'FDM'],
    thumbnail: '#0d1a2e',
    featured: true,
    // To add a Sketchfab embed: paste the iframe src URL below
    // modelEmbedUrl: 'https://sketchfab.com/models/YOUR_MODEL_ID/embed',
    // To add a GrabCAD embed: paste the embed URL
    // modelEmbedUrl: 'https://grabcad.com/models/YOUR_MODEL_ID/embed',
    cadUrl: 'https://grabcad.com/',
  },
  {
    id: 'robotic-arm-cad',
    title: '4-DOF Robotic Arm — Full Assembly',
    subtitle: 'Fusion 360 · Rendered · 3D Printed',
    description:
      'Full parametric assembly of a 4-DOF robotic arm in Fusion 360. Includes all joints, servo mounts, cable routing channels, and end-effector gripper. Each link was designed with DFM constraints for FDM printing in PLA+. Rendered using Fusion\'s built-in ray tracer. URDF exported for ROS2 integration.',
    category: '3d-models',
    tags: ['Fusion 360', 'Parametric Design', 'FDM', 'URDF', 'ROS2'],
    thumbnail: '#0d1a2e',
    // modelEmbedUrl: 'https://sketchfab.com/models/YOUR_MODEL_ID/embed',
    cadUrl: 'https://grabcad.com/',
  },

  // ─── PCB DESIGNS ─────────────────────────────────────
  {
    id: 'wireless-sensor-node',
    title: 'Wireless IoT Sensor Node',
    subtitle: 'ESP32-S3 · 4-Layer · KiCad · JLCPCB',
    description:
      'Compact 45×30mm 4-layer PCB built around the ESP32-S3. Features BME688 environmental sensor, MCP73831 LiPo charger, AP2112 3.3V LDO, and USB-C programming. Designed in KiCad with controlled impedance on RF traces (50Ω coplanar waveguide). All components assembled via JLCPCB PCBA. Achieves 3-week battery life with deep-sleep firmware.',
    category: 'pcb-designs',
    tags: ['ESP32-S3', 'KiCad', '4-Layer', 'LiPo BMS', 'USB-C', 'JLCPCB'],
    thumbnail: '#0a1a0a',
    featured: true,
    // modelEmbedUrl: 'https://sketchfab.com/models/YOUR_PCB_MODEL_ID/embed',
    githubUrl: 'https://github.com/',
  },
  {
    id: 'motor-driver-pcb',
    title: 'Dual H-Bridge Motor Driver',
    subtitle: 'STM32F4 · DRV8833 · KiCad',
    description:
      'Custom 2-layer motor driver board integrating STM32F4, dual DRV8833 H-bridge, encoder inputs, and UART/SPI headers. Designed for line-following and differential drive robots. Current sensing via shunt resistors with op-amp amplification. Board fits inside a 60×40mm chassis cutout.',
    category: 'pcb-designs',
    tags: ['STM32F4', 'DRV8833', 'KiCad', 'Current Sensing', 'UART'],
    thumbnail: '#0a1a0a',
    githubUrl: 'https://github.com/',
  },

  // ─── ROBOTS ──────────────────────────────────────────
  {
    id: 'line-follower',
    title: 'PID Line-Following Robot',
    subtitle: 'STM32 · Custom PCB · Competition Build',
    description:
      'High-speed differential drive robot for track competitions. Uses an 8-channel IR sensor array with STM32F4 running a cascaded PID controller for both steering and velocity. Custom 2-layer PCB integrates all electronics. Tuned for 1.2 m/s track speed with 95% path accuracy. Placed 2nd at [Competition Name].',
    category: 'robots',
    tags: ['STM32', 'PID Control', 'Custom PCB', 'C Firmware', 'IR Sensing'],
    thumbnail: '#1a0d0d',
    featured: true,
    // Add a YouTube embed URL — use the /embed/ format
    // videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
    githubUrl: 'https://github.com/',
  },
  {
    id: 'robotic-arm',
    title: '4-DOF Robotic Arm with ROS2',
    subtitle: 'ROS2 · MoveIt · Custom Driver PCB',
    description:
      'End-to-end robotic manipulator — mechanical design in Fusion 360, custom servo driver PCB (PCA9685 over I2C), geometric inverse kinematics solver, and full ROS2 + MoveIt integration. Achieves ±2mm repeatability. Total BOM cost under ₹4,500. URDF model and all code open-sourced.',
    category: 'robots',
    tags: ['ROS2', 'MoveIt', 'Inverse Kinematics', 'PCA9685', 'Python'],
    thumbnail: '#1a0d0d',
    // videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
    githubUrl: 'https://github.com/',
  },

  // ─── UAVs ────────────────────────────────────────────
  {
    id: 'quadrotor',
    title: 'F450 Quadrotor Build',
    subtitle: 'Pixhawk · ArduPilot · Custom Frame Mods',
    description:
      'Custom F450 quadrotor with Pixhawk 4 flight controller running ArduPilot. Modified frame with 3D-printed vibration-damped motor mounts and battery plate designed in Fusion 360. Tuned PIDs for stable hover. Integrated telemetry, GPS loiter, and return-to-home. Flight time: 18 minutes.',
    category: 'uavs',
    tags: ['Pixhawk 4', 'ArduPilot', 'F450', 'Fusion 360', 'Telemetry'],
    thumbnail: '#0d0d1a',
    // videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
  },

  // ─── EMBEDDED ────────────────────────────────────────
  {
    id: 'rtos-sensor-hub',
    title: 'FreeRTOS Multi-Sensor Hub',
    subtitle: 'STM32 · FreeRTOS · UART / I2C / SPI',
    description:
      'Bare-metal + FreeRTOS firmware on STM32F4 managing 5 concurrent sensor tasks: IMU (ICM-42688 over SPI), barometer (BMP390 over I2C), GPS (UART DMA), SD card logging (FATFS over SPI), and display (SSD1306 over I2C). Demonstrates priority-based scheduling, semaphores, and DMA transfer without CPU blocking.',
    category: 'embedded',
    tags: ['STM32F4', 'FreeRTOS', 'SPI', 'I2C', 'DMA', 'FATFS'],
    thumbnail: '#0d1a1a',
    githubUrl: 'https://github.com/',
  },
]
