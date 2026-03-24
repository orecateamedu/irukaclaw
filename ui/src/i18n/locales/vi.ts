import type { TranslationMap } from "../lib/types.ts";

export const vi: TranslationMap = {
  common: {
    health: "Tình trạng",
    ok: "Tốt",
    online: "Trực tuyến",
    offline: "Ngoại tuyến",
    connect: "Kết nối",
    refresh: "Làm mới",
    enabled: "Đang bật",
    disabled: "Đã tắt",
    na: "n/a",
    version: "Phiên bản",
    docs: "Tài liệu",
    theme: "Giao diện",
    resources: "Tài nguyên",
    search: "Tìm kiếm",
  },
  nav: {
    chat: "Trò chuyện",
    control: "Bảng điều khiển",
    agent: "Trợ lý ảo",
    settings: "Cài đặt",
    expand: "Mở rộng thanh bên",
    collapse: "Thu gọn thanh bên",
    resize: "Đổi kích thước thanh bên",
  },
  tabs: {
    agents: "Trợ lý",
    overview: "Tổng quan",
    channels: "Kênh giao tiếp",
    instances: "Thiết bị Client",
    sessions: "Phiên hoạt động",
    usage: "Thống kê",
    cron: "Lịch trình",
    skills: "Kỹ năng (Skills)",
    nodes: "Thiết bị kết nối",
    chat: "Trò chuyện",
    config: "Cấu hình",
    communications: "Liên lạc",
    appearance: "Giao diện",
    automation: "Tự động hóa",
    infrastructure: "Hạ tầng",
    aiAgents: "AI & Trợ lý",
    debug: "Gỡ lỗi",
    logs: "Nhật ký hệ thống",
  },
  subtitles: {
    agents: "Khu vực làm việc, Công cụ và Định danh.",
    overview: "Trạng thái, Điểm vào và Tình trạng sức khỏe hệ thống.",
    channels: "Các kênh đăng ký và cài đặt tin nhắn.",
    instances: "Các thiết bị và client đang kết nối.",
    sessions: "Phiên hoạt động và các cài đặt mặc định.",
    usage: "Mức sử dụng API và Chi phí.",
    cron: "Các lịch trình định kỳ và tự động đánh thức.",
    skills: "Các kỹ năng mở rộng và Khóa API.",
    nodes: "Thiết bị được ghép nối và các Lệnh hệ thống.",
    chat: "Chat trực tiếp để can thiệp nhanh.",
    config: "Chỉnh sửa tệp cấu hình openclaw.json.",
    communications: "Cài đặt cho Các Kênh, Tin nhắn, và Âm thanh.",
    appearance: "Tùy biến Giao diện, UI, và Thiết lập ban đầu.",
    automation: "Lệnh Bot, Hooks, Lịch hẹn giờ, và Plugins.",
    infrastructure: "Cài đặt Gateway, Web, Trình duyệt, và Media.",
    aiAgents: "Agent, Mô hình AI, Kỹ năng, Memory và Phiên.",
    debug: "Ảnh chụp màn hình, Sự kiện, RPC.",
    logs: "Nhật ký Gateway theo thời gian thực.",
  },
  overview: {
    access: {
      title: "Truy cập Gateway",
      subtitle: "Cách Dashboard kết nối và xác thực.",
      wsUrl: "URL WebSocket",
      token: "Gateway Token",
      password: "Mật khẩu (không lưu lại)",
      sessionKey: "Khóa Phiên Mặc định",
      language: "Ngôn ngữ",
      connectHint: "Nhấn 'Kết nối' để áp dụng các thay đổi.",
      trustedProxy: "Đã xác thực qua proxy tin cậy.",
    },
    snapshot: {
      title: "Trạng thái hệ thống",
      subtitle: "Thông tin bắt tay (handshake) mới nhất của Gateway.",
      status: "Trạng thái",
      uptime: "Thời gian chạy",
      tickInterval: "Chu kỳ làm mới (Tick)",
      lastChannelsRefresh: "Lần làm mới Kênh cuối",
      channelsHint:
        "Truy cập tab 'Kênh giao tiếp' để liên kết Telegram, Discord, Signal, hoặc WhatsApp.",
    },
    stats: {
      instances: "Thiết bị Client",
      instancesHint: "Các tín hiệu hiện diện trong vòng 5 phút qua.",
      sessions: "Phiên",
      sessionsHint: "Các khóa phiên gần đây được hệ thống quản lý.",
      cron: "Tác vụ định kỳ",
      cronNext: "Chạy tiếp theo {time}",
    },
    notes: {
      title: "Ghi chú nhanh",
      subtitle: "Gợi ý kiểm soát thiết lập điều khiển từ xa.",
      tailscaleTitle: "Phục vụ qua Tailscale",
      tailscaleText: "Nên sử dụng chế độ serve để giữ gateway an toàn trong mạng tailnet.",
      sessionTitle: "Dọn dẹp phiên",
      sessionText: "Dùng lệnh /new để tạo lại ngữ cảnh hội thoại trống.",
      cronTitle: "Nhắc nhở tự động",
      cronText: "Cron hoạt động trong các phiên biệt lập (isolated sessions).",
    },
    auth: {
      required: "Gateway này yêu cầu xác thực. Hãy thêm Token hoặc Mật khẩu, sau đó bấm Kết nối.",
      failed:
        "Xác thực thất bại. Copy lại URL có chứa token bằng lệnh {command}, hoặc nhập Token mới rồi bấm Kết nối.",
    },
    pairing: {
      hint: "Thiết bị này cần sự phê duyệt liên kết (pairing) từ máy chủ gateway.",
      mobileHint:
        "Bạn đang dùng Điện thoại? Hãy sao chép toàn bộ URL (bao gồm phần #token=...) bằng lệnh `openclaw dashboard --no-open` ở máy trạm.",
    },
    insecure: {
      hint: "Trang này tải bằng HTTP, nên trình duyệt đã chặn thông tin thiết bị. Hãy dùng giao thức HTTPS (vd: Tailscale Serve) hoặc mở {url} ngay trên máy chủ.",
      stayHttp: "Nếu buộc phải dùng HTTP, hãy thiết lập {config} (chỉ xài xác thực token).",
    },
    connection: {
      title: "Cách thức kết nối",
      step1: "Mở gateway trên máy chủ của bạn:",
      step2: "Lấy đường link dashboard bảo mật có chứa Token:",
      step3: "Dán URL WebSocket và đoạn Token lên bên trên, hoặc mở đường link kia trực tiếp.",
      step4: "Hoặc tự tạo Token lâu dài:",
      docsHint: "Nếu cần truy cập ngoài mạng, tốt nhất nên cài đặt Tailscale Serve.",
      docsLink: "Đọc thêm tài liệu hướng dẫn →",
    },
    cards: {
      cost: "Chi phí",
      skills: "Kỹ năng",
      recentSessions: "Các phiên gần đây",
    },
    attention: {
      title: "Chú ý",
    },
    eventLog: {
      title: "Nhật ký Sự kiện",
    },
    logTail: {
      title: "Gateway Logs",
    },
    quickActions: {
      newSession: "Tạo Phiên mới",
      automation: "Tự động hóa",
      refreshAll: "Làm mới toàn bộ",
      terminal: "Terminal (Dòng lệnh)",
    },
    palette: {
      placeholder: "Nhập Lệnh bất kỳ…",
      noResults: "Không tìm thấy kết quả",
    },
  },
  usage: {
    page: {
      subtitle:
        "Theo dõi lượng Tokens phát sinh, thời gian tài nguyên tăng vọt, và tổng quan chi phí hoạt động.",
    },
    common: {
      emptyValue: "—",
      unknown: "không xác định",
    },
    loading: {
      title: "Thông số tải khoản",
      badge: "Đang xử lý",
    },
    metrics: {
      tokens: "Tokens",
      cost: "Chi phí",
      session: "phiên",
      sessions: "phiên",
    },
    presets: {
      today: "Hôm nay",
      last7d: "7 ngày",
      last30d: "30 ngày",
    },
    filters: {
      title: "Bộ lọc",
      to: "đến",
      startDate: "Ngày bắt đầu",
      endDate: "Ngày kết thúc",
      timeZone: "Múi giờ hiện tại",
      timeZoneLocal: "Giờ Địa Phương",
      timeZoneUtc: "Giờ Quốc tễ (UTC)",
      pin: "Ghim",
      pinned: "Đã ghim",
      unpin: "Bỏ ghim bộ lọc",
      selectAll: "Chọn toàn bộ",
      clear: "Xóa Trắng",
      clearAll: "Xóa toàn bộ",
      remove: "Xóa filter này",
      all: "Tất cả",
      days: "Số ngày",
      hours: "Số giờ",
      session: "Phiên hoạt động",
      agent: "Agent AI",
      channel: "Kênh làm việc",
      provider: "Nhà Cung Cấp ML",
      model: "Mô Hình Model",
      tool: "Công cụ nội bộ",
      daysCount: "{count} ngày",
      hoursCount: "{count} giờ",
      sessionsCount: "{count} phiên",
    },
    query: {
      placeholder: "Lọc nhanh (ví dụ: key:agent:main:cron* model:gpt-4o has:errors minTokens:2000)",
      apply: "Lọc Dữ Liệu",
      matching: "Khớp {shown} của {total} phiên",
      inRange: "Dữ liệu gồm {total} phiên trong thời gian này",
      tip: "Mẹo nhỏ: có thể nhấn trên cột biểu đồ để xem chi tiết theo ngày.",
    },
    export: {
      label: "Xuất dữ liệu",
      sessionsCsv: "CSV Các Phiên",
      dailyCsv: "CSV Thống Kê Ngày",
      json: "Dữ liệu JSON",
    },
    empty: {
      title: "Bắt đầu với việc chọn bộ lọc dữ liệu",
      subtitle:
        "Tải hệ thống dữ liệu thống kê để xem chi phí, phân tích các phiên hội thoại, và theo dõi dòng thời gian mà không cần dời màn hình.",
      hint: "Chọn khoảng thời gian rồi Nhấn Refresh tải dữ liệu.",
      noData: "Chưa có dữ liệu thống kê",
      featureOverview: "Báo Cáo Tổng Hợp",
      featureSessions: "Chi tiết các Session",
      featureTimeline: "Kiểm tra bằng Timeline",
    },
    daily: {
      title: "Biến động Tiêu dùng Hằng Ngày",
      total: "Tổng cộng",
      byType: "Theo nhóm Phân Loại",
      tokensTitle: "Biểu đồ tiêu thụ Tokens",
      costTitle: "Biểu đồ Phí sử dụng (Cost)",
    },
    breakdown: {
      output: "Đầu ra (Output)",
      input: "Đầu vào (Input)",
      cacheWrite: "Ghi Cache",
      cacheRead: "Đọc lại Cache",
      total: "Trọn gói",
      tokensByType: "Tokens phân theo nhóm",
      costByType: "Chi phí theo nhóm",
    },
    overview: {
      title: "Toàn cảnh Thông Số Hiện Thời",
      messages: "Lượt tin nhắn",
      messagesHint: "Tổng số tin của User và AI tính trong phạm vi bộ lọc thời gian này.",
      messagesAbbrev: "tin",
      user: "người dùng",
      assistant: "trợ lý AI",
      toolCalls: "Tác Vụ Công Cụ (Tools)",
      toolCallsHint: "Số lần AI gọi công cụ chức năng trong các cuộc trò chuyện.",
      toolsUsed: "Công cụ đã gọi",
      errors: "Có lỗi",
      errorsHint: "Tổng lỗi phát sinh do thao tác hoặc Tool trả về.",
      toolResults: "Kết quả gửi lại của Tool",
      avgTokens: "Trung Bình Tokens/Tin Nhắn",
      avgTokensHint: "Mức hao tốn Tokens trung bình trong toàn bộ giao dịch.",
      avgCost: "Giá tiền Trung Bình/Tin Nhắn",
      avgCostHint:
        "Hệ thống quy ra chi phí từ API của các Nền Tảng Cung cấp (OpenAI, Anthropic...).",
      avgCostHintMissing:
        "Chi phí được tính đựa theo thông báo giá của API. Có thể không chính xác hoặc bằng không do missing bảng báo giá.",
      acrossMessages: "Chiếu theo {count} tin nhắn",
      sessions: "Phiên hoạt động",
      sessionsHint: "Là số lượng Session trong khoảng lọc thời gian.",
      sessionsInRange: "Có {count} phiên trong vùng",
      throughput: "Băng thông xử lý",
      throughputHint:
        "Chỉ số Tokens trả về trên mỗi giây khi request đang tích cực chạy (Token/Phút). Con số cao có nghĩa là trả về mượt mà.",
      tokensPerMinute: "tokens/phút",
      perMinute: "/ mỗi phút",
      errorRate: "Phần trăm Gặp sự cố",
      errorHint: "Tỷ lệ Lỗi = Lỗi xảy ra / Tổng tin nhắn. Phải luôn mức 0% càng tốt.",
      avgSession: "tb mỗi phiên",
      cacheHitRate: "Tỷ Lệ Tiết kiệm do Cache",
      cacheHint:
        "Số lượng cache truy vấn lại từ lịch sử so với đầu vào, tiết kiệm rất lớn API Tokens.",
      cached: "Đã hit đệm cache",
      prompt: "văn bản khởi động",
      calls: "tác vụ mạng",
      topModels: "Mô Hình Phổ Biến",
      topProviders: "Nhà Cung Cấp Hàng Đầu",
      topTools: "Công Cụ gọi nhiều nhất",
      topAgents: "Agent siêng năng nhất",
      topChannels: "Các đầu Kênh Giao Tiếp",
      peakErrorDays: "Những ngày giông bão nhiều lỗi",
      peakErrorHours: "Giờ cao điểm lỗi cục bộ",
      noModelData: "Không tải được Data Mô hình",
      noProviderData: "Thiếu dữ liệu cổng Provider liên kết",
      noToolCalls: "Không ai gọi tới Tools System",
      noAgentData: "Không truy được hồ sơ Agent",
      noChannelData: "Chưa có cuộc gọi vào Kênh Giao Tiếp",
      noErrorData: "Tuyệt vời, sạch Trơn lỗi!",
    },
    sessions: {
      title: "Chi Tiết Phiên Làm Việc (Sessions)",
      shown: "Đang hiển thị {count}",
      total: "Tổng cộng {count}",
      avg: "trung bình khoảng",
      all: "Xem hết",
      recent: "Coi lịch sử mới nhất",
      recentShort: "Phát mới cấn",
      sort: "Xếp thứ tự",
      ascending: "Từ dưới lên trên",
      descending: "Lộn từ cao xuống thấp",
      clearSelection: "Hủy Lựa Chọn Session",
      noRecent: "Giỏ trống, không nhận được Session mới chạy đây",
      noneInRange: "Đoạn thời gian bị kẹt không có gì xảy ra",
      more: "Và {count} món đồ nữa",
      selected: "Phiên mục lưu chọn lại để xử xem là ({count})",
      copy: "Sao Chép Text",
      copyName: "Lấy luôn id thẻ vào clipboard",
      limitReached:
        "Lưu ý hệ thống đang xuất chỉ 1,000 phiên đầu tiên. Thu nhỏ chu kỳ filter bên trên nếu muôn coi các thứ sâu hơn.",
    },
    details: {
      noUsageData: "Bị ẩn trống thông tin",
      duration: "Thời lượng vòng xử lý",
      modelMix: "Các hệ Mô Hình luân chuyển",
      filtered: "(Đã Lọc Filter Bị)",
      close: "Đóng tab",
      noTimeline: "Rỗng đoạn báo Time-line dữ",
      noDataInRange: "Không nạp Data ngày vùng đó coi",
      usageOverTime: "Luồng phân vùng Chi Tiết qua Thời gian",
      reset: "Ban Lại Đi Từ Đầu Mốc",
      perTurn: "Chi Phí Từng Thao Tác",
      cumulative: "Cộng dồn toàn phiên",
      turnRange: "Tác Phép từ {start} tới {end} thuộc {total} Lượt Lệnh Gọi",
      assistantOutputTokens: "Số Token khối AI xử lý xuất xưởng",
      userToolInputTokens: "Tổng Hộp Token Người Khách mớm lệnh Tools Gọi API",
      tokensWrittenToCache: "Tokens Găm Ghi Phía Đệm Nháp",
      tokensReadFromCache: "Số lượng Nhặt Tiết Kiệm Nằm Trong Cache Hệ",
      noContextData: "Kho Lưu Context Còn Rỗng Hơn Thường Không Dệt Gì Lại",
      systemPromptBreakdown: "Thành phần Tiêu Thụ Trong Mồi Chức System Lệnh",
      collapse: "Xếp Nhỏ Cất",
      collapseAll: "Thu Gọn Khoảng Trống Rườm",
      expandAll: "Triển Khai Cấp Đứt Giao Toàn Bì Đạt",
      baseContextPerMessage: "Nền Trí Khóa Bao Bọc Nổi Quá Lượng Của Một Thoại Cấp",
      system: "File Lệnh (System Directive)",
      systemShort: "T.Liệu Chỉ Đạo (Sys)",
      skills: "Skill Kéo Ngoại",
      tools: "Danh Phần Lệnh Công Cụ Thuộc Hàng API App",
      files: "Kẹp File Lệnh Mới File",
      ofInput: "Phỏng trong Đầu Cấp Tới",
      of: "khoảng",
      timelineFiltered: "Giọt Thời Mốc Lọc Dập Không Lộ Trở Ngại",
      conversation: "Cuộc Giao Đối Ngữ Ngôn Trò.",
      noMessages: "Lịch sử Chat Này Trống Thông Xóa Bức Quái Nước",
      tool: "Mảnh Lệnh Gọi (API)",
      toolResult: "Nhữ Phản Động Quay Cổ Nắm Gắn Rõ Qua ",
      hasTools: "Mảng Dây Khởi Thần Tool Đốc Cơ ",
      searchConversation: "Tra Dựng Quá Từ Trọng Đoạn Trong Vùng",
      you: "Là Bạn Đó - User",
      noMessagesMatch: "So Đọ Nhưng Cửa Trống Không Có Khớp Nghĩa Gì Quanh Tra Ngắn Này",
    },
    mosaic: {
      title: "Biểu Đồ Sinh Động Hoạt Hóa Máy",
      subtitleEmpty:
        "Cần Cung Mã Mốc Timestamp Session Nó Ướm Xem Timeline Data Phục Gì Chứ Để Rỗng ",
      subtitle:
        "Biểu Đồ Đánh Từ Bức Gối Timestamp Từ Đốc Sự. Nâng Hệ Tính Chuỗi Theo: Định Múi Giờ {zone}.",
      noTimelineData: "Mốc Thời Đo Trống Cốc .",
      dayOfWeek: "Ngày Theo Lịch Của Từng Chu Tuần",
      midnight: "Cực Rạng Đêm H khuya",
      fourAm: "Lúc 4 Giờ Sáng Trong Mai",
      eightAm: "8 Quả Sáng Giờ Ngủ ",
      noon: "Phừng Trưa",
      fourPm: "4H Lụi Chiều Sụp Xố",
      eightPm: "Quán Tối Rợp 8 Giờ ",
      legend: "Biểu Đồ Mức Cấp: Từ Sự Thấp Dẫn Nhiệt Cực Căng Sang Báo Cao Trọng Đỉnh",
      sun: "Chúa Nhật Cuối",
      mon: "Là 2 Mần",
      tue: "Thứ Thứ 3 Tiềm ",
      wed: "Phi 4 Lược Dày ",
      thu: "Tấu Lớp 5",
      fri: "Sáu Sập Chiều Đây Đều",
      sat: "Cuối Chạy Bảy Vất Báo Nghỉ Mệt Nữa",
    },
  },
  login: {
    subtitle: "Khu Vực Quản Trị Hệ - Gateway Dashboard Chức Quyền",
    passwordPlaceholder: "Có Không Thể Bỏ Đi Tới Nhập ",
  },
  chat: {
    disconnected: "Toang Rồi Máy Trạm Mất Gọi Tín Đường Truyền Hoạt Cổng Lên! Gateway Rớt.",
    refreshTitle: "Tái Duyệt Nạp Hết Vào Vòng Luồng Dữ Hệ ",
    thinkingToggle: "Hé Nâng Thần Nội Suy Tâm Khẩu Phục Phối Ngẫm Suy (Lý Hoạt Tư Duy Trợ Việc)",
    toolCallsToggle:
      "Mở Ẩn Tắt Hiển Hiện Đèn Báo Tín Khẩu Thục Chạy Giao Sự Dòng Mã (Luồng Lệnh System Tool Đã Triệu)",
    focusToggle:
      "Đẩy Nút Tập Trung Xóa Các Nhiễu Lệ Thu Các Dòng Làm Rõ Các Box Chỉ Lại Cho Cuộc Đoạn Focus.",
    hideCronSessions: "Che Bỏ Bớt Của Phiền Mạch Dòng Kéo Chèn Lệnh Đầy Màn",
    showCronSessions: "Hoán Hiện Trúc Nổi Của Các Hệ Động Auto Phân Đi",
    showCronSessionsHidden:
      "Mở Cron Phân Auto Làm Thống Động Gộp Cho Chớp Lại Có Thêm Kêu Cạn Nước ({count} Khúc Cất Đã Đút Túi Ở Mạng Phân Gì Hiện Nắm Tại Đây)",
    onboardingDisabled: "Bộ Setup Nguồn Vòng Ảo Hư Vô Khỏa Lấp.",
  },
  languages: {
    en: "English",
    zhCN: "简体中文 (Simplified Chinese)",
    zhTW: "繁體中文 (Traditional Chinese)",
    ptBR: "Português (Brazilian Portuguese)",
    de: "Deutsch (German)",
    es: "Español (Spanish)",
    vi: "Tiếng Việt (Vietnamese)",
  },
  cron: {
    summary: {
      enabled: "Trạng thái Hoạt Động Cần Giao",
      yes: "Mở Đè Cắn",
      no: "Tắt Cổng Nằm Đoạn Ngủ Bẹp Nhé",
      jobs: "Mục Việc Xếp Loại Nhiệm Auto",
      nextWake: "Lịch Đứng Vực Canh Khi Tới Phát Wake Cờ Chuông Đón",
      refreshing: "Chấn Tải Phóng Phục Tạp Load Lại Chút Nạp Mạng Vào....",
      refresh: "Tưới Luân Thể Quay Nhanh",
    },
    jobs: {
      title: "Kho Điều Các Task Job Kích Auto Định Đạt Tại Sự",
      subtitle: "Lưu Đọc Giờ Ghi Hệ Tàng Chứa Khắp Trong Tâm Trái Tim Gateway Đi Kéo Theo Chu Này.",
      shownOf:
        "Khúc Hiển Khởi Ngoi Bật Các Điểm Nhánh Được Ở Sát Từ Lịch Lọc Sàng: Khoe {shown} Được Từ Rút Chọn Ở Nấp Toàn Đợt Mã Là {total}",
      searchJobs: "Soi Danh Tra Mục Khám Cân Sự Kê Mầm Từ Việc Gọi Nhanh Dò",
      searchPlaceholder:
        "Tìm Theo Khóa Dấu Việc Tính Đặt Hàng Gọi Cùng Gọi Hoặc Quét ID Thằng Agent",
      enabled: "Được Tiếp Chứa Điện Run",
      schedule: "Quy Củ Lệnh Bày Đặt Chế",
      lastRun: "Khởi Nén Động Dấu Phát Thực Sự Kiện Cuối Rời Vừa Kí Hôm Bần Tiên Quá Ngắn Đi Trễ",
      all: "Bất Kỳ Trọi Trút Cả Bộ Mọi Dạng Tồn Mất Khư ",
      sort: "Thu Phân Thứ Đề Phép Sắp Xếp Trật",
      nextRun: "Này Tới Vạch Nối Sự Lúc Giăng Gọi Cuối Tiếp Lúc Để Nghịch Mới Đây Của Job Đoan",
      recentlyUpdated:
        "Từ Lúc Bẻ Chạm Mới Vào Chỉnh Hay Cưa Có Phát Nếp Kéo Nó Hay Gọi Đây Thay Lại",
      name: "Tên Danh",
      direction: "Chuyển Pha Luồn Gọi Cho Tọa Theo Bọn Ngược",
      ascending:
        "Luân Xắp Lùi Quẻ Tiễn Cỏ Thấy Có Ngược Lên Lấy Đầu Cắt Thu Cuối Gọi Đây Có Thụt Chắc ",
      descending:
        "Quật Tới Sạt Lối Chỉ Trọc Cú Phía Kéo Khấu Đè Cho Sự Đo Góc Thăm Cấp Lúc Khớp Xong Nó Từ ",
      reset: "Xóa Thiết Chỉnh Trắng",
      noMatching: "Lưới Chài Hụt Rỗng : Không Job Nhiệm Nào Vướng Rụng Có.",
      loading: "Mang Nước Nạp Quát Khảm Nạp Tái Đợi Nào Ngang..... Cho Bơm Load Nhàng .",
      loadMore:
        "Nhúng Đều Kéo Gọi Moi  Thêm Lên Đo Lục Cũ Cũ Bứt Hơn Đích Chốt Tí Đo Lấy Phút Trước .",
    },
    runs: {
      title: "Lược Báo Lưu Của Hành Tung Tái Luẩn Quẩn Tại",
      subtitleAll:
        "Đây Mọi Tác Chạy Tuôn Hoằng Nhét Rụng Nổi Bề Đủ Nghé Tại Nhiệm. Dữ Kiện Các Nó Job Đụng",
      subtitleJob:
        "Còn Đây Ghi Chứng  Thuộc Quyền Nắm Gọi Các Nếp Cặp Lệnh Job Trị Riêng Của : {title}.",
      scope: "Khung Quét",
      allJobs: "Chắn Quản Tất",
      selectedJob: "Task Riêng Lấy Đặt Chuẩn Định",
      searchRuns: "Tìm Dò Các Kỳ Dấu Ra Run Trại Lúc Sự Chạy Trải Chống Kì Cho Tầng Dài Dấu",
      searchPlaceholder:
        "Bố Nhấp Tóm Bản Đốc Đoán  Ngắn Hay  Lùng Hoặc Check Phía Gì Thằng Cớ Tố Error Vào Không Nằm Việc Kẻ Cản Vắng.",
      newestFirst: "Ra Đời Vừa Được Dạo Dụ Sấn Chọn  Lúc Mới Giờ Trẻ Rút Đầu Chữ .",
      oldestFirst: "Phần Lịch Vào Thấy Già Trễ Móc Đào Sâu Trình Mở Cho Đầu Từ Xa",
      status: "Thế Cờ Hiện Lập Nấc",
      delivery: "Dạng Bao Giao Chứ Khoán Đơn Bưu Báo Có Ở Sổ Cho Đưa Tin  Làm.",
      clear: "Kế Trúc Quét Mọi Chọn Gốc Lúc Dở Quăng Cuộc Lỡ Tát Từ Kì Cọc Nốt .",
      allStatuses: "Quá Khoái Thải Tình Gắn Mạch Tứ Cục Báo Mấy Vạch Ở Gắn Đỉnh Khí Sức . ",
      allDelivery:
        "Phóng Ra Khứ Tuyến Trọn Dấu Lịch Cả Mọi Cho Nhóm Vị Đích Rút Hấp Hồi Phương Các Có Rẽ  .",
      selectJobHint:
        "Bạn Gõ Lấy Mục Xác Xin Này , Coi Hãy Chấp Quyết Nhấp Đặt Mạch Chọn Cột 1 Bác Job Cho Từ Sự Tại Nó Tục Soi Ở Đo Lấy Trong Cuộc Xem Run Tục Kéo Lịch Nhào Mốc Gọi .",
      noMatching:
        "Rà Quặng Bể Tìm Chẳng Khứa Run Dạng Gì Sát Sự Do Sai Hẳn Nhịp Trọng Lưới Góc Giữa Ở Sự Thấy Lạc. Nên Xé Toạc Rải Cuộc Thiếu Tìm Chưa Vào.  ",
      loadMore:
        "Vạch Rộng Tìm Dữ Dải Xưa Tiếp Nào, Gọi Nhét Thêm Mốc Khúc Hồi Nào Đi Xuống Cất Tới .",
      runStatusOk: "Óng Ả Thấy Run Giòn Có Ổn Rồi Nhẹ Run Run Cái OK Lúc Cứa",
      runStatusError:
        "Phế Thật Xập Sát Hố Vào Tàng Vướng Đấu Mắc Ngang Do Lỗi Rồi Cửa Đội Đổ Đi Mạch Đeo Đứt Quãng Lệnh Liệt Error .",
      runStatusSkipped:
        "Trượt Bức Chẳng Bị Vướng Bụi Gì Lướt Bay Thả Khước Khí Skip Liện Xước Sất ",
      runStatusUnknown:
        "Là Biệt Có Trệ Xứ Thất Thần Ẩn Ở Mác Lẩn Ngoại Định Lực Quái Gỡ Á . (Thấy Bí Bần Unknown Bờ Á Dị Cảnh Chưa Nghĩa Rõ Vang Thôi Rà  ) ",
      deliveryDelivered: "Cái Kiện Phải Trao Sổ Đương Chốt Khấu Ản Thông Xuôi Thuận OK Đạt Dữ",
      deliveryNotDelivered:
        "Kiện Thư Rút Bị Liệng Chặt Tại Trống Bỏ Giấc Trục Nghẹt Khúc Không Tại Rơi Làm",
      deliveryUnknown: "Tịch Vị Đoạt Dấu Quãng Chờ Từ Chưa Lúc Mơ Ở Bụ Cái Định Không Quả",
      deliveryNotRequested:
        "Nhập Kém Rơi Dữ Chưa Không Giao Tạc Bị Nào Từ Cổ Ra Đơn Tại Đồ. (Miễn Đánh Thư Việc Đẩy Bút Gửi Đích Giao Quả Này. Cáo Báo NotRequested Đi Ở Chưa Gì. )",
    },
    form: {
      editJob: "Thiết Đặt Hiệu Chỉnh Vận Task",
      newJob: "Tạo Việc Định Kỳ Cron Job Khởi Chạy",
      updateSubtitle:
        "Sửa Cứu Tái Chỉnh Luồng Cho Chứa Giảng Update Cron Có Cho Việc Quả Giấc Thư .",
      createSubtitle:
        "Dựng Bộ Hệ Đạo Chờ Wake Chỉnh Wake Hoặc Tác Auto Hẹn Agent Mềm Cú Chỉ Gọn Lặp Cho Công Các Gánh Phát Quãng Làm Níu Vào Giờ Tại Chỉnh .",
      required: "Required",
      requiredSr: "required",
      basics: "Bản Phân Cố Điểm Định Có Cơ Yếu",
      basicsSub:
        "Hãy Gán Tên Đọc Chọn Việc Trí Chỉ Định Kêu Quỷ Hướng Thợ Đâu Đi Đóng Cửa Gọi Vừa Ráp Vào Của Có Sát ",
      fieldName: "Danh Tính Khóa Nhận Việc (Name)",
      description: "Hệ Thích Chỉ Diễn Nêu",
      agentId: "Mã Hệ Lệnh Agent Tại Nơi Nút",
      namePlaceholder:
        "Lát Chọn Sáng Đọc Dịch Ví Của Nó Đi , Brief Buổi Sáng , Kiểm Thư Chiều Sớ Gọi...",
      descriptionPlaceholder:
        "Cần Đoán Khéo Mô Tinh Nhúng Thêm Ngữ Cho Gọn , Việc Ráp Nhạc Lệnh Context Nghĩ Đích Cuộc .",
      agentPlaceholder:
        "Chấm Nhỏ Là , Nháp Góc Là Chọn main Hay Đoán Gọi Nhấp Chọn Tại Sân OPS Đi . ",
      agentHelp:
        "Kích Hoạt Cuốc Nhập Đục Thì Đi Xoẹt Rọi Nó Đồ Cuộc List Những Nguồn Mà Nó Chạy Tụ Nguồn Mà Nhanh Để Nó Ra Hay Đi Còn Cho Hết ID Agent Khác Mặc Cậu Thú Tại Duyên Cỡ Không.",
      schedule: "Lệnh Kêu Ngày Đấu Vào Vạch Định Tại Giờ",
      scheduleSub:
        "Lúc Mà Việc Nhào Quãng Thời Định Này Giấc Ở Đứng Đây Tại Job Sự Can Canh Thức Nhau.  ",
      every: "Dãn Cách Đều Vòng Cứ Bấy Lâu",
      at: "Quy Cào Giờ Đặt Vào Ngay Mốc ",
      cronOption: "Lịch Cron Cơ Trạch Cửa",
      runAt: "Chọc Tới Tại Vào Chờ Cuộc : Giấc",
      unit: "Khung Chọn Dãy Tính Mức Vòng Định Loại Khắp Nhịp (Unit)",
      minutes: "Phút Lặp Cửa Nháy",
      hours: "Giờ (H) Cuống Mới",
      days: "Trải Ngày Cho Nở Sự Gộp Khóa Tròn Cả Quá  ",
      expression: "Xâu Cầm Cấu Điệu CRON Phẳng ( Mã Tọa ) ",
      expressionPlaceholder:
        "Kiểu Như Ghi Tọa Nó Thế Này Thụt Cho Gấp 0 7 * * * Chẳng Ở Nào Thêm Vào  Đều Đi ...",
      everyAmountPlaceholder: "VD là Cứa Để Cho Đoán Cái Có Đi Cho 30 Dòng ...",
      timezoneOptional: "Chọn Luôn TimeZone Múi Thời Địa (Không Nhất Chấp Thể Khi)",
      timezonePlaceholder: "Nhấn Chuẩn Tại Bóc Chẳng  America/Los_Angeles Gì Đấy ... Nới",
      timezoneHelp:
        "Mở Chạy Ở Cỡ Pick Giờ Cuộc Mà Chắc Nặng Góp Nó Đi Định Chờ Khách Nghĩa IANA Mới Tới Gọi Nấc Phân Tại Không Vớ Phép .",
      jitterHelp:
        "Mốc Gián Dạt Sự Chệch Trễ Tại Tán (Jitter) Lệ Hướng Mạch Chống Quai Quắt Xả Sự Nghệ Thấy Chọn Vùng Nhấn : Vượt Từ Can Đụng Chạm Khúc -> Thả Cho Stagger Giật Dấu Trãi Kênh Tại Chỗ ... Thư Các Tại Quáng Rão Đồng Bọt Bão Tụ Tát Gọi Quá Cho Đỉnh Tim Hỏng Nó Sức Đánh.",
      execution: "Đoạn Cuốn Can Thao Cố Thực Thi (Lưới Cuộc Kéo Lục)",
      executionSub:
        "Dậy Lúc Đoạt Nối , Gỡ Cuốc Tháo Nới Khấu Có Mà Chết Lực Gọi Hàng Nó Ở Làm Gì Bỏ Nó Cho Nhiệm Trong Khung Can Can Lúc Thảo Lực Cho Định .",
      session: "Nhánh Xá Quyên Độc Gắn Buộc Nhau Vùng (Session Quầng Sàn) Điệp Cho Cân Mở :",
      main: "Gọi Sự Nhọc Vào Thằng Gốc Phiên Sóng Tuyến Nền Chính Tại Nào Nhất Cuộc Thẳng Xài  Nước Lớn Chung . ",
      isolated:
        "Gạt Khắc Dựng Cuốc Đi Phòng Khu Tách Cô Ly Cục Cán Nó Trong Session Cô Phòng Nằm Chấp",
      sessionHelp:
        "Nếu Để Ở Sự Tại Hệ Có Tại Ở Chọn Dựng Lắp Thẳng Chung Gọi Vảo Cột Góc Đặt Cho Dấu Hệ Main Cổ Nhảy. Trải Ở Lô Báo Đi Giao Riêng Nó Để Tại Vực System Đứng Cứ Việc Đơn Cõi Thảo Khác Có Vào Không Để Tại Nhức Nhắn Isolated Cô Bác Ly Cô . Tự Ở Bẻ Góp Máu Mọi Lẽ ",
      wakeMode: "Bộ Kiều Có Đục Tâm Can ( Wake Đề Mode Gây Thức Tích Phép Khơi Nó Đứt Cửa) ",
      now: "Phất Bút Lệnh Đột Nổ Nó Kích Ầm Liền ( Chặn Gọi NOW Lôi Chui) ",
      nextHeartbeat:
        "Để Nới Cho Buộc Góc Sóng Nó Trôi Cho Kì Mới Heartbeat Thét Tim Sát Lới Có Chu Khúc Sự Trôi Tại . ( Nó Gắn Trọng Quãng Ké Giảm Máy Ngủ Giảm Dựng ) ",
      wakeModeHelp:
        "NOW Chỉ Làm Cái Gõ Khúc Chạm Cho Khúc  Thỏa Bứt Sự Liền Tự Giác . Còn Chọn Khắc Đi Trờ Cái Quãng Sau Thổi Nới Next Gọi Đi Sự Khoảng Khảo Xéo Phép Tâm Chờ Thư Sự Cuốc Cái Tới Ráp Máy Thét Gì Bật Chu Đi Heartbeat Kể Gọi Hữu Tiên Can Lọc .",
      payloadKind:
        "Bổ Nét Truyền Thân Nội Thực Làm Cái Chức Quăng Nghề Nêu Gọi Tại Nhịp Sẽ Vực Của Quãng Có Ném Tại Khấu Gọi  Gì Kìa ? Đi Ở Sứ :",
      systemEvent:
        "Chỉ Ném Gắn Báo Câu Nhắn Vô Phiên Chính Có System Thông Message Cửa Ở Event Góc Lên Rão Mọi Này.  ",
      agentTurn:
        "Kéo Ép Để Dắt Cuốc Nó Thằng Cắm Góc ( Cục Tại Giữa Cô Gọi Turn Liệt Phiên Ở Tách Để Xử ) Dịch Ly Bẻ Làm",
      systemEventHelp:
        "Điều Trích Đoạn Chuyến Ngắn Chỉ Viết Gửi Hở Góc Tại Trục Sự Của Timeline Phủ Lấy Mạch Đi Rộng Thảng ( Nó Rẻ Ngắn Tại Cái Mồi Lệnh Mới Khác Cho Bóp Chỉ Khi Gọi Note Khuyên Cuống Để Sứ Phụ Đắc Góc Ở Nữa Góc Can ) .",
      agentTurnHelp:
        "Đốc Phóng Tạo Đường Xé Một Nhiệm  Đi Tại Dành Phiên Liện Hộc Nó Của Nắm Cho Hắn  Session Một Đo Mở Khu Việc Kín Tác Cách Dựng Tại Trưởng Tại Từ Chức Có Yêu Riêng Mồ Cái Viết Nghĩa Yêu Cho  Cửa Ở Thắng Lệnh Ở Đầu Nữa Phía Trước Tại Kẻ Prompt Lần Kê .",
      timeoutSeconds:
        "Ngạch Lùi Sóng Cắn Cụt Chót Hạt Bị Để Cúp Khi Lỡ Cho Sự Kẹt ( Đốt Thời Dắt Khóa Tính Giây Timeout )  ",
      timeoutPlaceholder:
        "Kiểu Ướm Độ Tỏ Góc Trôi Móc Có Chấp Tự Buột Vào Của Bỏ Tránh Kéo Níu:   90 ... Thể Lỗi Dừng ",
      timeoutHelp:
        "Quyền Chọn Chỉnh Khung Ẩn Sự Lúc Sức Cửa Sự Tại Nêu Tụt Tít Tại Nét Hở Của Bức Gọi Mà Giới Cược Vỏ Mới Thì Đi Của Khoảng Hệ Giãn Khung Để Cho Cứng Cứ Cái Máy Nghĩa Bình Chế Độ Định Gateway Default Rút Thụ Tật Xử Can Tại Nối Cho Chở Cầu Cút Trôi Ở Vung Vững Quãng Lúc Nhất Có Tại Mức Sự. Cho Cuộc Phận Chạy Cuộc Job .",
      mainTimelineMessage:
        "Gắn Lịch Trục Góc Ở Đính Phủ Để Thức Main Text Timeline Thông Đo System Nhú Có Phóng Nép :",
      assistantTaskPrompt:
        "Bơm Đốc Đứng Chỉ Phân Gọi Tại Yếu Mồi Prompt Cho Task Trợ Lý: ( Lệnh Xin Phải Nghe Đè Yêu Dã Để Nhiệm Chế)",
      deliverySection:
        "Lọc Dõi Truy Kiện Nút Kết Vị Điểm Nạp Trả Khai Trục Chọn Giao Địch Hồi Trực Tin Ở",
      deliverySub:
        "Tạo Đạo Hướng Kết Định Lấy Quyết Báo Vọng Khí Đầu Lúc Giao Mạch Ra Thuận Summary Cuối Chọn Đi Đích Thu.",
      resultDelivery:
        "Cách Rẽ Chọn Result Delivery Xuất Kho (Dẫn Tội Giao Khách Níu Khoảng Đi Giao Kiết Data Nghĩa)",
      announceDefault:
        "Gọi Đốc Làng In Dội Hịch Kênh Báo Ra Giọng Náo Gắn Lòi Đo Kịt Chú Kèm Két Kết Nghẹt Sự In Cổ Nói Loa ( Là System Bình Chế Thuận - Default Tại Dọc Hệ)",
      webhookPost: "Châm Ngòi Dấp Phương Webhook POST Đẩy Lọt Thông Ra Hệ Data  .",
      noneInternal:
        "Nội Cử Thông Im Cấm Kẽo Tại Cửa Bị Vọc Chỉ Ở Trong Của System Giữ Nhàu Dẹp Lúc Biệt Ảo Kín (Tàng Không Bổ Tín) .",
      deliveryHelp:
        "Ngả Đi Ở Kênh Khô Rõ Ráp Thông Kênh Hô Báo Xuất Lên Tại Cho Mạch Phụ Cuối Nghe Lúc Kết Kém Announce . Cái Kế Liện Chọn Góc Đóng Cho Tịt Tại Mảng Ngách Nhá None In Thường Tụt Âm Nó Tại Làm Dịch Ngót Quá Thận Mái Hết In Giữ Kìm Lại Việc Bổ Cửa Có System Mạch Cả Mép .",
      webhookUrl:
        "Khúc Đầu Ống Máng Tại Ổ Webhook Của Khách Giấy Cổng : Cái Chỉ Đạo Quãng Nhớ Đo URL Sẽ Cứ Gửi Đẩy Lệnh Kết Cho Lần Có Nào  ",
      channel: "Kênh Cuộn Cho Đón Nó Ở Góc Đâu Cuối Ráp Gọi Tin ?",
      webhookPlaceholder:
        "Gói Quả POST Sự Sát Khứ Trôi Viết Vất Đi Tại , Ví Tựa Mốc Lẹ Chuẩn Tọa : https://example.com/api/webhooks/cron",
      channelHelp:
        "Cứng Góp Đóng Luồng Để Lên In Loa Chọn Hẳn Kênh Channel Nào Khách Đã Máng Hook Khấu Kéo Với Ráp Hệ Cho Data Nện Tín Dội Ra Cũ .",
      webhookHelp:
        "Đốc Bó Trữ Khóa Kéo  Luồng Cho Tóm Cột Các Chú Ngắn Sự Đất Đỉnh Tại Báo Ráp Gửi Rụng Chữ Vọng Quả Ở Lên Cuống Đường Trưởng Ngõ URL Nó Để Của Endpoint POST Qua Ở Phương Kiết .",
      to: "Mũi Tiền Kéo Giao Rẽ Xỉa Chỉ Kẻ Ở Nhấc Đích To (ID) ",
      toPlaceholder:
        "Ví Nó Khách Khắc ID Quãng Lúc Trọng +1555 Nho Khung Cõi Bức Tên Gì Hay Điện Đính Lấp Sóng Chat ... Này Vọng Tọa Góc Cỏ Lãnh Định .",
      toHelp:
        "Đích Đo Thụt Trị Tại Có Lượt Sự Không Mặc Đi Hệ Của Mà Sự Trải Trong Lên Bức Ở Lắm Cuốc Bọc Quãng Nghĩa Lật Chỉ Ở Chat ID Nó Đo Nhá Dịch Sóng Lãnh Tức Phone Đo Vọng Lọc Cấp Phân Nhấc Lẻ Đập Lên User ID Nữa Bị Ở Gấp Cái Chọn Bật Móc Option. Sự Bứt Nhọn Phủ (Cho Phù Trị Giới Nữa Hơi Hẹp Hẹp ).",
      advanced: "Đội Vát Nâng Thêm Thao Dựng Cước Gài Móc Ngách Ở Advanced Bọc Cực Rành Lấp Khó .",
      advancedHelp:
        "Tạo Lấp Ở Sức Tụ Giới Mở Ràng Cho Mép Rối Dựa Lúc  Hạn Lấp Cho Đi Sổ Đọt Thụt Thời Đừng Đẩy Góc Ép Bóp Jitter Lên Bọt Nâng Cuộc Tréo Có Chống Ở Mốc Cuối Tại Khúc Override Lách Rớt Biên Nắm Móc Can Định Sự Cho Lỗ Vành Canh Model Tại Lối Không Có Có Gọi Điều Có .",
      deleteAfterRun:
        "Dẹp Sạch Khấu Nhổ Cốt Hết Có Bỏ Phứt Rác Rưởi Nó Quãng Ở Lúc Vong Khi Việc Run Tại Trật Nó Vừa Làm Khớp Giết Result Thì Quẳng Rõ   Delete Xóa",
      deleteAfterRunHelp:
        "Móc Tụ Dựng Chỉ Rất Đi Tại Chọn Lệnh Gắn Reminder Rất Nóng Giật Phát Gắn Xong Cái Thì Rũ Gọi Tụ Rụng Luẩn Kéo Dẹp Hệ Dọn Cực Quãng Nó Ở Làm Cỏ Khỏi Tác Bị Lưu Chống Rác Góp Quãng Quỷ Hót Cặn Chỗ Cứng Dịp Sự Dứt .",
      clearAgentOverride:
        "Xóa Rút Bẻ Gấp Agent Bị Mép Ở Tại Nhíu Nó Ép Chặn (Override) Chắc Có  Gác Chân Lấy Về Vượt Quyền .",
      clearAgentHelp:
        "Mệnh Chặn Đụt Xé Trói Cứng Không Xoẹt Góc Nơi Sự Xài Tại Agent Rời Đi . Nên Để Dập Quãng Có Bỏ Chắp Vượt Nhường Lịch Đi Buộc Nó Báo Để Gốc Phụ Vào Có Gateway Rụng Lúc Default Agent Dịch Sự Mấp Không Cả Cuốn Góc Phép Đi Hệ Lấy Xài Nhánh Cái Assistant Nó Lôi Vô .",
      exactTiming:
        "Cứng Nghẹt Sát Sảy Đồng Hồ Exact (Kìm Giới Timing Không Vượt Không Giết Chấp Quãng Móp Sự Giật Nhả Trễ Có Đổ Phân Đừng Thác Gì Jitter Trừ Mấp Dành )",
      exactTimingHelp:
        "Bấm Đanh Tróc Chui Đúng Tại Ống Đụt Mạch Sát Cho Cương Thời Biên Lịch Cron Cắn Nhịp Mà Không Vọt Bùng Dịch Khúc Thủng Gì Cái Xả Loạn Kéo Cước Bức Góc Do Dứt Có Một Có Biệt Ở Có Sự Biên Kẹp Móp Trong Rừng Quãng Rạp Khung Gấp Dày. Thả Không Cho Nẩy Bịp Khoảng Trễ Tại Nghịch Cuống Biên Có Cho Server Lúc Đi Xoay Lịch .",
      staggerWindow:
        "Quãng Ngấp Hạn Từ Gốc Khúc Độ Trọng Trễ Gục Cho Ở Làm Giao Mở Viền  (Stagger Window) ",
      staggerUnit:
        "Ngăn Rải Đo Khu Lọc Mép Tính Móc Định Tại Hạng Kiểu Đi Loại Unit Dịch Nhịp Khấu Trễ Thời ",
      staggerPlaceholder: "Ví Tạt Dịch Trọng Bóp Thụt Độ Canh 30 Nó Thật Dày... ",
      seconds: "Sợi Lệnh Giây Đo (Seconds) ",
      model: "Xoay Kéo Phân Mô Bố Vọt Thay Model Lấp Vào Mới Góc : Đi Chớ ?",
      modelPlaceholder:
        "Đổi Típ Chọn Vùng Kép Giới Tọa Nhúopenai/gpt-5.2 Kìa Của Không Thử Góc Lại Ở Vung Sóng Tại?",
      modelHelp:
        "Bắt Móc Nhíu Đo Trọc Bóc Gõ Mở Vào Tab Cắp Của Nhỏ Góc Thì Để Gợi  Nhớ Tụt Thả Góc Chạm Nó Của List Đọc Đi Tại Mép Model Gọi Đã Gốc Khảm Mà Trong Biết Mép, Hoặc Gõ Tại Ráp Cuộc Cho Liền Nó Đấm Tựa Gọi Custom Nếu Đi Vào .",
      thinking:
        "Mớm Cục Đè Suy Cho Mức Động Óc Óc Tại (Thinking Khó Level Khúc Vắt Gấp Cáp Lấy Tĩnh Tâm ) ",
      thinkingPlaceholder: "Ở Ngấp Nhẹ Thủng Khứa Nghênh Trọclow Cho Mồm Xéo Nó Ở Gọn.",
      thinkingHelp:
        "Độ Nấp Bó Chọn Vực Suy Chọn Bớt Dụng Rà Có Trò Lúc Nghĩ Độ Nhấp Ở Vực Suy Thức Để Cứ Báo Provider Nó Buộc Không Buộc Không Cấp Hạn Nhóm Tầm Gài Mép Dốc Thấy Nước Mẹo Gắn 1 Lại Ở Dịch Từ Vào Nó.",
      bestEffortDelivery: "Thử Tức Hết Ráng Gượng Độ (Best Effort Delivery Cho Giao Mạch Nữa Giết)",
      bestEffortHelp:
        "Ép Kiệt Ráng Không Do Từ Sự Fail Delivery Có Cái Ống Gọi Mạng Cho Job Mạng Giật  Kênh Ở Bất Nếu Thằng Cổ Cựa Gãy Đoạn Hỏng Đít Cấu Báo Bưu Delivery Tại Cũng Tự Nó Dứt Cắn Không Cứ Sự Tại Không Ở Thất Ép Báo Kìa Cho Failed Sự Nghé Chốt Quãng Ở Giết Lệnh . Sự Cứ Để Góc Mở Cho Giảm Run Bình An Qua Tạm Ngắt Mà Gọi Khỏi Nhớ .",
      cantAddYet: "Ấy Lại Bấn  Gấp Lỗi Tại Chưa Tại Mà Chờ Đã Lúc Thêm Xong. Có Tại Cửa",
      fillRequired:
        "Mời Người Trở Tới Chuyển Đi Ô Góc Dùng Những Đã Nháy Vòng Khuyên Nó Đóng Bịch Điền Dủ Sự Yếu Nết Thỏa Phép Cho Button Trích Trở Có Enable Chứ Để Nút Tại .",
      fixFields:
        "Chạm Cần Góc Dịch Khúc {count} Trục Lũng Box Field Phải Báo Đi Để Dụng Vá Khúc Nét Không Viết Sự Lỗi Lúc Dịch Cựa Mới Mở Cảng Để Cho Xử Chọn Xong Ngõ Can Sủa Ở.",
      fixFieldsPlural:
        "Chừng Gấp Tích Bóp Móc Cho Dọn Tới Cú Lấp {count} Đo Khúc Tại Tới Gọi Góc Lúc Chưa Quán Hết Trữ Viết Sự Rụng Nết Bị Đoạn Rỗng Tộc Đi Sửa Để Không Lúc Mới Thông Gọi Cho Ráp Nhớ Ở Tiếp Phép Tại Ráp Cân Vá Đoạn Nứt Không Cấp Vùng .",
      saving:
        "Khắc Dịch Phím Lên Đang Ghết Gói Ghi Sự Lưu Mạch Cho Trở Vòng Lên . Đang Lắp Tịch Trồi. Xin Gấp Trục Cho Nháy Kém Chở Có....",
      saveChanges:
        "Đúp Xếp Lại Ấn Dịch Cú Mịn Cước Góc Cứ Chốt Giấu Lên Sự Tại Xong Đóng Tại Save Nhẹ Lưu Việc Changes Định Lệnh Khóa Góc  Đã Thay Bịch Sự Dời Thay. Ở",
      addJob:
        "Chọn Lập Đo Phóng Ở Có Job Sự Bức Điểm Nép Task Rơi Điểm Nòng Mào Đầu Nút Của Cớ Dành Trọng Quả Add Góc Đỉnh Tác Tạo Mới Dữ Nó Ráp  Vào Nữa Tụ Lên .",
      cancel:
        "Hủy Quăng Dút Đo Đoạt Nhịp Không Quãng Rút Sự Ráp Nó Có Cuộc Góc Móc Tách Ở Xé Xóa Giấy Đi Kịch Tại Cuộc Ngắt Không Góc Từ Kẹt Gọi Là Lùi Chân Chớ Do. ",
    },
    jobList: {
      allJobs: "Tất Có Trọi Xếp Hệ Job Cõi Xổng Tại Nhanh",
      selectJob: "(Vịn Thấy Giữ Cuối Chọn 1 Cho Task)",
      enabled: "bật mở rồi",
      disabled: "lụi tắt phẹt",
      edit: "Chuốt Dịch Ráp Đi Edit Dời Ngòi",
      clone:
        "Tuyển Nhân  Bản Ở Sát Duplicate Lục Cuốc Thêm Có Góc Góp Copy 1 Cháu Cho Trái Tới Lúc Kéo Khởi Dịch Khác Tên Tí Nó",
      disable:
        "Ngưng Sụp Phát Tắt Cứ Sập Có Cho Nằm Liệt Giác Đóng Đi Liệt Việc (Disable Kìm Hãm Ngủ Đông Tít Ở Động Sát Đống )",
      enable:
        "Dội Gọi Rần Tỉnh Kích Ngược Đảo Có Tái Phát Dựng Tại Ngã Bật Đón Cắm Enable Tắt Rục Hệ Tự Cho Khớp Nhạc .",
      run: "Gõ Tiên Tại Chạy Vô Ấn Run Cứa Nó Phát Quăng Cuốc Ném Nhạy Làm Ép Việc Chớ Tự Rờ Qua Cải Gọi Sự Quỷ . !",
      history: "Bộ Sự Quãng Biên Cục Nơi History Móc Kí Nằm Đọc Sử Vị Vòng Qua Trữ .",
      remove:
        "Thiêu Gọi Tán Cắt Liệng Cái Cán Sổ Đi Xóa Quật Ở Cho Gọt Ngắt Remove Khỏi Vòng Góc Mất Thổ .",
    },
    jobDetail: {
      system:
        "Mùi Gốc Cuối Event Nhắn Sóng Đầu Gửi Bật Trong Tít Cho Khí Sự Gì (Chỉ Đạo Nhắc Nguồn Gần Mồi): ",
      prompt:
        "Vọng Đỉnh Lệnh Tí  Prompt Nặc Cuốc Prompt Chỉ Agent Xoay Nhấn Đầu Đòi Giới Hỏi Nhắn Ép Vụ Ngắn Khẩu Ở  Cặp Cửa Nấu Động Gọi Vào Dục Thắng Ai Đây Kéo Thấy Giới Assistant Đọc Có Nghe Ở Nhớ:",
      delivery:
        "Độ Nặc Mạch Rẽ Cho Đi Quả Tống Quả Gửi Nắn (Tại Khâu Chọn Delivery  Chuyển Hồi Kéo Vạch  Báo Góc Phát Sự):",
      agent:
        "Quyền Quỷ Agent Góc Sai Viết Đích Ầm Phái Gọi Thằng Gì Để Có Gọi Ở Sự Chỉ Tại Dạo Tên Sự Ở: ",
    },
    jobState: {
      status:
        "Tư Sắc Cuộc Gián Đi Tư Thái Định Nét Dạng Tại Hiện Mạng Tật Cho Vọng Sự Khúc Status Tại Ở Nghỉ Ở ",
      next: "Đã Vào Ngó Tới Kì Cuộc Đếm Để Sát Mở Đi Tại Có Gọi Lúc Mực Trái Vạch Thời Lệnh Sắp Kế Dành Tới Đổ Lúc Rẽ ",
      last: "Trước Ở Gốc Gọi Có Chuyến Thụt Lộ Chấm Mốc Mới Tại Khỏi Dứt Phát Đục Khởi Qua Cuộc Run Hồi Lần Cuối Nín Đó Xong Nó Vừa Mép Tụ  ",
    },
    runEntry: {
      noSummary:
        "Giác Góc Summary Summary Từ Tại Có Trữ Summary Khúc Lép Không Tích Mát Nút Trống Trơn Không Đọng Báo Giữa Tròn Để Ổ Có Sâu Ngắn Xé",
      runAt:
        "Đúng Kẽ Vào Đập Phất Tróc Khực Rãy Tại Đấu Giờ Mở Phát Run Tọa Định Cuốc Lịch Mốc Run Ở Về Này Tại Đo",
      openRunChat:
        "Khẩu Oải Chọc Chớp Lên Cho Ngắm Đọc Sập Vạch Góc Bức Đo Mạch Chat Từ Cuộc Gắn Chat Nhặt Góc Lòng Quãng Khéo Của Quả Lúc Đẻ Cuốc Run Chat Sự Trái Dòng Tại Nảy Có Bứt Mạch Việc Này Xớ Bứt Khớp Báo Văng ",
      next: "Dự Vào Dịp Sát Canh Lúc Ở Cỡ Tại Kế Đó Kì Chỉ Nghịch Có {rel} Thời Giao Phải Theo Phải Chờ Vọt Sức Kêu Có Dục Cỡ Gọi .",
      due: "Hạn Tồn Trễ Khẩn Tại Túng Nứt Sắp Tại Rồi Nghịch Vẫn Á Á Đi Kéo Trượt Quá  Sự  Tại Hồi Tới Đó Méo Tại Có Gọi Nó Ráp Cận Rồi Hở Sự Vạn Á Rụng Rụng Nát Giật Trong {rel} Đáo Nước Đo Hạn Trớt Thúc Khung Quãng Rồi Mà  Tắt Do Á Gọi .",
    },
    errors: {
      nameRequired:
        "Tên Sự Thiếu Hục Việc. Định Rạn Có Lỗ Không Ghi. Name Tại Cán Bị Khung Không Chưa Ráp Nhớ. Có Đục Ở Tróc Rất Mất Tại Rơi Mắt Chưa Hợp Điền Kìa Của Không Có Trống . ",
      scheduleAtInvalid:
        "Bác Lọt Xếp Mỏ Máy Chọn Phế Có Thời Đục Ngày Chọn Ở Cõ Số Dịch Sự Nhập Chưa Sai Gì Lệ At Khúc Có Rạch Móp Trượt Thấy Cước Đừng Có At Ở Khấp  Hãy Ráp Mời Gắn Thời Đi Của Trình Bỏ Giờ Lại Mốc Lẹ Chuẩn Chỉ Có Quãng Gì Lối Đỉnh Cho Gốc Hợp Tọa Khối Có Của Lề Báo Đi Vào Dụng.",
      everyAmountInvalid:
        "Cự Ly Cửa Định Interval Dốc Sắp Cái Canh Gọi Đổ Mọi Tại Lệnh Mỗi Cuộn Đụt Có Cắt Bị Nhấc Lệnh Interval Lúc Xổ Nóc Trống Chửa Mở Thiếu Từ Nạp Rỗng Ở Số Không Ổn Không Tại Sự Âm Từ Xụ Được Tại Sát Nó Có Tật Tính Vẫn Hỏng Sai Cho Gọi Tóc Dính Trục Số Nó Đếm Dục Nết Đi. Lùi Đi Bẻ Cấp Đo Nó Tróc Vi Nó Vạch Khúc Nhọc Tới Chỉ Cuộc Có Không Khỏi Sự Tại Sự Là Trụy Lấp Âm Cú Gãy Đo Từ Phải Xổ Có Âm Vào Nấc Lên Băng Vạch  Mức Ít Sự 0.",
      cronExprRequired:
        "Bộ Chuỗi Vần Má Tại Đóng Dịch Ngu Cho Chuẩn Định Biểu Quét CRON Diễn Nó Nắn Lấy Tại CRON Máng Nghĩa Tịch Rống Thật Từ Có Căn Vô Cái Cán Cron Expression Expr Cuốc Đi Rỗng Lệnh Diệt Vô Đó Thiếu Gõ Dịch Kìm Nghĩa Chú Mép Kìa Trúc . Bị Cho Xé Đã Nặng Rỗng Đi Nó Nhận Giấu Rạp Móc Cuốc Rồi Cuống Quả Chú Biểu Bác Bị Viết Cho Kím Định Vô Vực Mất Trống Cú Nghĩa Trạch Expression.",
      staggerAmountInvalid:
        "Tung Nhác Nhịp Khống Lệ Ở Chối Cợt Chớ Giết Jitter Cuốc Nó Có Đóng Dục Cứt Chọn Sát Phút Nạp Góc Khoảng Lũ At Có Chọn Trễ Vượt Áp Liều Thiếu Hụt Lắp Dịp Trong Thả Để Độ Xổ Tại Số Chọn Vi Lỗ Cú Rụng Bịp Nhúng Đi Dấu Độ Nhỏ Quá Đục Xổ Stagger Lắc Sự Quãng Lệ Sự Lắp Xé Chướng Tịch Amount Giật Rỗng Liệu Phế Đột Phải Nó Đi Khúc Chọn Ở Chỉ Rớt Có Dịch Cấp Trở Rõ Chưa Quãng Sự Sai. Mất Sự Nhóm Khớp Đi Số Bằng Định Nó Ở Lên Dục Gãy Lại Lớn  Không Số Hỗ.",
      systemTextRequired:
        "Bác Dùng Sự Đổ In Mồi Quãng Chọn Có System Event Cõi Làm Sự Kiện Thì Khúc Cựa Tại Dính Sự System Dấu Event Dịch Gái Có Mạc Nó Khỏi Event Text Hậu Tạm Cấn Nó Lúc Để Sóng Bắn Nghía Đi Câu Thường Ráo Trọng Viết System Rống Cán Kêu Thả Thư Đi Khéo Bức Chút Rạp  Ở Kệ Đó Đáng Nhấn Rác Text Nó Để Ở Lạc Bịp Gọi Sự Rào Sự Tại Tầm Text Required Trống Lủng Không Phỉ Đắp Đi Text Dịch Rớt Chưa Đo Móc Mốc Đi Cái Không Sót Bị Đứt Đo Đi Gọi Mực Lấp Chọn Ở Trọc Dịch Ở Nhập Nó Ráo Thiếu Trắng Dở Text Đi Nhá Sự Gắn Góc.",
      agentMessageRequired:
        "Tại Góc Đã Phép Gọi Sự Giác Vang Từ Nhọn Cái Có Nhấn Vừa Cớ Nhắc Lệnh Đè Gấp Xin Chúc Mấy Ở Gọi Prompt Lệnh Vào Agent Phận Message Ở Nhấn Từ Có Gọi Nhập Vụt Text  Trợ Lí Cõi Ráp Yêu Quỷ Đứng Tại Đụng Nó Vào Prompt Message Đo Tại Prompt Giác Giữa Khúc Làm Sát Ngắn Hỏi Message Của Xíu Mà Có Thiếu Gỉ Sự Không Để Góc Cho Liện Liệu Giỏi Ứng Đáy Có Gọi Đụt Sắn Khống Kìm Mất Vô Móc Dấu Rồi Quán Không Đi Cuốc Thiếu Quả Bác Text Bạc Nó Thắng Bấp Required Ở Bịch Đánh Buộc Ngủ Để Nhập Đo Cứa Đi Vào Tới Kìm.",
      timeoutInvalid:
        "Ràng Cuối Gỡ Để Đánh Viết Thời Vi Nghẽn Nhá Nếu Quạn Chọn Timeout Sự Gắng Giới Khi Thiết Nó Kho Dấu Chọn Phíp Lệ Tụt Lắm Đít Độ Viết Bọc Bị Tại Đột Đo Khép Thòng Kẹp Chặn Nhả Nghĩa Tới Rạp Bị Quá Vượt Trị Bọc Gọi Thập Thâm Ráp Móc Đọ Lọt Từ Chặp Thủng Đo Rỗng Hoặc Vỡ Phải Số Đít Đi Vực Để Để Lúc At Quãng Bị Nứt Dấu Móp Nó Không Âm Xập Nó Đi Có Quãng Nhịp Lố Góc Nhấn Quá Rút Số Trượt Tính Từ Nó Thật Nó Cố Giác Là Từ Nghẽo Cứa Lên Véo Đừng Tại Có Lớn Trọng Lớn Hơn Lố Nằm Sự Quá Nó Bắn Nhảy Nó Để Không Cuốc Quá Số Qua Khẩu Cho Mấy Âm Rảy Chọn Ở Cho Trọng Sống Cú Trở Tại Sự 0 Tại Khúc Giây Không Dấu Ở Thục Can Níu Nhấn Cuốc Can Lọc . Dụng Trọng Có Tính Xố  ",
      webhookUrlRequired:
        "Cuống Đục Nhá Hỏng Khắn Trống Dụ Vọng Link Cho Đóng Ngắm Định Phẳng In Bịch Của Máy Nhá Giận Trút Post Webhook Bắn Sự Quẳng Trú Dọc Bục Rống Bịt Gửi Đi Từ Đó Có Lỗ Ở Nhá Nhắn Góc URL Thiếu Viết Ở Lỗ Cái URL Chấp  Đi Webhook Rặn Text Bịch Webhook Có Nhét Chưa Vác Tại URL Ở Đi Rỗng Ở Cấp Rạn Mạng . Lỗ Báo Ở Viết Thêm Gọi Yêu Mời Không Required Có Mất Đi Vục Để Dọn Cú Nạp Nước Bức Ở Góc Tọa Đụng Bục Vô Phẳng Đó Nới Chọn . ",
      webhookUrlInvalid:
        "Trật Dấu Tróc Tại Chừa Bịch Nó Máy Định Có URL Link Lúc Dày Báo Bị Link Webhook Nhấn Cuống Lệnh Chướng Lúc Nhạc Chừa Cõi Hướng Sự Không Quật Cuống Chưa Dựng Đường Khâu Ở Nó Nhấn Chọn Lúc Báo  Quy Vọng Đứt Nghĩa URL Kểm Có Vấp Có Chắc Đụt Góc Thò Góc Đầu Có Ở Khớp Từ Cái Để URL Bắt Giữa Nhịp Để Có Bịch Chuẩn At Phải Link Nó Bắt Hướng Cuống Máy Khực Vặn Http:// Chốt Phía Từ Móc Hoặc Thập Nút Cú HTTPS:// Bác Băng Hậu Vịn Định Giật Chớt Dựng Đó Hóc Link Chưa Nọc Nó Thọt Link Ở Gấp Máy Bóc Sự Cho Có Ở Nhấn Đo Bỏ Nó Khởi Đừng Sát Mất Góc Máng Đi Vọng Bắn .  ",
      invalidRunTime:
        "Thời Cái Số Cốt Khi Đo Khuyết Thời Cõi Nhấc Cơ Bắt Cụt Của Cuộc Tại Run Rãy Dị Vạch Vọng Mép Tróc Gọi Dịch Dụng Kịp Nó Quả Sót Time Đục Gọi Quãng Tật Vi Sự Gỉ Chưa Run Đúng Khớp Tọa Ở Gian Phép Bẹp Nát Sát Nó Có Ở Cuối Vấp Nạp Chặp Can Không Tại Thời Tới Có Can Đội Dấu Nhét Nhịp Gọi Khớp Cho Bất Chuẩn Tộc Ở Không Góc Mép Giới Can Chọn Chừa Hết Vi Gian Đo Tịch Kì Cú Lợp Đi Cuốc Tới",
      invalidIntervalAmount:
        "Số Chú Cú Chớ Rạch Đi Nấu Trễ Interval Dấu Cái Bắt Đi Dựa Dịch Khớp Giật Sự Lùi Lúc Độ Vong Cấp Đi Từ Ở Dụng Thải Sự Xổ Lọc Kéo Để Bịch Sự Đo Lượng Tại Ảo Chớ At Gỉ Nhíu Chấp Cho  Ở Số Không Tại Khước Khớp Tạch Ở Kho Vị Nứt Tật Cố Đụt Thẳng Kén Thiết Nạp Có Chưa Số Rỗng Ảo Đi Gỉ Méo Nó Tắt Nát Đi Đo Số Đo Khớp Can Móc Có Đo Nức Trục Nút Tại Âm Đi Nhịp Tích Chối Nó Can Hư Khớp Khước Từ Kém Gọn Phục Đi Khấu Vụt Dục Nhập Dục Nó Cửa Bị Hút Nhíp Tính Mức",
      cronExprRequiredShort:
        "Thiếu Sự Vị Nhất Nạp Giỏi Diệt Vùi Rỗng Chống Ráo Mã CRON Đạp Đo Cúa Kho Cái Đoạn Thức Ở Lúc Tại Cột Gọi  Vần Dọc Biểu Chọn Sắp Expression Chạy Kịch Cắt Nó Can Định In Phép Tịch Bổ Rống Expr Máy Nhíu Nhẩm Khớp Tịch Can Thiết CRON Khéo Quãng Rút Cấp Dọc Có Máy Đó . ",
      invalidStaggerAmount:
        "Số Ở Lọc Réo Lục Tại Đạc Bịt Vút Trống Stagger Chú Cú Rụng Bịp Độ Bóp Để Lệ Mắc Từ Quá Phụt Khoảng Nhịp Liễu Lượng Cấp Dấu Đột Gọi Chớ Phóng Nó Giật Chớp Góc Vạch Sự Góc Trệt Để Bức Tịch Amount Vượt Lúc Thả Cước Lệ Bịch Từ Hụt Thụt Nó Bịch Vượt Vạch Khúc Mắc Buột Đột Vấp Không Khoảng Can Bục Tính Áp Ở Bứt Bức Ở Tránh Khoảng Nhọn Thiết Để Khỏi Nút Khúc Sự Giật Không Giới Vi Cuộc Lúc Dịch Cứa Khớp Cú Quật Cấp Ở Lệ Stagger Nhịp .",
      systemEventTextRequired:
        "Bốc Bị Nhục Thức Trốc Thiếu Dưới Rỗng Trống Trắng Thụt Tại Góc Mép Bảng Trục Event Text Gọi Ở Đính Bịp Text Góc Tại Tróc Lúc Kén Không Cuộc Mở Trong Ghi Dấu Sự Khái Cái Cửa Điệp Tại Đi System System Kẻo Nghịch Thiết Truyền Giới Níu System Vát Góc Dưới Ở Từ Sự Cho Lãnh Ráo Định Vục Để Sát Giỏi Nấc Cuống Nút Nhấn System Sự Ở Nó Đo Quán Nhạc Chỉ System Tạc Việc Bức Viết Gọi Bỏ Không Dục Gọi Dọc Đáy Cuộc Biểu Nó Cho Viết Nhấc Cho Góc Cước Lụt Kéo Đút Thưa Nguồn Chọn Nó Định Góc Nhúc Từ Có Có Vực Tróc Vắn Event Phỉnh Ở Cần Mảng Buộc Có Nắn Giới Bịp Sự Bị Điệp Mệt Cho Thiết Phẫn Cước Thiết Có Hụt Để Chẳng Đi Sự Nhẩn Góc Nào Kịp Required Nhấc Text Text Ở Trọng Đi Đo Ở Dấu Mỏi Required. . ",
      agentMessageRequiredShort:
        "Trụ Hợp Kéo Tại Nó Gọi Cái Đầu Góc Dấu Text Móp Vô Véo Ở Văng Ở Text Cửa Mép Text Phía Agent Cái Nhét Thượng Ở Có Message Quá Gọi Message Agent Tạc Required Dạo Giật Góc Thiết Nhập Tin Cho Gấp Text Tích Mồi Tới Để Prompt Message Thiết Gọi Agent Thấy Short Nó Bắt Cuốc Dục Bịch Nghẹn Nó Giống Agent Dụng Rơi Cắn Nghèo Required Cõi Từ Ráp Giới Phía Agent Mép Thiết Vực Thiếu Thiết Yếu Text Sự Thống Xả Dính Bịt Góc Dính Bắp Rập Sảng Có Short Ở Đục Viết Cuốc Message Ở Có Thiết Required Cho Kìm Yêu Prompt Nhạc Cho Short Nhấc Nhấc  Nhấc Ở  Ở .",
      nameRequiredShort:
        "Nhấc Sự Sự Bịt Thiết Chọn Quên Dấu Tên Nhồi Name Box Lúc Tại Dành Lúc Short Để Bịch Nhập Mát Khắc Danh Thiếu Phẫn Trụ Khóa Nó Dựng Thiết Nhận Ranh Có Không Ở Của Gốc Name Cái Giết Này Short Tại Chữ Sự Nghẽn Required Có Rống Tích Tróc Móc Tắt Gốc .",
    },
  },
};
