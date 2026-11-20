
// Practice Section Smooth Interactive Handlers (Chuyển tab mượt mà, không cần bấm ẩn)
window.togglePracticeMindmap = function(tid, btn) {
    const card = document.getElementById('card-' + tid) || (btn ? btn.closest('.practice-topic-card') : null);
    if (!card) return;
    
    const mmDrawer = document.getElementById('mm-drawer-' + tid);
    const fuDrawer = document.getElementById('fu-drawer-' + tid);
    const mmBtn = btn || card.querySelector('.btn-mindmap-toggle');
    const fuBtn = card.querySelector('.btn-followups-toggle');

    if (!mmDrawer) return;

    const isCurrentlyOpen = mmDrawer.style.display !== 'none' && mmDrawer.style.display !== '';

    if (isCurrentlyOpen) {
        // Bấm lại chính nó -> Đóng lại
        mmDrawer.style.display = 'none';
        if (mmBtn) mmBtn.classList.remove('active-tab');
    } else {
        // Tự động đóng tab câu hỏi mở rộng nếu đang mở (không cần học viên bấm Ẩn thủ công)
        if (fuDrawer) {
            fuDrawer.style.display = 'none';
        }
        if (fuBtn) {
            fuBtn.classList.remove('active-tab');
        }

        // Mở mượt mà tab sơ đồ tư duy
        mmDrawer.style.display = 'block';
        if (mmBtn) mmBtn.classList.add('active-tab');
    }
};

window.togglePracticeFollowups = function(tid, btn) {
    const card = document.getElementById('card-' + tid) || (btn ? btn.closest('.practice-topic-card') : null);
    if (!card) return;
    
    const mmDrawer = document.getElementById('mm-drawer-' + tid);
    const fuDrawer = document.getElementById('fu-drawer-' + tid);
    const mmBtn = card.querySelector('.btn-mindmap-toggle');
    const fuBtn = btn || card.querySelector('.btn-followups-toggle');

    if (!fuDrawer) return;

    const isCurrentlyOpen = fuDrawer.style.display !== 'none' && fuDrawer.style.display !== '';

    if (isCurrentlyOpen) {
        // Bấm lại chính nó -> Đóng lại
        fuDrawer.style.display = 'none';
        if (fuBtn) fuBtn.classList.remove('active-tab');
    } else {
        // Tự động đóng tab sơ đồ tư duy nếu đang mở
        if (mmDrawer) {
            mmDrawer.style.display = 'none';
        }
        if (mmBtn) {
            mmBtn.classList.remove('active-tab');
        }

        // Mở mượt mà tab câu hỏi mở rộng
        fuDrawer.style.display = 'block';
        if (fuBtn) fuBtn.classList.add('active-tab');
    }
};

window.startSimWithTopic = function(tid) {
    // Navigate to simulator tab
    const simNav = document.querySelector('[data-target="tool-simulator"]');
    if (simNav) simNav.click();
    
    // Select topic in simulator dropdown
    setTimeout(() => {
        const select = document.getElementById('sim-topic-select');
        if (select) {
            select.value = tid;
            select.dispatchEvent(new Event('change'));
        }
        const simPane = document.getElementById('tool-simulator');
        if (simPane) simPane.scrollIntoView({ behavior: 'smooth' });
    }, 200);
};


window.copyCardSample = function(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const text = el.innerText;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Đã sao chép toàn bộ bài mẫu vào bộ nhớ tạm!');
        });
    } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Đã sao chép toàn bộ bài mẫu vào bộ nhớ tạm!');
    }
};

/**
 * VSTEP SPEAKING PART 03 - TOPIC DEVELOPMENT PORTAL
 * Interactive Engine: Speech Synthesis, Exam Simulator, Audio Recorder, Flashcards
 * Dedicated to Ms. Nguyet's Students
 */

// Master Topics Pool
const ALL_TOPICS_POOL = [
  {
    "id": "b-topic-01",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 01",
    "title": "Teamwork brings people many benefits.",
    "center": "Teamwork",
    "branches": [
      {
        "num": 1,
        "text": "Improve communication skills",
        "pos": "top",
        "type": "verb",
        "vi": "Cải thiện kỹ năng giao tiếp"
      },
      {
        "num": 2,
        "text": "Strengthen team relationships",
        "pos": "right",
        "type": "verb",
        "vi": "Thắt chặt mối quan hệ nhóm"
      },
      {
        "num": 3,
        "text": "Develop leadership qualities",
        "pos": "bottom",
        "type": "verb",
        "vi": "Phát triển phẩm chất lãnh đạo"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What are some disadvantages of working in a team?",
        "vi": "Những bất lợi của việc làm việc nhóm là gì?",
        "a": "Teamwork also has some problems. Members may <strong>have different ideas and argue easily</strong>. Some lazy people may also <strong>let others do the work</strong>."
      },
      {
        "q": "In your opinion, how can companies encourage good teamwork?",
        "vi": "Theo bạn, các công ty có thể khuyến khích làm việc nhóm tốt bằng cách nào?",
        "a": "Companies can use simple ways. Managers should <strong>organize fun team activities every month</strong>. Giving bonuses for good teamwork <strong>also helps workers try harder</strong>."
      },
      {
        "q": "Do you think teamwork is more useful for young people or older people? Why?",
        "vi": "Bạn có nghĩ làm việc nhóm có ích hơn cho người trẻ hay người lớn tuổi?",
        "a": "I think it helps both groups. Young people can <strong>learn real experience from older workers</strong>. Older workers can also <strong>learn fresh ideas from young people</strong>."
      }
    ]
  },
  {
    "id": "b-topic-02",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 02",
    "title": "Soft skills are very important in modern society.",
    "center": "Soft skills",
    "branches": [
      {
        "num": 1,
        "text": "Create job opportunities",
        "pos": "top",
        "type": "verb",
        "vi": "Tạo cơ hội việc làm"
      },
      {
        "num": 2,
        "text": "Improve work performance",
        "pos": "right",
        "type": "verb",
        "vi": "Nâng cao hiệu suất công việc"
      },
      {
        "num": 3,
        "text": "Improve social relationships",
        "pos": "bottom",
        "type": "verb",
        "vi": "Cải thiện các mối quan hệ xã hội"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do you think soft skills are necessary today? Why or why not?",
        "vi": "Bạn có nghĩ kỹ năng mềm là cần thiết ngày nay không?",
        "a": "Yes, I think they are very necessary. Today, knowledge from books <strong>is not enough at work</strong>. Good soft skills help people <strong>work happily with others</strong>."
      },
      {
        "q": "Which soft skill do you think is the most important?",
        "vi": "Kỹ năng mềm nào quan trọng nhất?",
        "a": "I think communication is the most important skill. Talking clearly helps people <strong>avoid mistakes at work</strong>. It can also help teams <strong>finish tasks much faster</strong>."
      },
      {
        "q": "Do you think young people have better soft skills than older people?",
        "vi": "Người trẻ có kỹ năng mềm tốt hơn người lớn tuổi không?",
        "a": "I think both groups have strong points. Young people can <strong>learn new skills very fast</strong>. However, older people <strong>are often more calm and patient</strong>."
      }
    ]
  },
  {
    "id": "b-topic-03",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 03",
    "title": "Online learning is beneficial to students.",
    "center": "Online learning",
    "branches": [
      {
        "num": 1,
        "text": "Flexible",
        "pos": "top",
        "type": "adj",
        "vi": "Linh hoạt"
      },
      {
        "num": 2,
        "text": "Time-saving",
        "pos": "right",
        "type": "adj",
        "vi": "Tiết kiệm thời gian"
      },
      {
        "num": 3,
        "text": "Money-saving",
        "pos": "bottom",
        "type": "adj",
        "vi": "Tiết kiệm tiền bạc"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do you think online learning will replace traditional schools in the future?",
        "vi": "Học online có thay thế trường học truyền thống trong tương lai không?",
        "a": "No, I don't think so. Going to school helps students <strong>make real friends</strong>. Meeting teachers in person also <strong>helps students learn better</strong>."
      },
      {
        "q": "What are some disadvantages of online learning?",
        "vi": "Một số bất lợi của học trực tuyến là gì?",
        "a": "Online learning has two main problems. Students can easily <strong>lose focus because of phones</strong>. Looking at screens too long also <strong>hurts their eyes</strong>."
      },
      {
        "q": "How can students study online better?",
        "vi": "Làm thế nào để học sinh học trực tuyến tốt hơn?",
        "a": "Students should have good study habits. They should find a <strong>quiet place for study</strong>. Making a clear study plan also <strong>helps them focus better</strong>."
      }
    ]
  },
  {
    "id": "b-topic-04",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 04",
    "title": "Body language plays an important role in communication.",
    "center": "Body language",
    "branches": [
      {
        "num": 1,
        "text": "Overcome language barriers",
        "pos": "top",
        "type": "verb",
        "vi": "Vượt qua rào cản ngôn ngữ"
      },
      {
        "num": 2,
        "text": "Enhance mutual understanding",
        "pos": "right",
        "type": "verb",
        "vi": "Tăng cường sự hiểu biết lẫn nhau"
      },
      {
        "num": 3,
        "text": "Show emotions and attitudes",
        "pos": "bottom",
        "type": "verb",
        "vi": "Thể hiện cảm xúc và thái độ"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Why is body language important in presentations?",
        "vi": "Tại sao ngôn ngữ cơ thể quan trọng trong thuyết trình?",
        "a": "Body language makes a talk much better. Good eye contact and smiles <strong>keep listeners interested</strong>. It also makes speakers <strong>look confident on stage</strong>."
      },
      {
        "q": "Can body language cause misunderstandings in different cultures?",
        "vi": "Ngôn ngữ cơ thể có gây hiểu lầm giữa các nền văn hóa không?",
        "a": "Yes, I think it can. Some hand signs <strong>have different meanings in other countries</strong>. People should <strong>learn local customs before traveling abroad</strong>."
      },
      {
        "q": "How can people improve their body language?",
        "vi": "Làm thế nào để cải thiện ngôn ngữ cơ thể?",
        "a": "People can practice this every day. Standing before a mirror helps <strong>check your face and hands</strong>. Watching good speakers on videos <strong>is also very helpful</strong>."
      }
    ]
  },
  {
    "id": "b-topic-05",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 05",
    "title": "Studying abroad is very beneficial for young people.",
    "center": "Studying abroad",
    "branches": [
      {
        "num": 1,
        "text": "Develop themselves",
        "pos": "top",
        "type": "verb",
        "vi": "Phát triển bản thân"
      },
      {
        "num": 2,
        "text": "See the world",
        "pos": "right",
        "type": "verb",
        "vi": "Khám phá thế giới"
      },
      {
        "num": 3,
        "text": "Experience different styles of education",
        "pos": "bottom",
        "type": "verb",
        "vi": "Trải nghiệm các nền giáo dục khác nhau"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What difficulties do international students often face?",
        "vi": "Du học sinh thường gặp khó khăn gì?",
        "a": "They often face many difficulties at first. Many students <strong>feel lonely and miss home food</strong>. Speaking a foreign language daily <strong>is also hard initially</strong>."
      },
      {
        "q": "Should students do a part-time job while studying abroad?",
        "vi": "Du học sinh có nên đi làm thêm không?",
        "a": "Yes, I think they should try it. A part-time job brings <strong>extra money for living costs</strong>. It also helps students <strong>practice English with local people</strong>."
      },
      {
        "q": "Do you prefer studying abroad or studying in your home country?",
        "vi": "Bạn thích du học hay học trong nước?",
        "a": "I prefer studying in my home country. I can <strong>live close to my family and friends</strong>. It is also much cheaper <strong>than studying abroad</strong>."
      }
    ]
  },
  {
    "id": "b-topic-06",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 06",
    "title": "Learning English brings many benefits in different areas of life.",
    "center": "Learning English",
    "branches": [
      {
        "num": 1,
        "text": "Communication",
        "pos": "top",
        "type": "noun",
        "vi": "Giao tiếp"
      },
      {
        "num": 2,
        "text": "Career and job opportunities",
        "pos": "right",
        "type": "noun",
        "vi": "Cơ hội nghề nghiệp & việc làm"
      },
      {
        "num": 3,
        "text": "Academic purposes",
        "pos": "bottom",
        "type": "noun",
        "vi": "Mục đích học thuật"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "At what age should children start learning English?",
        "vi": "Trẻ em nên học tiếng Anh từ mấy tuổi?",
        "a": "Children can start around five years old. At this age, they can <strong>learn new sounds very fast</strong>. Fun songs and cartoons <strong>help them enjoy English early</strong>."
      },
      {
        "q": "What is the best way to practice speaking English?",
        "vi": "Cách tốt nhất để luyện nói tiếng Anh là gì?",
        "a": "The best way is speaking every day. Learners should <strong>talk with friends or English teachers</strong>. Watching English films also <strong>helps improve speaking skills</strong>."
      },
      {
        "q": "Is English the most useful language in the world?",
        "vi": "Tiếng Anh có phải là ngôn ngữ hữu ích nhất trên thế giới không?",
        "a": "Yes, I think it is. English is used widely <strong>in business and world travel</strong>. It helps people connect <strong>with friends around the world</strong>."
      }
    ]
  },
  {
    "id": "b-topic-07",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 07",
    "title": "Sending children to preschool early brings certain benefits.",
    "center": "Preschool early",
    "branches": [
      {
        "num": 1,
        "text": "Become more independent and sociable",
        "pos": "top",
        "type": "verb",
        "vi": "Trở nên tự lập và hòa đồng hơn"
      },
      {
        "num": 2,
        "text": "Better preparation for formal schooling",
        "pos": "right",
        "type": "noun",
        "vi": "Chuẩn bị tốt hơn cho việc học chính thức"
      },
      {
        "num": 3,
        "text": "Support parents in balancing work and family life",
        "pos": "bottom",
        "type": "verb",
        "vi": "Hỗ trợ cha mẹ cân bằng công việc và gia đình"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Are there any disadvantages of sending young children to school early?",
        "vi": "Có bất lợi gì khi cho trẻ nhỏ đi học sớm không?",
        "a": "Yes, there are some small problems. Little kids may <strong>feel scared when away from parents</strong>. They can also <strong>catch colds easily from other kids</strong>."
      },
      {
        "q": "What should parents look for when choosing a preschool?",
        "vi": "Phụ huynh nên chú ý điều gì khi chọn trường mầm non?",
        "a": "Parents should check the school carefully. A good school needs <strong>kind teachers and safe classrooms</strong>. Clean meals and playgrounds <strong>are also very important</strong>."
      },
      {
        "q": "Should preschool focus on study or playtime?",
        "vi": "Mầm non nên chú trọng việc học hay vui chơi?",
        "a": "I think preschool should focus on playtime. Young kids learn best <strong>through fun games and songs</strong>. Playing together also helps <strong>them make good friends</strong>."
      }
    ]
  },
  {
    "id": "b-topic-08",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 08",
    "title": "Good workplace relationships bring many benefits.",
    "center": "Good workplace relationships",
    "branches": [
      {
        "num": 1,
        "text": "Higher levels of job satisfaction",
        "pos": "top",
        "type": "noun",
        "vi": "Mức độ hài lòng công việc cao hơn"
      },
      {
        "num": 2,
        "text": "Higher levels of creativity",
        "pos": "right",
        "type": "noun",
        "vi": "Mức độ sáng tạo cao hơn"
      },
      {
        "num": 3,
        "text": "Higher levels of cooperation and teamwork",
        "pos": "bottom",
        "type": "noun",
        "vi": "Mức độ hợp tác và làm việc nhóm cao hơn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How can coworkers solve problems with each other?",
        "vi": "Làm thế nào đồng nghiệp giải quyết vấn đề với nhau?",
        "a": "Coworkers should talk calmly together. Listening carefully helps them <strong>understand each other's ideas</strong>. If needed, they can <strong>ask a manager for advice</strong>."
      },
      {
        "q": "Is having close friends at work always good?",
        "vi": "Có bạn thân ở nơi làm việc có luôn tốt không?",
        "a": "It is mostly good for workers. Friendly coworkers <strong>help make daily work feel lighter</strong>. However, friends should still <strong>focus well during work hours</strong>."
      },
      {
        "q": "What can a company do to build a friendly workplace?",
        "vi": "Công ty có thể làm gì để xây dựng nơi làm việc thân thiện?",
        "a": "Companies can hold simple social events. Monthly team lunches <strong>help workers talk outside work</strong>. Celebrating birthdays together also <strong>makes the office warmer</strong>."
      }
    ]
  },
  {
    "id": "b-topic-09",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 09",
    "title": "Reading brings many benefits to people of all ages.",
    "center": "Reading",
    "branches": [
      {
        "num": 1,
        "text": "Relax",
        "pos": "top",
        "type": "verb",
        "vi": "Thư giãn"
      },
      {
        "num": 2,
        "text": "Widen knowledge",
        "pos": "right",
        "type": "verb",
        "vi": "Mở rộng kiến thức"
      },
      {
        "num": 3,
        "text": "Improve vocabulary",
        "pos": "bottom",
        "type": "verb",
        "vi": "Nâng cao vốn từ vựng"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do you prefer paper books or e-books?",
        "vi": "Bạn thích sách giấy hay sách điện tử?",
        "a": "I prefer paper books to e-books. Holding a real book <strong>feels nice and hurts eyes less</strong>. Turning real pages also <strong>helps me focus better</strong>."
      },
      {
        "q": "How can parents encourage children to read more?",
        "vi": "Làm sao cha mẹ khuyến khích trẻ đọc sách nhiều hơn?",
        "a": "Parents should start with simple habits. They can <strong>read short bedtime stories with kids</strong>. Taking children to bookstores <strong>also makes them love books</strong>."
      },
      {
        "q": "Why do some people read less nowadays?",
        "vi": "Tại sao ngày nay một số người ít đọc sách?",
        "a": "People today have too many screens. Many people <strong>spend hours watching short videos on phones</strong>. This takes away their <strong>free time for reading</strong>."
      }
    ]
  },
  {
    "id": "b-topic-10",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 10",
    "title": "Artificial Intelligence brings many benefits to modern life.",
    "center": "Artificial Intelligence (AI)",
    "branches": [
      {
        "num": 1,
        "text": "Improve healthcare",
        "pos": "top",
        "type": "verb",
        "vi": "Cải thiện y tế và chăm sóc sức khỏe"
      },
      {
        "num": 2,
        "text": "Facilitate teaching and learning",
        "pos": "right",
        "type": "verb",
        "vi": "Hỗ trợ việc dạy và học"
      },
      {
        "num": 3,
        "text": "Handle daily tasks",
        "pos": "bottom",
        "type": "verb",
        "vi": "Xử lý các công việc hàng ngày"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Will AI take away people's jobs?",
        "vi": "AI có lấy mất việc làm của con người không?",
        "a": "AI may replace some simple jobs. For example, machines can do <strong>easy factory tasks quickly</strong>. However, AI also creates <strong>new computer and tech jobs</strong>."
      },
      {
        "q": "How do you use AI in your study or work?",
        "vi": "Bạn dùng AI trong học tập hay công việc như thế nào?",
        "a": "I often use AI to learn English. It helps me <strong>check grammar and translate hard words</strong>. This saves time and <strong>makes my study easier</strong>."
      },
      {
        "q": "What problems can AI bring?",
        "vi": "AI có thể mang lại những vấn đề gì?",
        "a": "AI can cause some serious problems. Private information may <strong>be stolen by bad people</strong>. Fake AI photos can also <strong>trick many online users</strong>."
      }
    ]
  },
  {
    "id": "b-topic-11",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 11",
    "title": "Maintaining work–life balance is important for everyone.",
    "center": "Work-life balance",
    "branches": [
      {
        "num": 1,
        "text": "Make time for hobbies",
        "pos": "top",
        "type": "verb",
        "vi": "Dành thời gian cho sở thích"
      },
      {
        "num": 2,
        "text": "Build personal relationships",
        "pos": "right",
        "type": "verb",
        "vi": "Xây dựng các mối quan hệ cá nhân"
      },
      {
        "num": 3,
        "text": "Have time to relax",
        "pos": "bottom",
        "type": "verb",
        "vi": "Có thời gian thư giãn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Why is work-life balance difficult in big cities?",
        "vi": "Tại sao cân bằng công việc và cuộc sống lại khó ở thành phố lớn?",
        "a": "City life makes balance very hard. People spend much time <strong>in heavy traffic jams daily</strong>. High living costs also force <strong>them to work overtime</strong>."
      },
      {
        "q": "What happens if someone works too much and never rests?",
        "vi": "Chuyện gì xảy ra nếu ai đó làm việc quá nhiều mà không nghỉ ngơi?",
        "a": "Working without rest harms health badly. People will soon <strong>feel stressed and get sick</strong>. They may also <strong>have less time for family</strong>."
      },
      {
        "q": "How can companies help workers balance work and life?",
        "vi": "Công ty có thể làm gì để giúp nhân viên cân bằng công việc và cuộc sống?",
        "a": "Companies can support workers in simple ways. Managers should <strong>avoid calling workers on weekends</strong>. Giving paid holidays also helps <strong>workers rest properly</strong>."
      }
    ]
  },
  {
    "id": "b-topic-12",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 12",
    "title": "Travelling brings many benefits to people’s lives.",
    "center": "Traveling",
    "branches": [
      {
        "num": 1,
        "text": "Explore different cultures",
        "pos": "top",
        "type": "verb",
        "vi": "Khám phá các nền văn hóa khác nhau"
      },
      {
        "num": 2,
        "text": "Make new friends",
        "pos": "right",
        "type": "verb",
        "vi": "Kết bạn mới"
      },
      {
        "num": 3,
        "text": "Reduce stress",
        "pos": "bottom",
        "type": "verb",
        "vi": "Giảm căng thẳng"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do you prefer traveling alone or in a group?",
        "vi": "Bạn thích đi du lịch một mình hay theo nhóm?",
        "a": "I prefer traveling in a small group. With close friends, we can <strong>share costs and take photos</strong>. Everything becomes much <strong>more fun together</strong>."
      },
      {
        "q": "Is green tourism becoming more popular?",
        "vi": "Du lịch xanh có đang trở nên phổ biến hơn không?",
        "a": "Yes, green travel is very popular now. Many tourists <strong>want to protect nature during their trips</strong>. They try not to <strong>throw rubbish in parks</strong>."
      },
      {
        "q": "What should travelers prepare before visiting another country?",
        "vi": "Du khách nên chuẩn bị gì trước khi đến một đất nước khác?",
        "a": "Good preparation makes any trip smoother. Travelers should <strong>check passports and book hotels early</strong>. Learning some simple greetings <strong>is also very helpful</strong>."
      }
    ]
  },
  {
    "id": "b-topic-13",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 13",
    "title": "Doing charity work brings many personal benefits.",
    "center": "Charity work",
    "branches": [
      {
        "num": 1,
        "text": "Show gratitude and appreciation for life",
        "pos": "top",
        "type": "verb",
        "vi": "Thể hiện lòng biết ơn và trân trọng cuộc sống"
      },
      {
        "num": 2,
        "text": "Learn to take responsibility",
        "pos": "right",
        "type": "verb",
        "vi": "Học cách sống có trách nhiệm"
      },
      {
        "num": 3,
        "text": "Acquire useful skills",
        "pos": "bottom",
        "type": "verb",
        "vi": "Tiếp thu các kỹ năng hữu ích"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Should schools make charity work a rule for students?",
        "vi": "Trường học có nên bắt buộc học sinh làm từ thiện không?",
        "a": "No, I don't think it should be a rule. Schools should encourage charity <strong>through fun student clubs</strong>. When students join freely, <strong>they feel much happier</strong>."
      },
      {
        "q": "How can people help poor people besides giving money?",
        "vi": "Mọi người có thể giúp người nghèo bằng cách nào ngoài việc cho tiền?",
        "a": "There are many simple ways to help. People can give away <strong>old clothes, books, and food</strong>. Teaching poor children to <strong>read is also very meaningful</strong>."
      },
      {
        "q": "Have you ever joined a charity activity?",
        "vi": "Bạn đã từng tham gia hoạt động từ thiện nào chưa?",
        "a": "Yes, I joined a school club last year. We gave <strong>warm clothes and books to kids</strong>. Seeing their happy smiles <strong>made me very proud</strong>."
      }
    ]
  },
  {
    "id": "b-topic-14",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 14",
    "title": "Spending holidays at home can be a good choice.",
    "center": "Holidays at home",
    "branches": [
      {
        "num": 1,
        "text": "Inexpensive",
        "pos": "top",
        "type": "adj",
        "vi": "Không tốn kém / Tiết kiệm"
      },
      {
        "num": 2,
        "text": "Relax",
        "pos": "right",
        "type": "verb",
        "vi": "Thư giãn"
      },
      {
        "num": 3,
        "text": "Safety",
        "pos": "bottom",
        "type": "noun",
        "vi": "An toàn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What fun things can people do when staying home on holidays?",
        "vi": "Mọi người có thể làm gì vui khi ở nhà vào kỳ nghỉ?",
        "a": "Staying home can still be very fun. Families can <strong>cook special meals together at home</strong>. Watching movies or playing board games <strong>is also very enjoyable</strong>."
      },
      {
        "q": "Why do some people not like staying at home on holidays?",
        "vi": "Tại sao một số người không thích ở nhà vào ngày lễ?",
        "a": "Some people find staying home boring. They <strong>want to visit new beaches or famous cities</strong>. Trying new local food also <strong>makes their holiday exciting</strong>."
      },
      {
        "q": "Is holiday traffic a big problem in your country?",
        "vi": "Giao thông ngày lễ có phải là vấn đề lớn ở nước bạn không?",
        "a": "Yes, holiday traffic is very heavy here. Millions of people <strong>travel back to their hometowns together</strong>. Roads and bus stations <strong>always get very crowded</strong>."
      }
    ]
  },
  {
    "id": "b-topic-15",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 15",
    "title": "Older leaders can be more effective in certain situations.",
    "center": "Older leaders",
    "branches": [
      {
        "num": 1,
        "text": "More experienced",
        "pos": "top",
        "type": "adj",
        "vi": "Giàu kinh nghiệm hơn"
      },
      {
        "num": 2,
        "text": "More knowledgeable",
        "pos": "right",
        "type": "adj",
        "vi": "Hiểu biết sâu rộng hơn"
      },
      {
        "num": 3,
        "text": "More responsible",
        "pos": "bottom",
        "type": "adj",
        "vi": "Có trách nhiệm hơn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What good points do young leaders have compared to older leaders?",
        "vi": "Lãnh đạo trẻ có ưu điểm gì so với lãnh đạo lớn tuổi?",
        "a": "Young leaders also have great strengths. They have lots of <strong>energy and know new technology</strong>. They often <strong>bring fresh ideas to the team</strong>."
      },
      {
        "q": "Should there be an age limit for leaders?",
        "vi": "Có nên có giới hạn độ tuổi cho lãnh đạo không?",
        "a": "Yes, I think an age limit helps. It gives young people <strong>chances to share modern ideas</strong>. Meanwhile, older people can still <strong>work as helpful advisors</strong>."
      },
      {
        "q": "What makes a good leader?",
        "vi": "Điều gì tạo nên một nhà lãnh đạo giỏi?",
        "a": "A good leader needs clear qualities. They must listen kindly and <strong>set a good example</strong>. Staying calm during hard times <strong>also builds team trust</strong>."
      }
    ]
  },
  {
    "id": "d-topic-01",
    "category": "drawbacks",
    "categoryName": "Nhóm Bất Lợi",
    "topicCode": "ĐỀ SỐ 01",
    "title": "There are some drawbacks of online shopping.",
    "center": "Online shopping",
    "branches": [
      {
        "num": 1,
        "text": "Delay in delivery",
        "pos": "top",
        "type": "noun",
        "vi": "Chậm trễ trong giao hàng"
      },
      {
        "num": 2,
        "text": "Lack of shopping experience",
        "pos": "right",
        "type": "noun",
        "vi": "Thiếu trải nghiệm mua sắm thực tế"
      },
      {
        "num": 3,
        "text": "Unexpected quality",
        "pos": "bottom",
        "type": "noun",
        "vi": "Chất lượng không như mong đợi"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How can buyers stay safe when shopping online?",
        "vi": "Người mua làm gì để an toàn khi mua sắm online?",
        "a": "Buyers need to be very careful. They should <strong>choose trusted shops and good websites</strong>. Reading reviews from others also <strong>helps them avoid bad items</strong>."
      },
      {
        "q": "Will online stores completely replace real shops?",
        "vi": "Cửa hàng online có thay thế hoàn toàn cửa hàng thật không?",
        "a": "No, I don't think so. Many people love going out to <strong>try on clothes with friends</strong>. Real shopping gives a fun feeling <strong>that websites cannot bring</strong>."
      },
      {
        "q": "What should you do if an online order arrives broken?",
        "vi": "Bạn nên làm gì nếu đơn hàng online giao đến bị hỏng?",
        "a": "Buyers should act quickly right away. First, take clear <strong>photos of the broken item</strong>. Then message the shop to <strong>ask for your money back</strong>."
      }
    ]
  },
  {
    "id": "d-topic-02",
    "category": "drawbacks",
    "categoryName": "Nhóm Bất Lợi",
    "topicCode": "ĐỀ SỐ 02",
    "title": "There are some disadvantages of public transport.",
    "center": "Public transport",
    "branches": [
      {
        "num": 1,
        "text": "Take a lot of time",
        "pos": "top",
        "type": "verb",
        "vi": "Mất nhiều thời gian"
      },
      {
        "num": 2,
        "text": "Be very crowded",
        "pos": "right",
        "type": "verb",
        "vi": "Rất đông đúc"
      },
      {
        "num": 3,
        "text": "Be victims of criminal acts",
        "pos": "bottom",
        "type": "verb",
        "vi": "Có nguy cơ là nạn nhân của tội phạm"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How can the government encourage more people to use buses?",
        "vi": "Chính phủ làm gì để khuyến khích nhiều người đi xe buýt hơn?",
        "a": "The government can improve bus quality. They should <strong>make bus tickets cheaper and buses cleaner</strong>. Adding more bus stops also <strong>helps people save time</strong>."
      },
      {
        "q": "Is public transport good for the environment?",
        "vi": "Phương tiện công cộng có tốt cho môi trường không?",
        "a": "Yes, I think it is very good. One bus can <strong>carry many people at one time</strong>. This can <strong>help reduce traffic jams and air pollution</strong>."
      },
      {
        "q": "Do you prefer going by motorbike or by bus?",
        "vi": "Bạn thích đi bằng xe máy hay xe buýt?",
        "a": "I prefer going by bus on rainy days. Taking a bus is <strong>safer and keeps me dry</strong>. However, on sunny days, <strong>a motorbike is much faster</strong>."
      }
    ]
  },
  {
    "id": "d-topic-03",
    "category": "drawbacks",
    "categoryName": "Nhóm Bất Lợi",
    "topicCode": "ĐỀ SỐ 03",
    "title": "There are some drawbacks of doing exercise.",
    "center": "Doing exercise",
    "branches": [
      {
        "num": 1,
        "text": "Waste time",
        "pos": "top",
        "type": "verb",
        "vi": "Lãng phí thời gian"
      },
      {
        "num": 2,
        "text": "Waste money",
        "pos": "right",
        "type": "verb",
        "vi": "Lãng phí tiền bạc"
      },
      {
        "num": 3,
        "text": "Get injured",
        "pos": "bottom",
        "type": "verb",
        "vi": "Bị chấn thương"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How can people stay safe when doing exercise?",
        "vi": "Làm sao để an toàn khi tập thể dục?",
        "a": "People need to prepare well before exercising. They should <strong>warm up carefully for ten minutes</strong>. Wearing good sports shoes also <strong>helps protect their feet</strong>."
      },
      {
        "q": "Do people need an expensive gym to stay healthy?",
        "vi": "Mọi người có cần đến phòng gym đắt tiền để khỏe mạnh không?",
        "a": "No, I don't think so. People can <strong>walk in parks or exercise at home</strong>. Simple daily exercise is enough <strong>to keep the body healthy</strong>."
      },
      {
        "q": "How many hours of exercise per week is good for adults?",
        "vi": "Người lớn nên tập bao nhiêu giờ mỗi tuần?",
        "a": "About three hours a week is very good. Adults can do <strong>thirty minutes of easy exercise daily</strong>. This helps them stay fit <strong>without feeling too tired</strong>."
      }
    ]
  },
  {
    "id": "d-topic-04",
    "category": "drawbacks",
    "categoryName": "Nhóm Bất Lợi",
    "topicCode": "ĐỀ SỐ 04",
    "title": "There are some disadvantages of self-employment.",
    "center": "Self-employment",
    "branches": [
      {
        "num": 1,
        "text": "Financial burden",
        "pos": "top",
        "type": "noun",
        "vi": "Gánh nặng tài chính"
      },
      {
        "num": 2,
        "text": "Lack of benefits",
        "pos": "right",
        "type": "noun",
        "vi": "Thiếu các chế độ bảo hiểm, đãi ngộ"
      },
      {
        "num": 3,
        "text": "Increased responsibility",
        "pos": "bottom",
        "type": "noun",
        "vi": "Trách nhiệm nặng nề hơn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Should people start their own business even with these problems?",
        "vi": "Mọi người có nên tự mở kinh doanh dù có những vấn đề này không?",
        "a": "Yes, I think they should try. Working for yourself gives you <strong>freedom to choose your time</strong>. With hard work, people can <strong>build a successful business</strong>."
      },
      {
        "q": "Should students work for themselves or work for a company after school?",
        "vi": "Sinh viên ra trường nên tự kinh doanh hay đi làm công ty?",
        "a": "I think they should work for a company first. Young workers <strong>need to learn real skills and experience</strong>. Later, they can <strong>start their own business safely</strong>."
      },
      {
        "q": "What skills are most important for people who run their own business?",
        "vi": "Kỹ năng nào quan trọng nhất cho người tự kinh doanh?",
        "a": "Planning and speaking skills are very important. Owners <strong>need to manage money carefully every month</strong>. Talking politely with customers also <strong>helps them sell more</strong>."
      }
    ]
  },
  {
    "id": "d-topic-05",
    "category": "drawbacks",
    "categoryName": "Nhóm Bất Lợi",
    "topicCode": "ĐỀ SỐ 05",
    "title": "Living in an apartment has some disadvantages.",
    "center": "Living in an apartment",
    "branches": [
      {
        "num": 1,
        "text": "Pet restriction",
        "pos": "top",
        "type": "noun",
        "vi": "Bị hạn chế nuôi thú cưng"
      },
      {
        "num": 2,
        "text": "Limited spaces",
        "pos": "right",
        "type": "noun",
        "vi": "Không gian hạn chế"
      },
      {
        "num": 3,
        "text": "Noise from neighbors",
        "pos": "bottom",
        "type": "noun",
        "vi": "Tiếng ồn từ hàng xóm"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Why do many young families still choose apartments?",
        "vi": "Tại sao nhiều gia đình trẻ vẫn chọn sống ở chung cư?",
        "a": "Apartments have many good points for young families. The prices are fair and <strong>buildings have good security</strong>. Shops and parks nearby are <strong>also very convenient</strong>."
      },
      {
        "q": "What can people do about noisy neighbors in an apartment?",
        "vi": "Mọi người có thể làm gì khi hàng xóm ở chung cư gây ồn?",
        "a": "People should stay polite when solving this. First, they can <strong>ask their neighbors to be quieter</strong>. If it continues, they can <strong>tell the building manager</strong>."
      },
      {
        "q": "Do you prefer living in a normal house or an apartment?",
        "vi": "Bạn thích sống ở nhà riêng bình thường hay căn hộ chung cư?",
        "a": "I prefer living in an apartment. It <strong>is usually very clean, safe, and modern</strong>. Higher floors also <strong>give fresh air and quiet views</strong>."
      }
    ]
  },
  {
    "id": "d-topic-06",
    "category": "drawbacks",
    "categoryName": "Nhóm Bất Lợi",
    "topicCode": "ĐỀ SỐ 06",
    "title": "Artificial Intelligence has certain drawbacks.",
    "center": "Drawbacks of AI",
    "branches": [
      {
        "num": 1,
        "text": "Over-reliance on AI in daily life",
        "pos": "top",
        "type": "noun",
        "vi": "Quá phụ thuộc vào AI trong cuộc sống"
      },
      {
        "num": 2,
        "text": "Job loss due to automation",
        "pos": "right",
        "type": "noun",
        "vi": "Mất việc làm do tự động hóa"
      },
      {
        "num": 3,
        "text": "The risk of receiving false or biased information",
        "pos": "bottom",
        "type": "noun",
        "vi": "Nguy cơ nhận thông tin sai lệch hoặc thiên vị"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How can students avoid depending too much on AI?",
        "vi": "Làm sao học sinh tránh phụ thuộc quá nhiều vào AI?",
        "a": "Students should always try on their own first. They should <strong>write their own ideas before using AI</strong>. Teachers can also <strong>give more speaking tests in class</strong>."
      },
      {
        "q": "Can AI replace humans in art and writing?",
        "vi": "AI có thể thay thế con người trong nghệ thuật và viết lách không?",
        "a": "No, I don't think so. AI machines <strong>have no real feelings or life stories</strong>. Real art always comes <strong>from human hearts and minds</strong>."
      },
      {
        "q": "What should schools do when students use ChatGPT for homework?",
        "vi": "Trường học nên làm gì khi học sinh dùng ChatGPT làm bài tập về nhà?",
        "a": "Schools should guide students carefully. Teachers should show how to <strong>use AI as a helper</strong>. Students should do more <strong>writing tasks directly in class</strong>."
      }
    ]
  },
  {
    "id": "c-topic-01",
    "category": "causes",
    "categoryName": "Nhóm Nguyên Nhân / Lý Do",
    "topicCode": "ĐỀ SỐ 01",
    "title": "There are several causes of youth violence.",
    "center": "Youth violence",
    "branches": [
      {
        "num": 1,
        "text": "Get media influence",
        "pos": "top",
        "type": "verb",
        "vi": "Chịu ảnh hưởng từ phim ảnh, truyền thông"
      },
      {
        "num": 2,
        "text": "Have peer pressure",
        "pos": "right",
        "type": "verb",
        "vi": "Chịu áp lực từ bạn bè"
      },
      {
        "num": 3,
        "text": "Lack of parental supervision",
        "pos": "bottom",
        "type": "noun",
        "vi": "Thiếu sự giám sát của cha mẹ"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How can schools help prevent school violence?",
        "vi": "Trường học làm gì để ngăn bạo lực học đường?",
        "a": "Schools can do many useful things. Teachers should teach students to <strong>respect each other</strong>. Clear school rules and cameras can <strong>also stop fighting</strong>."
      },
      {
        "q": "Is online bullying among young people becoming worse?",
        "vi": "Bắt nạt trên mạng ở giới trẻ có đang tệ hơn không?",
        "a": "Yes, I think it is getting worse. People can easily <strong>hide their real names online</strong>. Mean comments can make teenagers <strong>feel very sad</strong>."
      },
      {
        "q": "What should parents do when teenagers are angry or act badly?",
        "vi": "Cha mẹ nên làm gì khi con cái nóng giận hoặc cư xử xấu?",
        "a": "Parents should stay calm and patient. They should <strong>talk with their children every day</strong>. Warm family love helps children <strong>control anger better</strong>."
      }
    ]
  },
  {
    "id": "c-topic-02",
    "category": "causes",
    "categoryName": "Nhóm Nguyên Nhân / Lý Do",
    "topicCode": "ĐỀ SỐ 02",
    "title": "Parents are the best teachers.",
    "center": "Parents as teachers",
    "branches": [
      {
        "num": 1,
        "text": "Be closer to the children",
        "pos": "top",
        "type": "verb",
        "vi": "Gần gũi với con cái hơn"
      },
      {
        "num": 2,
        "text": "Teach them with love and responsibility",
        "pos": "right",
        "type": "verb",
        "vi": "Dạy dỗ con bằng tình thương và trách nhiệm"
      },
      {
        "num": 3,
        "text": "Understand the strengths and weaknesses",
        "pos": "bottom",
        "type": "verb",
        "vi": "Thấu hiểu điểm mạnh và điểm yếu của con"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What values should parents teach children first?",
        "vi": "Cha mẹ nên dạy con điều tốt đẹp nào đầu tiên?",
        "a": "Parents should teach basic good habits first. Children need to be <strong>honest and polite to everyone</strong>. These habits help them <strong>become good adults later</strong>."
      },
      {
        "q": "Can parents sometimes teach their children bad habits?",
        "vi": "Cha mẹ có thể vô tình dạy con thói quen xấu không?",
        "a": "Yes, I think they can. Children often copy <strong>what their parents do at home</strong>. Therefore, parents must <strong>set a good example</strong>."
      },
      {
        "q": "Who has a bigger influence on teenagers: parents or teachers?",
        "vi": "Cha mẹ hay thầy cô có ảnh hưởng lớn hơn đến thanh thiếu niên?",
        "a": "I think parents have a bigger influence. They live with teenagers and <strong>shape their daily habits</strong>. Teachers also help by <strong>teaching school knowledge</strong>."
      }
    ]
  },
  {
    "id": "c-topic-03",
    "category": "causes",
    "categoryName": "Nhóm Nguyên Nhân / Lý Do",
    "topicCode": "ĐỀ SỐ 03",
    "title": "A lot of students have to suffer from school pressure.",
    "center": "School pressure",
    "branches": [
      {
        "num": 1,
        "text": "Parents’ expectation",
        "pos": "top",
        "type": "noun",
        "vi": "Kỳ vọng của cha mẹ"
      },
      {
        "num": 2,
        "text": "Peer competition",
        "pos": "right",
        "type": "noun",
        "vi": "Sự cạnh tranh từ bạn bè"
      },
      {
        "num": 3,
        "text": "Heavy workload",
        "pos": "bottom",
        "type": "noun",
        "vi": "Khối lượng bài vở nặng nề"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How can schools reduce exam stress for students?",
        "vi": "Trường học làm sao giảm áp lực thi cử cho học sinh?",
        "a": "Schools can change how they test students. Teachers can <strong>give less homework every day</strong>. Fun group projects also help students <strong>enjoy learning more</strong>."
      },
      {
        "q": "What should parents do when their child gets low marks?",
        "vi": "Cha mẹ nên làm gì khi con bị điểm thấp?",
        "a": "Parents should stay calm and kind. They should help their child <strong>check mistakes and improve</strong>. Warm support makes children <strong>confident to try again</strong>."
      },
      {
        "q": "Can playing sports help students reduce study stress?",
        "vi": "Chơi thể thao có giúp học sinh giảm căng thẳng học tập không?",
        "a": "Yes, playing sports helps a lot. Exercise helps students <strong>forget stress and feel happy</strong>. It also helps them <strong>sleep better at night</strong>."
      }
    ]
  },
  {
    "id": "c-topic-04",
    "category": "causes",
    "categoryName": "Nhóm Nguyên Nhân / Lý Do",
    "topicCode": "ĐỀ SỐ 04",
    "title": "Women are encouraged to become leaders.",
    "center": "Women leaders",
    "branches": [
      {
        "num": 1,
        "text": "Good communication skills",
        "pos": "top",
        "type": "noun",
        "vi": "Kỹ năng giao tiếp tốt"
      },
      {
        "num": 2,
        "text": "Effective teamwork skills",
        "pos": "right",
        "type": "noun",
        "vi": "Kỹ năng làm việc nhóm hiệu quả"
      },
      {
        "num": 3,
        "text": "The ability to multitask",
        "pos": "bottom",
        "type": "noun",
        "vi": "Khả năng xử lý nhiều việc cùng lúc"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do men and women lead in different ways?",
        "vi": "Nam và nữ lãnh đạo theo những cách khác nhau phải không?",
        "a": "Yes, I think they lead differently. Women often listen carefully and <strong>care about teamwork</strong>. Men are sometimes faster when <strong>making big decisions</strong>."
      },
      {
        "q": "What is the biggest difficulty for women who want to become top leaders?",
        "vi": "Khó khăn lớn nhất của phụ nữ khi muốn lên vị trí lãnh đạo cao là gì?",
        "a": "The biggest difficulty is balancing family and work. Women often <strong>have to do heavy housework at home</strong>. This leaves them <strong>less time for company work</strong>."
      },
      {
        "q": "How can companies help women have equal chances at work?",
        "vi": "Công ty có thể làm gì để giúp phụ nữ có cơ hội bình đẳng nơi làm việc?",
        "a": "Companies should treat men and women fairly. They should <strong>offer equal pay and fair promotions</strong>. Good rest time for mothers <strong>also helps a lot</strong>."
      }
    ]
  },
  {
    "id": "c-topic-05",
    "category": "causes",
    "categoryName": "Nhóm Nguyên Nhân / Lý Do",
    "topicCode": "ĐỀ SỐ 05",
    "title": "There are some factors causing stress in modern life.",
    "center": "Causes of stress",
    "branches": [
      {
        "num": 1,
        "text": "Study/Work burnout",
        "pos": "top",
        "type": "noun",
        "vi": "Kiệt sức do học tập hoặc công việc"
      },
      {
        "num": 2,
        "text": "Poor financial situation",
        "pos": "right",
        "type": "noun",
        "vi": "Tình hình tài chính khó khăn"
      },
      {
        "num": 3,
        "text": "Relationship problems",
        "pos": "bottom",
        "type": "noun",
        "vi": "Vấn đề trong các mối quan hệ"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What are common signs of too much stress?",
        "vi": "Những dấu hiệu thường gặp khi bị quá căng thẳng là gì?",
        "a": "Stress shows clear signs on health. People may <strong>get headaches and sleep badly</strong>. They can also <strong>get angry very quickly</strong>."
      },
      {
        "q": "Can talking to a friend help reduce stress?",
        "vi": "Nói chuyện với bạn bè có giúp giảm căng thẳng không?",
        "a": "Yes, talking with friends helps a lot. Sharing bad feelings makes <strong>people feel much lighter</strong>. Friends can also <strong>give some helpful advice</strong>."
      },
      {
        "q": "When should someone talk to a doctor about stress?",
        "vi": "Khi nào ai đó nên gặp bác sĩ về stress?",
        "a": "They should see a doctor when stress lasts too long. If stress <strong>stops them from working or sleeping</strong>, they need help. Doctors can give them <strong>safe ways to feel better</strong>."
      }
    ]
  },
  {
    "id": "c-topic-06",
    "category": "causes",
    "categoryName": "Nhóm Nguyên Nhân / Lý Do",
    "topicCode": "ĐỀ SỐ 06",
    "title": "Childhood obesity is caused by several factors.",
    "center": "Childhood obesity",
    "branches": [
      {
        "num": 1,
        "text": "Unhealthy eating habits",
        "pos": "top",
        "type": "noun",
        "vi": "Thói quen ăn uống không lành mạnh"
      },
      {
        "num": 2,
        "text": "Excessive mobile phone use",
        "pos": "right",
        "type": "noun",
        "vi": "Sử dụng điện thoại quá nhiều"
      },
      {
        "num": 3,
        "text": "Lack of physical exercise",
        "pos": "bottom",
        "type": "noun",
        "vi": "Thiếu vận động thể chất"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Should schools stop selling sweet drinks and fast food in canteens?",
        "vi": "Trường học có nên ngừng bán nước ngọt và đồ ăn nhanh ở căng tin không?",
        "a": "Yes, I think schools should stop. Sweet drinks and fried food <strong>harm children's health</strong>. School canteens should <strong>sell fresh fruit and milk</strong>."
      },
      {
        "q": "What health problems can overweight children face later in life?",
        "vi": "Trẻ thừa cân có thể gặp vấn đề sức khỏe gì sau này?",
        "a": "Overweight children face serious health risks. They may <strong>get heart problems when they grow up</strong>. They may also <strong>feel shy around their classmates</strong>."
      },
      {
        "q": "How can families help children stay active together?",
        "vi": "Gia đình làm sao để giúp trẻ cùng vận động năng động?",
        "a": "Families can enjoy sports together. Parents can take kids <strong>cycling or walking on weekends</strong>. Cooking healthy meals at home <strong>also helps a lot</strong>."
      }
    ]
  },
  {
    "id": "w-topic-01",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức / Phương Pháp",
    "topicCode": "ĐỀ SỐ 01",
    "title": "There are several ways to overcome sadness.",
    "center": "Overcome sadness",
    "branches": [
      {
        "num": 1,
        "text": "Share with someone else",
        "pos": "top",
        "type": "verb",
        "vi": "Tâm sự với người khác"
      },
      {
        "num": 2,
        "text": "Listen to music",
        "pos": "right",
        "type": "verb",
        "vi": "Nghe nhạc"
      },
      {
        "num": 3,
        "text": "Do exercise",
        "pos": "bottom",
        "type": "verb",
        "vi": "Tập thể dục"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Is crying a good way to feel better when sad?",
        "vi": "Khóc có phải là cách tốt để thấy dễ chịu hơn khi buồn không?",
        "a": "Yes, I think so. Crying is a <strong>natural way to let out bad feelings</strong>. After crying, people often <strong>feel much calmer</strong>."
      },
      {
        "q": "What should you do when a friend feels very sad?",
        "vi": "Bạn nên làm gì khi bạn bè cảm thấy rất buồn?",
        "a": "I should stay with them and listen carefully. I can <strong>say kind words to cheer them up</strong>. We can also <strong>go for a nice walk together</strong>."
      },
      {
        "q": "Can going out in nature help people feel happier?",
        "vi": "Ra ngoài hòa mình vào thiên nhiên có giúp mọi người vui hơn không?",
        "a": "Yes, I think it helps a lot. Green parks help people <strong>relax and forget worries</strong>. Fresh air also makes them <strong>feel peaceful and happy</strong>."
      }
    ]
  },
  {
    "id": "w-topic-02",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức / Phương Pháp",
    "topicCode": "ĐỀ SỐ 02",
    "title": "There are ways to maintain good workplace relationships.",
    "center": "Workplace relationships",
    "branches": [
      {
        "num": 1,
        "text": "Build effective communication skills",
        "pos": "top",
        "type": "verb",
        "vi": "Xây dựng kỹ năng giao tiếp hiệu quả"
      },
      {
        "num": 2,
        "text": "Keep good co-operation",
        "pos": "right",
        "type": "verb",
        "vi": "Duy trì sự hợp tác tốt"
      },
      {
        "num": 3,
        "text": "Avoid criticism and gossip",
        "pos": "bottom",
        "type": "verb",
        "vi": "Tránh chỉ trích và bàn tán"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Why is office gossip bad for a team?",
        "vi": "Tại sao chuyện bàn tán ở văn phòng lại có hại cho nhóm?",
        "a": "Office gossip is bad for teamwork. It breaks trust and <strong>hurts coworkers' feelings</strong>. It can also <strong>cause useless arguments at work</strong>."
      },
      {
        "q": "How can quiet workers make friends at the office?",
        "vi": "Người ít nói làm thế nào để kết bạn ở văn phòng?",
        "a": "They should start with small friendly actions. Quiet workers can <strong>smile and chat during lunch breaks</strong>. Helping teammates with small tasks also <strong>makes friends easily</strong>."
      },
      {
        "q": "Should managers hang out with workers after work?",
        "vi": "Quản lý có nên đi ăn uống với nhân viên sau giờ làm không?",
        "a": "Yes, I think they should sometimes. Team dinners help managers and workers <strong>understand each other better</strong>. However, everyone should still <strong>respect rules at work</strong>."
      }
    ]
  },
  {
    "id": "w-topic-03",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức / Phương Pháp",
    "topicCode": "ĐỀ SỐ 03",
    "title": "People should do a few things to have a successful interview.",
    "center": "A successful interview",
    "branches": [
      {
        "num": 1,
        "text": "Being punctual",
        "pos": "top",
        "type": "noun",
        "vi": "Đúng giờ"
      },
      {
        "num": 2,
        "text": "Being well-dressed",
        "pos": "right",
        "type": "noun",
        "vi": "Ăn mặc lịch sự, chỉn chu"
      },
      {
        "num": 3,
        "text": "Being humorous",
        "pos": "bottom",
        "type": "noun",
        "vi": "Hài hước, tự nhiên"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do you think first impressions are important in job interviews?",
        "vi": "Bạn có nghĩ ấn tượng ban đầu quan trọng trong phỏng vấn xin việc không?",
        "a": "Yes, I think they are important. Interviewers often form opinions about candidates in the first few minutes. Therefore, a good first impression may increase candidates’ chances of getting the job."
      },
      {
        "q": "Which do you think is more important in an interview: appearance or personality?",
        "vi": "Theo bạn điều gì quan trọng hơn trong phỏng vấn: ngoại hình hay tính cách?",
        "a": "I think both are important, but personality is more important. A good personality helps candidates communicate well with the interviewer. It can also help them build a good relationship with other people at work."
      },
      {
        "q": "What can people do if they make a bad first impression in an interview?",
        "vi": "Mọi người có thể làm gì nếu lỡ tạo ấn tượng ban đầu không tốt trong phỏng vấn?",
        "a": "They should stay calm and continue the interview confidently. They can give clear answers and show their skills. This may help change the interviewer's opinion."
      }
    ]
  },
  {
    "id": "w-topic-04",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức / Phương Pháp",
    "topicCode": "ĐỀ SỐ 04",
    "title": "There are some simple ways to stay healthy.",
    "center": "Stay healthy",
    "branches": [
      {
        "num": 1,
        "text": "Do exercise",
        "pos": "top",
        "type": "verb",
        "vi": "Tập thể dục"
      },
      {
        "num": 2,
        "text": "Manage stress",
        "pos": "right",
        "type": "verb",
        "vi": "Kiểm soát căng thẳng"
      },
      {
        "num": 3,
        "text": "Eat healthy food",
        "pos": "bottom",
        "type": "verb",
        "vi": "Ăn uống lành mạnh"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Why is drinking enough water every day important?",
        "vi": "Tại sao uống đủ nước mỗi ngày lại quan trọng?",
        "a": "Drinking enough water is very important for health. Water helps <strong>keep the body clean and fresh</strong>. It also stops people from <strong>feeling tired quickly</strong>."
      },
      {
        "q": "How many hours of sleep do adults need every night?",
        "vi": "Người lớn cần ngủ bao nhiêu tiếng mỗi đêm?",
        "a": "Adults usually need <strong>seven to eight hours of sleep</strong>. Good sleep helps the <strong>body rest after work</strong>. It also keeps the mind <strong>fresh the next morning</strong>."
      },
      {
        "q": "Is mental health as important as physical health?",
        "vi": "Sức khỏe tinh thần có quan trọng bằng sức khỏe thể chất không?",
        "a": "Yes, I think both are equally important. A happy mind helps people <strong>work well every day</strong>. It also helps them <strong>stay strong and avoid sickness</strong>."
      }
    ]
  },
  {
    "id": "w-topic-05",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức / Phương Pháp",
    "topicCode": "ĐỀ SỐ 05",
    "title": "There are effective ways to manage stress in daily life.",
    "center": "Manage stress",
    "branches": [
      {
        "num": 1,
        "text": "Do physical exercise",
        "pos": "top",
        "type": "verb",
        "vi": "Tập luyện thể chất"
      },
      {
        "num": 2,
        "text": "Talk to someone",
        "pos": "right",
        "type": "verb",
        "vi": "Tâm sự với ai đó"
      },
      {
        "num": 3,
        "text": "Take a short break",
        "pos": "bottom",
        "type": "verb",
        "vi": "Nghỉ ngơi ngắn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Does sitting quietly or resting help reduce worry?",
        "vi": "Ngồi yên tĩnh hoặc nghỉ ngơi có giúp giảm lo âu không?",
        "a": "Yes, I think it works well. Sitting quietly helps <strong>calm a busy mind</strong>. Just ten minutes a day can <strong>make people feel peaceful</strong>."
      },
      {
        "q": "Can listening to soft music help people relax?",
        "vi": "Nghe nhạc nhẹ có giúp mọi người thư giãn không?",
        "a": "Yes, soft music is very helpful. Slow songs help the <strong>body and mind slow down</strong>. It can easily <strong>reduce daily tiredness after work</strong>."
      },
      {
        "q": "Why is taking short breaks at work important?",
        "vi": "Tại sao nghỉ giải lao ngắn khi làm việc lại quan trọng?",
        "a": "Short breaks are necessary during busy days. They let the brain <strong>rest for a few minutes</strong>. Workers can then return and <strong>work much better</strong>."
      }
    ]
  },
  {
    "id": "w-topic-06",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức / Phương Pháp",
    "topicCode": "ĐỀ SỐ 06",
    "title": "There are some good ways to save money as a student.",
    "center": "Save money",
    "branches": [
      {
        "num": 1,
        "text": "Prepare meals at home",
        "pos": "top",
        "type": "verb",
        "vi": "Tự nấu ăn tại nhà"
      },
      {
        "num": 2,
        "text": "Avoid unnecessary shopping",
        "pos": "right",
        "type": "verb",
        "vi": "Tránh mua sắm không cần thiết"
      },
      {
        "num": 3,
        "text": "Set a monthly budget",
        "pos": "bottom",
        "type": "verb",
        "vi": "Lập ngân sách chi tiêu hàng tháng"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Why do you think saving money is important for students?",
        "vi": "Tại sao bạn nghĩ việc tiết kiệm tiền lại quan trọng đối với sinh viên?",
        "a": "Saving money is important because students often have a limited budget. They can use their savings to pay for books or other necessary things. It can also help them prepare for unexpected problems."
      },
      {
        "q": "Which way of saving money do you think is the most effective for students?",
        "vi": "Cách tiết kiệm tiền nào bạn nghĩ là hiệu quả nhất đối với sinh viên?",
        "a": "I think setting a monthly budget is the most effective way. Students can plan how much money they can spend each month. As a result, they can control their spending and save more money."
      },
      {
        "q": "What difficulties do students often face when trying to save money?",
        "vi": "Sinh viên thường gặp khó khăn gì khi cố gắng tiết kiệm tiền?",
        "a": "Students may find it difficult to save money because they have limited income. They may also want to buy clothes or eat out with their friends. As a result, they may spend too much money and have little left to save."
      }
    ]
  },
  {
    "id": "w-topic-07",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức / Phương Pháp",
    "topicCode": "ĐỀ SỐ 07",
    "title": "There are different ways to improve the school library.",
    "center": "Improve the school library",
    "branches": [
      {
        "num": 1,
        "text": "Add more useful books and resources",
        "pos": "top",
        "type": "verb",
        "vi": "Bổ sung thêm sách và tài liệu hữu ích"
      },
      {
        "num": 2,
        "text": "Provide digital materials and computers",
        "pos": "right",
        "type": "verb",
        "vi": "Cung cấp tài liệu số và máy tính"
      },
      {
        "num": 3,
        "text": "Create a more comfortable reading space",
        "pos": "bottom",
        "type": "verb",
        "vi": "Tạo không gian đọc sách thoải mái hơn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How can libraries attract more students to visit?",
        "vi": "Thư viện làm thế nào để thu hút nhiều học sinh đến hơn?",
        "a": "Libraries should make the room nicer. They can <strong>provide comfortable chairs, fast Wi-Fi, and new books</strong>. A quiet place will always <strong>bring more students in</strong>."
      },
      {
        "q": "Are real libraries still needed today?",
        "vi": "Thư viện thật ngày nay có còn cần thiết không?",
        "a": "Yes, real libraries are still needed. They give students a <strong>quiet place to study</strong>. Studying near hard-working friends also <strong>helps students focus better</strong>."
      },
      {
        "q": "Should food and drinks be allowed in school libraries?",
        "vi": "Có nên cho mang đồ ăn thức uống vào thư viện trường không?",
        "a": "No, I don't think so. Food and sweet drinks can <strong>make books and tables dirty</strong>. Students should eat outside <strong>before entering the library</strong>."
      }
    ]
  },
  {
    "id": "w-topic-08",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức / Phương Pháp",
    "topicCode": "ĐỀ SỐ 08",
    "title": "There are different ways to learn history effectively.",
    "center": "Learn history",
    "branches": [
      {
        "num": 1,
        "text": "Reading more history books",
        "pos": "top",
        "type": "verb",
        "vi": "Đọc thêm sách lịch sử"
      },
      {
        "num": 2,
        "text": "Listen to historical stories",
        "pos": "right",
        "type": "verb",
        "vi": "Lắng nghe các câu chuyện lịch sử"
      },
      {
        "num": 3,
        "text": "Watch historical documentaries or films",
        "pos": "bottom",
        "type": "verb",
        "vi": "Xem phim tài liệu hoặc phim lịch sử"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Why do some students find history boring?",
        "vi": "Tại sao một số học sinh thấy môn lịch sử nhàm chán?",
        "a": "Because they have to learn too much by heart. Remembering <strong>long lists of dates and names</strong> is hard. Without fun stories, history feels <strong>dry and boring</strong>."
      },
      {
        "q": "How can visiting museums make history more fun?",
        "vi": "Đi tham quan bảo tàng giúp học lịch sử vui hơn thế nào?",
        "a": "Museums make history feel very real. Students can <strong>see old tools, clothes, and photos</strong> directly. This helps them <strong>remember lessons better than reading books</strong>."
      },
      {
        "q": "Why is learning history important for people?",
        "vi": "Tại sao học lịch sử quan trọng đối với mọi người?",
        "a": "Learning history is very meaningful. It helps people <strong>understand their country's culture and past</strong>. It also teaches useful <strong>lessons for the future</strong>."
      }
    ]
  },
  {
    "id": "w-topic-09",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức / Phương Pháp",
    "topicCode": "ĐỀ SỐ 09",
    "title": "People use different ways to keep in touch with others.",
    "center": "Keep in touch",
    "branches": [
      {
        "num": 1,
        "text": "Make phone calls",
        "pos": "top",
        "type": "verb",
        "vi": "Gọi điện thoại"
      },
      {
        "num": 2,
        "text": "Meet in person",
        "pos": "right",
        "type": "verb",
        "vi": "Gặp mặt trực tiếp"
      },
      {
        "num": 3,
        "text": "Write letters or messages",
        "pos": "bottom",
        "type": "verb",
        "vi": "Viết thư hoặc gửi tin nhắn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How has social media changed the way we stay in touch?",
        "vi": "Mạng xã hội đã thay đổi cách chúng ta giữ liên lạc thế nào?",
        "a": "Social media makes staying in touch easier. People can <strong>send free messages and photos anytime</strong>. Calling friends in other countries is <strong>also very fast now</strong>."
      },
      {
        "q": "Do you prefer calling or texting?",
        "vi": "Bạn thích gọi điện hay nhắn tin hơn?",
        "a": "I usually prefer texting for daily chats. Texting is <strong>quiet, quick, and convenient</strong>. However, for urgent news, <strong>calling is faster and clearer</strong>."
      },
      {
        "q": "Why is meeting face to face still the best way to talk?",
        "vi": "Tại sao gặp mặt trực tiếp vẫn là cách nói chuyện tốt nhất?",
        "a": "Meeting in person is always the warmest way. Friends can <strong>see real smiles and body language</strong>. Spending time together helps <strong>build stronger trust and friendship</strong>."
      }
    ]
  },
  {
    "id": "q-topic-01",
    "category": "qualities",
    "categoryName": "Nhóm Đặc Điểm / Phẩm Chất",
    "topicCode": "ĐỀ SỐ 01",
    "title": "Equal partnership in a family has some features.",
    "center": "Equal partnership",
    "branches": [
      {
        "num": 1,
        "text": "Share some routines & household tasks",
        "pos": "top",
        "type": "verb",
        "vi": "Chia sẻ sinh hoạt & việc nhà"
      },
      {
        "num": 2,
        "text": "Childcare responsibility",
        "pos": "right",
        "type": "noun",
        "vi": "Trách nhiệm chăm sóc con cái"
      },
      {
        "num": 3,
        "text": "Work as a team",
        "pos": "bottom",
        "type": "verb",
        "vi": "Phối hợp như một đội"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How have the roles of husband and wife changed in the past 10 years?",
        "vi": "Vai trò của vợ và chồng đã thay đổi như thế nào trong 10 năm qua?",
        "a": "Their roles have changed a lot. In the past, men worked outside while <strong>women stayed at home</strong>. Today, both husband and wife <strong>go to work and share housework</strong>."
      },
      {
        "q": "What roles do grandparents play in a family?",
        "vi": "Ông bà đóng vai trò gì trong một gia đình?",
        "a": "Grandparents play a <strong>very important role in a family</strong>. They often help parents <strong>look after young children</strong>. They also <strong>teach grandchildren good family traditions</strong>."
      },
      {
        "q": "What do you think about single-parent families?",
        "vi": "Bạn nghĩ gì về các gia đình đơn thân?",
        "a": "I think single parents are very strong. They <strong>have to earn money and raise children alone</strong>. However, with family love, their children can <strong>still grow up happily</strong>."
      }
    ]
  },
  {
    "id": "q-topic-02",
    "category": "qualities",
    "categoryName": "Nhóm Đặc Điểm / Phẩm Chất",
    "topicCode": "ĐỀ SỐ 02",
    "title": "A good worker can adapt well to any working environment.",
    "center": "A good worker",
    "branches": [
      {
        "num": 1,
        "text": "Creativity",
        "pos": "top",
        "type": "noun",
        "vi": "Sự sáng tạo"
      },
      {
        "num": 2,
        "text": "Responsibility",
        "pos": "right",
        "type": "noun",
        "vi": "Tinh thần trách nhiệm"
      },
      {
        "num": 3,
        "text": "Have many skills",
        "pos": "bottom",
        "type": "verb",
        "vi": "Có nhiều kỹ năng đa dạng"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Why is it important for workers to adapt quickly today?",
        "vi": "Tại sao ngày nay việc nhân viên thích nghi nhanh lại quan trọng?",
        "a": "Because technology changes very fast today. When workers learn new tools quickly, they can <strong>do their jobs better</strong>. It also helps them <strong>keep their jobs more easily</strong>."
      },
      {
        "q": "Can someone improve their problem-solving skills?",
        "vi": "Một người có thể cải thiện kỹ năng giải quyết vấn đề không?",
        "a": "Yes, I think they can. People should <strong>stay calm and think step by step</strong>. They can also <strong>ask experienced coworkers for advice</strong>."
      },
      {
        "q": "Which is more important: job skills or a good work attitude?",
        "vi": "Kỹ năng làm việc hay thái độ làm việc tốt quan trọng hơn?",
        "a": "I think both are important, but <strong>a good attitude is more important</strong>. Companies can teach workers new skills easily. Workers with a good attitude are <strong>always ready to learn</strong>."
      }
    ]
  },
  {
    "id": "q-topic-03",
    "category": "qualities",
    "categoryName": "Nhóm Đặc Điểm / Phẩm Chất",
    "topicCode": "ĐỀ SỐ 03",
    "title": "A friend in need is a friend indeed.",
    "center": "A good friend",
    "branches": [
      {
        "num": 1,
        "text": "Give helpful advice",
        "pos": "top",
        "type": "verb",
        "vi": "Đưa ra lời khuyên hữu ích"
      },
      {
        "num": 2,
        "text": "Listen and keep your secrets",
        "pos": "right",
        "type": "verb",
        "vi": "Lắng nghe và giữ bí mật"
      },
      {
        "num": 3,
        "text": "Point out your mistakes",
        "pos": "bottom",
        "type": "verb",
        "vi": "Chỉ ra lỗi sai cho bạn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How can people keep close friendships when they live far apart?",
        "vi": "Mọi người làm thế nào để giữ tình bạn thân khi sống xa nhau?",
        "a": "It is quite easy today. Friends can <strong>text and make video calls every week</strong>. Visiting each other on holidays also <strong>keeps the friendship warm</strong>."
      },
      {
        "q": "Is having a few close friends better than having many casual friends?",
        "vi": "Có ít bạn thân có tốt hơn có nhiều bạn xã giao không?",
        "a": "Yes, I think it is better. Close friends <strong>truly care about you</strong>. When you have problems, they <strong>are ready to help you</strong>."
      },
      {
        "q": "What should you do if a friend breaks your trust?",
        "vi": "Bạn nên làm gì nếu một người bạn làm mất lòng tin của bạn?",
        "a": "People should <strong>stay calm and talk honestly with them</strong>. Explain clearly how you feel. If they say sorry, you can <strong>give them another chance</strong>."
      }
    ]
  },
  {
    "id": "q-topic-04",
    "category": "qualities",
    "categoryName": "Nhóm Đặc Điểm / Phẩm Chất",
    "topicCode": "ĐỀ SỐ 04",
    "title": "A good team leader has some clear qualities.",
    "center": "A team leader",
    "branches": [
      {
        "num": 1,
        "text": "Responsibility",
        "pos": "top",
        "type": "noun",
        "vi": "Tinh thần trách nhiệm"
      },
      {
        "num": 2,
        "text": "Good communication skills",
        "pos": "right",
        "type": "noun",
        "vi": "Kỹ năng giao tiếp tốt"
      },
      {
        "num": 3,
        "text": "Be supportive",
        "pos": "bottom",
        "type": "adj",
        "vi": "Luôn hỗ trợ và động viên"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Are good leaders born that way, or can people learn to be leaders?",
        "vi": "Người lãnh đạo giỏi là bẩm sinh hay có thể học để trở thành?",
        "a": "I think people can learn to be leaders. They can <strong>practice by leading small school clubs</strong>. With experience, they will <strong>manage others much better</strong>."
      },
      {
        "q": "How should a leader solve problems between team members?",
        "vi": "Người trưởng nhóm nên giải quyết mâu thuẫn giữa các thành viên như thế nào?",
        "a": "A leader should <strong>stay calm and listen to both sides</strong>. Then they can talk fairly together. This helps the team <strong>find a good answer quickly</strong>."
      },
      {
        "q": "What is the difference between a boss and a true leader?",
        "vi": "Sự khác biệt giữa một ông chủ và một người lãnh đạo thật sự là gì?",
        "a": "They are quite different. A boss mainly <strong>gives orders to workers</strong>. A true leader works with the team and <strong>helps everyone improve</strong>."
      }
    ]
  },
  {
    "id": "q-topic-05",
    "category": "qualities",
    "categoryName": "Nhóm Đặc Điểm / Phẩm Chất",
    "topicCode": "ĐỀ SỐ 05",
    "title": "A great teacher can inspire and support students in many ways.",
    "center": "A great teacher",
    "branches": [
      {
        "num": 1,
        "text": "Be creative",
        "pos": "top",
        "type": "adj",
        "vi": "Sáng tạo trong giảng dạy"
      },
      {
        "num": 2,
        "text": "Be knowledgeable",
        "pos": "right",
        "type": "adj",
        "vi": "Am hiểu kiến thức sâu rộng"
      },
      {
        "num": 3,
        "text": "Be patient",
        "pos": "bottom",
        "type": "adj",
        "vi": "Kiên nhẫn với học sinh"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Who was your favorite teacher and why?",
        "vi": "Giáo viên yêu thích nhất của bạn là ai và tại sao?",
        "a": "My favorite teacher was my high school English teacher. She was <strong>always friendly and very patient</strong>. Her clear lessons made me <strong>love learning English</strong>."
      },
      {
        "q": "Will computers ever replace human teachers?",
        "vi": "Máy tính có thể thay thế giáo viên thật không?",
        "a": "No, I don't think so. Computers are useful, but they <strong>have no real feelings</strong>. Only human teachers can <strong>care about and encourage students</strong>."
      },
      {
        "q": "What is the biggest problem for teachers today?",
        "vi": "Vấn đề lớn nhất đối với giáo viên hiện nay là gì?",
        "a": "Today, many students use phones too much. Therefore, it is <strong>hard to keep students focused in class</strong>. Teachers also <strong>have a lot of school work to prepare</strong>."
      }
    ]
  },
  {
    "id": "q-topic-06",
    "category": "qualities",
    "categoryName": "Nhóm Đặc Điểm / Phẩm Chất",
    "topicCode": "ĐỀ SỐ 06",
    "title": "A good student shows certain important qualities.",
    "center": "A good student",
    "branches": [
      {
        "num": 1,
        "text": "Self-discipline",
        "pos": "top",
        "type": "noun",
        "vi": "Tính kỷ luật tự giác"
      },
      {
        "num": 2,
        "text": "Eagerness to learn",
        "pos": "right",
        "type": "noun",
        "vi": "Sự ham học hỏi"
      },
      {
        "num": 3,
        "text": "Ability to manage time well",
        "pos": "bottom",
        "type": "noun",
        "vi": "Khả năng quản lý thời gian tốt"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Why is self-discipline so important for students today?",
        "vi": "Tại sao tính tự giác lại rất quan trọng đối với học sinh ngày nay?",
        "a": "Because students spend a lot of time online today. There are many <strong>fun videos and games on phones</strong>. Self-discipline helps students <strong>focus on their studies</strong>."
      },
      {
        "q": "Which is more important: high test scores or good character?",
        "vi": "Điểm kiểm tra cao hay nhân cách tốt quan trọng hơn?",
        "a": "I think both are important, but <strong>good character is more important</strong>. Being kind and honest helps people <strong>make good friends</strong>. It also helps them <strong>get respect from others</strong>."
      },
      {
        "q": "How can students improve their time management?",
        "vi": "Học sinh làm thế nào để cải thiện kỹ năng quản lý thời gian?",
        "a": "Students should <strong>write a simple daily to-do list</strong>. They should finish important homework first. Turning off phones also helps them <strong>study much faster</strong>."
      }
    ]
  },
  {
    "id": "f-topic-01",
    "category": "factors",
    "categoryName": "Nhóm Yếu Tố",
    "topicCode": "ĐỀ SỐ 01",
    "title": "There are several factors to consider when applying for a job.",
    "center": "Applying for a job",
    "branches": [
      {
        "num": 1,
        "text": "Salary and bonuses",
        "pos": "top",
        "type": "noun",
        "vi": "Mức lương và chế độ thưởng"
      },
      {
        "num": 2,
        "text": "Workplace location",
        "pos": "right",
        "type": "noun",
        "vi": "Địa điểm làm việc & khoảng cách"
      },
      {
        "num": 3,
        "text": "A friendly working environment",
        "pos": "bottom",
        "type": "noun",
        "vi": "Môi trường làm việc & đồng nghiệp"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Which factor do you think is the most important?",
        "vi": "Bạn nghĩ yếu tố nào là quan trọng nhất?",
        "a": "I think <strong>salary is the most important factor</strong>. A good salary helps people <strong>pay for their daily expenses and support their families</strong>. It can also help them <strong>have a more comfortable life</strong>."
      },
      {
        "q": "Do young people and older people look for the same thing in a job?",
        "vi": "Người trẻ và người lớn tuổi có tìm kiếm điều giống nhau trong công việc không?",
        "a": "No, I don't think so. Young people often <strong>want to learn new skills and gain experience</strong>. Older people may <strong>prefer stable jobs because they want more security</strong>."
      },
      {
        "q": "How can people find a job that is suitable for them?",
        "vi": "Mọi người làm thế nào để tìm được công việc phù hợp với mình?",
        "a": "People should think about their <strong>abilities, skills, experience, and interests</strong>. They can look for jobs that are <strong>suitable for these things</strong>. This can help them <strong>find a good job</strong>."
      }
    ]
  },
  {
    "id": "f-topic-02",
    "category": "factors",
    "categoryName": "Nhóm Yếu Tố",
    "topicCode": "ĐỀ SỐ 02",
    "title": "There are several factors to consider in order to make a good impression in an interview.",
    "center": "Impression in interview",
    "branches": [
      {
        "num": 1,
        "text": "Professional appearance and attire",
        "pos": "top",
        "type": "noun",
        "vi": "Trang phục và diện mạo chuyên nghiệp"
      },
      {
        "num": 2,
        "text": "Punctuality",
        "pos": "right",
        "type": "noun",
        "vi": "Đúng giờ"
      },
      {
        "num": 3,
        "text": "Clear and confident communication",
        "pos": "bottom",
        "type": "noun",
        "vi": "Giao tiếp rõ ràng và tự tin"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Which factor is the most important in a job interview?",
        "vi": "Yếu tố nào là quan trọng nhất trong một buổi phỏng vấn xin việc?",
        "a": "I think <strong>clear speaking is the most important factor</strong>. Good answers help the interviewer <strong>understand a candidate's skills</strong>. It can also show that <strong>they are ready for the job</strong>."
      },
      {
        "q": "Do you think first impressions are always right? Why or why not?",
        "vi": "Bạn có nghĩ ấn tượng ban đầu luôn đúng không? Tại sao có hoặc tại sao không?",
        "a": "No, I don't think so. Some good workers <strong>feel shy in the first few minutes</strong>. Interviewers need more time to <strong>see their real skills</strong>."
      },
      {
        "q": "What can people do if they make a bad first impression in an interview?",
        "vi": "Mọi người có thể làm gì nếu lỡ tạo ấn tượng xấu ban đầu trong buổi phỏng vấn?",
        "a": "They should <strong>stay calm and continue the interview confidently</strong>. They can give clear answers and <strong>show their skills</strong>. This may <strong>help change the interviewer's opinion</strong>."
      }
    ]
  },
  {
    "id": "f-topic-03",
    "category": "factors",
    "categoryName": "Nhóm Yếu Tố",
    "topicCode": "TOPIC 03",
    "title": "There are several factors to consider when choosing a university.",
    "center": "Choosing a university",
    "branches": [
      {
        "num": 1,
        "text": "Tuition fees",
        "pos": "top",
        "type": "noun",
        "vi": "Học phí và chi phí sinh hoạt"
      },
      {
        "num": 2,
        "text": "Academic reputation",
        "pos": "right",
        "type": "noun",
        "vi": "Danh tiếng học thuật và giảng viên"
      },
      {
        "num": 3,
        "text": "Career prospects",
        "pos": "bottom",
        "type": "noun",
        "vi": "Cơ hội việc làm sau khi ra trường"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Which factor do you think is the most important when choosing a university?",
        "vi": "Bạn nghĩ yếu tố nào là quan trọng nhất khi chọn trường đại học?",
        "a": "I think <strong>career prospects are the most important factor</strong>. Students go to university to <strong>learn good skills for work</strong>. A good school helps them <strong>find a good job later</strong>."
      },
      {
        "q": "Should high school students listen to their parents' advice when choosing a university?",
        "vi": "Học sinh cấp ba có nên nghe lời khuyên của bố mẹ khi chọn trường đại học không?",
        "a": "Yes, I think they should. Parents often <strong>have useful life experience to share</strong>. However, students should also <strong>choose a major they really like</strong>."
      },
      {
        "q": "Is studying at a famous university the only way to have a good job?",
        "vi": "Học tại một trường đại học nổi tiếng có phải là cách duy nhất để có việc làm tốt không?",
        "a": "No, I don't think so. Students from any school can <strong>work hard and learn practical skills</strong>. This can help them <strong>find a good job in the future</strong>."
      }
    ]
  },
  {
    "id": "b-topic-16",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 16",
    "title": "Having lunch at the school canteen has a lot of benefits.",
    "center": "Lunch at canteen",
    "branches": [
      {
        "num": 1,
        "text": "cheap",
        "pos": "top",
        "type": "adj",
        "vi": "Giá cả phải chăng, tiết kiệm"
      },
      {
        "num": 2,
        "text": "convenient",
        "pos": "right",
        "type": "adj",
        "vi": "Tiện lợi, không cần đi xa"
      },
      {
        "num": 3,
        "text": "time-saving",
        "pos": "bottom",
        "type": "adj",
        "vi": "Tiết kiệm thời gian nghỉ ngơi"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How does a school attract more students to have lunch at its canteen?",
        "vi": "Làm thế nào để trường học thu hút nhiều học sinh ăn trưa tại căng tin hơn?",
        "a": "I think schools should <strong>provide delicious and affordable food</strong>. They can also <strong>offer more food choices</strong> and <strong>keep the canteen clean</strong>. As a result, more students may choose to eat there."
      },
      {
        "q": "What are some disadvantages of eating at the canteen?",
        "vi": "Một số nhược điểm của việc ăn ở căng tin là gì?",
        "a": "The canteen may be <strong>crowded and noisy during lunchtime</strong>. Students may also <strong>have limited food choices</strong>. Therefore, some students may <strong>prefer eating at home</strong>."
      },
      {
        "q": "What should schools do to have hygienic and healthy meals for students?",
        "vi": "Nhà trường nên làm gì để có những bữa ăn vệ sinh và lành mạnh cho học sinh?",
        "a": "Schools should <strong>use fresh ingredients every day</strong>. They should also <strong>keep the kitchen clean</strong> and <strong>check food safety regularly</strong>. This can help students <strong>stay healthy</strong>."
      }
    ]
  },
  {
    "id": "b-topic-17",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 17",
    "title": "There are some benefits of living alone for students.",
    "center": "Living alone",
    "branches": [
      {
        "num": 1,
        "text": "independent",
        "pos": "top",
        "type": "adj",
        "vi": "Rèn luyện tính tự lập"
      },
      {
        "num": 2,
        "text": "free",
        "pos": "right",
        "type": "adj",
        "vi": "Tự do giờ giấc và sinh hoạt"
      },
      {
        "num": 3,
        "text": "peaceful",
        "pos": "bottom",
        "type": "adj",
        "vi": "Không gian yên bình, không bị làm phiền"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Is living alone popular among students? Why/ why not?",
        "vi": "Sống một mình có phổ biến ở sinh viên không? Tại sao / tại sao không?",
        "a": "Yes, I think it is <strong>becoming more popular</strong>. Many students want to <strong>have their own space</strong> and <strong>learn how to live independently</strong>."
      },
      {
        "q": "What are the disadvantages of living alone?",
        "vi": "Những bất lợi của việc sống một mình là gì?",
        "a": "Living alone can be <strong>quite expensive for students</strong>. Besides, they may <strong>feel lonely</strong> when they are sick or <strong>have problems with housework</strong>."
      },
      {
        "q": "Do students now live alone more than their parents' generation did? Why/ Why not?",
        "vi": "Sinh viên ngày nay có sống một mình nhiều hơn thế hệ cha mẹ trước đây không?",
        "a": "Yes, I think so. Nowadays, more students <strong>move to big cities for university</strong>. Families also <strong>have better financial conditions</strong> to support their children."
      }
    ]
  },
  {
    "id": "b-topic-18",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 18",
    "title": "Living on campus is beneficial to college students.",
    "center": "Living on campus",
    "branches": [
      {
        "num": 1,
        "text": "convenience",
        "pos": "top",
        "type": "noun",
        "vi": "Sự tiện lợi trong đi lại và học tập"
      },
      {
        "num": 2,
        "text": "networking",
        "pos": "right",
        "type": "noun",
        "vi": "Kết nối, mở rộng bạn bè"
      },
      {
        "num": 3,
        "text": "reasonable cost",
        "pos": "bottom",
        "type": "noun",
        "vi": "Chi phí hợp lý, tiết kiệm"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What are the disadvantages of living on campus?",
        "vi": "Những bất lợi của việc sống trong ký túc xá là gì?",
        "a": "One disadvantage is that students may <strong>have less personal privacy</strong>. In addition, they have to <strong>follow strict dormitory rules and curfew hours</strong>."
      },
      {
        "q": "What are the advantages and disadvantages of living off campus?",
        "vi": "Ưu và nhược điểm của việc thuê trọ ngoài khuôn viên trường là gì?",
        "a": "Living off campus gives students <strong>more freedom and private space</strong>. However, it is usually <strong>more expensive and takes more time to travel</strong> to school."
      },
      {
        "q": "Do you prefer living on campus or living off campus?",
        "vi": "Bạn thích sống trong ký túc xá hay ở trọ bên ngoài hơn?",
        "a": "I prefer living on campus because it is <strong>convenient and affordable for students</strong>. It also helps me <strong>be on time for early classes</strong>."
      }
    ]
  },
  {
    "id": "b-topic-19",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 19",
    "title": "There are many benefits of living in a dormitory.",
    "center": "Living in a dormitory",
    "branches": [
      {
        "num": 1,
        "text": "make new friends",
        "pos": "top",
        "type": "verb",
        "vi": "Làm quen thêm nhiều bạn mới"
      },
      {
        "num": 2,
        "text": "be close to the classroom",
        "pos": "right",
        "type": "verb",
        "vi": "Gần lớp học, tiết kiệm thời gian di chuyển"
      },
      {
        "num": 3,
        "text": "improve life skills",
        "pos": "bottom",
        "type": "verb",
        "vi": "Rèn luyện kỹ năng sống tự lập"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What are the challenges of living in a dormitory?",
        "vi": "Những khó khăn thử thách khi sống trong ký túc xá là gì?",
        "a": "One major challenge is the <strong>lack of privacy because of shared rooms</strong>. In addition, roommates may <strong>have different lifestyles and argue easily</strong>."
      },
      {
        "q": "Do you think all students should live in dormitories? Why or why not?",
        "vi": "Bạn có nghĩ tất cả sinh viên nên sống trong ký túc xá không?",
        "a": "No, I do not think so. Different students <strong>have different habits and needs</strong>. Some students <strong>need quiet places to study effectively</strong>."
      },
      {
        "q": "How can students solve conflicts with roommates?",
        "vi": "Sinh viên có thể giải quyết xung đột với bạn cùng phòng bằng cách nào?",
        "a": "Students should <strong>communicate openly and respectfully</strong>. They can also <strong>create common room rules together</strong> to avoid future problems."
      }
    ]
  },
  {
    "id": "b-topic-20",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 20",
    "title": "Taking a gap year is very beneficial.",
    "center": "Taking a gap year",
    "branches": [
      {
        "num": 1,
        "text": "gain experience",
        "pos": "top",
        "type": "verb",
        "vi": "Tích lũy kinh nghiệm sống và kỹ năng thực tế"
      },
      {
        "num": 2,
        "text": "recharge after years of schooling",
        "pos": "right",
        "type": "verb",
        "vi": "Nạp lại năng lượng sau những năm học tập căng thẳng"
      },
      {
        "num": 3,
        "text": "clarify goals for work or study",
        "pos": "bottom",
        "type": "verb",
        "vi": "Xác định rõ định hướng học tập và nghề nghiệp"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What are some disadvantages of taking a gap year?",
        "vi": "Những bất lợi của việc dành một năm nghỉ ngơi (gap year) là gì?",
        "a": "One big drawback is that students might **lose study momentum and fall behind peers**. Without a clear plan, they can easily **waste time and money on unhelpful activities**."
      },
      {
        "q": "Is taking a gap year popular in your country?",
        "vi": "Gap year có phổ biến ở đất nước của bạn không?",
        "a": "It's becoming more popular among urban students. However, traditional parents still prefer their children to **enter university immediately after finishing high school**."
      },
      {
        "q": "Will taking a gap year be more important to students in the future?",
        "vi": "Liệu việc đi gap year có trở nên quan trọng hơn với học sinh trong tương lai?",
        "a": "Yes, I believe so. Future employers will seek **practical life skills and adaptability**, which are developed effectively through **gap year challenges and volunteer projects**."
      }
    ]
  },
  {
    "id": "b-topic-21",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 21",
    "title": "Waking up early is very beneficial.",
    "center": "Waking up early",
    "branches": [
      {
        "num": 1,
        "text": "increase productivity",
        "pos": "top",
        "type": "verb",
        "vi": "Nâng cao năng suất làm việc và học tập"
      },
      {
        "num": 2,
        "text": "feel fresher",
        "pos": "right",
        "type": "verb",
        "vi": "Cảm thấy tỉnh táo, sảng khoái và tràn đầy năng lượng"
      },
      {
        "num": 3,
        "text": "have many good habits",
        "pos": "bottom",
        "type": "verb",
        "vi": "Xây dựng được nhiều thói quen sinh hoạt tốt"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do people still pay attention to their health nowadays?",
        "vi": "Mọi người ngày nay có còn chú ý đến sức khỏe của mình không?",
        "a": "Yes, they definitely do. More and more people are **eating clean, working out at gyms, and buying organic foods** to protect their wellness."
      },
      {
        "q": "How can we encourage people to lead a healthy lifestyle?",
        "vi": "Làm thế nào để khuyến khích mọi người sống lành mạnh hơn?",
        "a": "Governments and media can **build more public parks, create cycling lanes**, and launch social media fitness challenges to inspire communities."
      },
      {
        "q": "Why do many people know that bad habits are harmful but still maintain them?",
        "vi": "Tại sao nhiều người biết thói quen xấu có hại nhưng vẫn duy trì?",
        "a": "Because bad habits like smoking or staying up late offer **instant pleasure or stress relief**, while forming healthy habits requires **strong willpower and patience**."
      }
    ]
  },
  {
    "id": "b-topic-22",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 22",
    "title": "Fast food is very beneficial.",
    "center": "Fast food",
    "branches": [
      {
        "num": 1,
        "text": "save money",
        "pos": "top",
        "type": "verb",
        "vi": "Tiết kiệm chi phí, giá cả hợp lý"
      },
      {
        "num": 2,
        "text": "save time",
        "pos": "right",
        "type": "verb",
        "vi": "Tiết kiệm thời gian chuẩn bị và nấu nướng"
      },
      {
        "num": 3,
        "text": "tasty",
        "pos": "bottom",
        "type": "adj",
        "vi": "Hương vị thơm ngon, hấp dẫn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Who typically consumes fast food the most?",
        "vi": "Ai là người tiêu thụ thức ăn nhanh nhiều nhất?",
        "a": "**Teenagers, university students, and young office workers** consume fast food the most because they lead busy lives and love modern convenient dining."
      },
      {
        "q": "Does fast food affect people's eating habits in recent times?",
        "vi": "Đồ ăn nhanh có ảnh hưởng đến thói quen ăn uống thời gian gần đây không?",
        "a": "Yes, heavily. People now **cook at home less often and rely more on fast-food delivery**, which sometimes leads to unhealthy eating habits."
      },
      {
        "q": "What are some disadvantages of fast food?",
        "vi": "Những bất lợi của thức ăn nhanh là gì?",
        "a": "Fast food is high in **fat, salt, and calories**, which can cause **obesity, diabetes, and heart disease** if eaten too frequently."
      }
    ]
  },
  {
    "id": "b-topic-23",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 23",
    "title": "Living in a hostel is beneficial for university students.",
    "center": "Living in a hostel",
    "branches": [
      {
        "num": 1,
        "text": "networking",
        "pos": "top",
        "type": "noun",
        "vi": "Mở rộng mạng lưới quan hệ và bạn bè"
      },
      {
        "num": 2,
        "text": "adaptability",
        "pos": "right",
        "type": "noun",
        "vi": "Rèn luyện khả năng thích nghi và hòa nhập"
      },
      {
        "num": 3,
        "text": "responsibility",
        "pos": "bottom",
        "type": "noun",
        "vi": "Nâng cao tinh thần trách nhiệm và tính tự lập"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What are the disadvantages of living in a hostel?",
        "vi": "Những bất lợi của việc sống trong nhà trọ / ký túc xá là gì?",
        "a": "The main disadvantages are **lack of personal privacy and occasional noise**. Sharing rooms with roommates who have different sleep schedules can also cause misunderstandings."
      },
      {
        "q": "What should schools do to attract more students?",
        "vi": "Nhà trường nên làm gì để thu hút nhiều sinh viên hơn?",
        "a": "Schools should **upgrade hostel facilities with high-speed internet and air conditioners**, while ensuring cheap rental costs and tight security."
      },
      {
        "q": "What should be considered when moving to a hostel?",
        "vi": "Cần cân nhắc điều gì khi chuyển vào sống ở nhà trọ / ký túc xá?",
        "a": "Students should check the **distance to campus, monthly rental fees, security rules, and cleanliness** of the facilities before making a contract."
      }
    ]
  },
  {
    "id": "b-topic-24",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 24",
    "title": "Students should improve their self-study skills.",
    "center": "Self-study skills",
    "branches": [
      {
        "num": 1,
        "text": "more independence",
        "pos": "top",
        "type": "noun",
        "vi": "Rèn luyện tính tự lập trong tư duy và học tập"
      },
      {
        "num": 2,
        "text": "better time management",
        "pos": "right",
        "type": "noun",
        "vi": "Kỹ năng quản lý thời gian hiệu quả hơn"
      },
      {
        "num": 3,
        "text": "better academic performance",
        "pos": "bottom",
        "type": "noun",
        "vi": "Đạt kết quả và thành tích học tập vượt trội"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Are self-study skills taught at schools in your country?",
        "vi": "Kỹ năng tự học có được giảng dạy tại các trường học ở nước bạn không?",
        "a": "In Vietnam, schools are gradually incorporating **project-based learning and group presentations** to encourage self-study, although teacher-led lectures are still common."
      },
      {
        "q": "Should self-study skills be a compulsory subject at school?",
        "vi": "Kỹ năng tự học có nên là một môn học bắt buộc ở trường không?",
        "a": "Yes, I think so. Teaching students **how to read effectively, take smart notes, and manage study time** will benefit their lifelong learning journey."
      },
      {
        "q": "How does the lack of self-study skills affect students’ performance at university?",
        "vi": "Thiếu kỹ năng tự học ảnh hưởng như thế nào đến kết quả của sinh viên tại đại học?",
        "a": "At university, professors don't spoon-feed information. Students without self-study skills often **feel overwhelmed by heavy reading loads and fail difficult exams**."
      }
    ]
  },
  {
    "id": "b-topic-25",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 25",
    "title": "A healthy breakfast brings people many benefits.",
    "center": "A healthy breakfast",
    "branches": [
      {
        "num": 1,
        "text": "control weight",
        "pos": "top",
        "type": "verb",
        "vi": "Hỗ trợ kiểm soát cân nặng hiệu quả"
      },
      {
        "num": 2,
        "text": "provide energy for the day",
        "pos": "right",
        "type": "verb",
        "vi": "Cung cấp nguồn năng lượng dồi dào cho cả ngày"
      },
      {
        "num": 3,
        "text": "prevent some health problems",
        "pos": "bottom",
        "type": "verb",
        "vi": "Phòng ngừa nhiều vấn đề sức khỏe và bệnh tật"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What types of food are often served for breakfast?",
        "vi": "Những loại thực phẩm nào thường được dùng cho bữa sáng?",
        "a": "In Vietnam, popular breakfasts include **noodle soups like phở, savory sticky rice, and bánh mì**. In Western countries, people often eat **eggs, oatmeal, and toast**."
      },
      {
        "q": "What are the negative effects of skipping breakfast?",
        "vi": "Những tác hại của việc bỏ bữa sáng là gì?",
        "a": "Skipping breakfast causes **fatigue, dizziness, and poor concentration at work**. Over time, it increases the risk of **stomach ulcers and weight gain**."
      },
      {
        "q": "What makes a healthy diet?",
        "vi": "Điều gì tạo nên một chế độ ăn uống lành mạnh?",
        "a": "A healthy diet must have a **balance of fresh vegetables, lean proteins, and whole grains**, while minimizing **excessive sugar, salt, and deep-fried foods**."
      }
    ]
  },
  {
    "id": "b-topic-26",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 26",
    "title": "A healthy diet brings people many benefits.",
    "center": "A healthy diet",
    "branches": [
      {
        "num": 1,
        "text": "keep fit",
        "pos": "top",
        "type": "verb",
        "vi": "Giữ gìn vóc dáng thon gọn và cân đối"
      },
      {
        "num": 2,
        "text": "refresh people’s mind",
        "pos": "right",
        "type": "verb",
        "vi": "Giúp tinh thần sảng khoái và giảm stress"
      },
      {
        "num": 3,
        "text": "prevent some diseases",
        "pos": "bottom",
        "type": "verb",
        "vi": "Phòng ngừa nhiều bệnh tật nguy hiểm"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What makes your diet balanced?",
        "vi": "Điều gì làm cho chế độ ăn uống của bạn cân bằng?",
        "a": "A balanced diet should include **equal portions of vegetables, lean meat or fish, whole grains, and plenty of water**, while avoiding **greasy junk food**."
      },
      {
        "q": "What should be done to raise awareness of having a healthy diet in your country?",
        "vi": "Cần làm gì để nâng cao nhận thức về ăn uống lành mạnh ở nước bạn?",
        "a": "Schools should **teach nutrition in science classes**, and the media should **run cooking shows demonstrating quick healthy meals** for busy families."
      },
      {
        "q": "Which is more important for people’s health: a balanced diet or regular exercise?",
        "vi": "Điều gì quan trọng hơn cho sức khỏe: chế độ ăn cân bằng hay tập thể dục đều đặn?",
        "a": "Both are important, but **diet is slightly more crucial** because poor eating habits cannot be completely fixed even with heavy daily workouts."
      }
    ]
  },
  {
    "id": "b-topic-27",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 27",
    "title": "Trees are very important in people’s lives.",
    "center": "Trees",
    "branches": [
      {
        "num": 1,
        "text": "flood prevention",
        "pos": "top",
        "type": "noun",
        "vi": "Chống xói mòn và ngăn ngừa lũ lụt thiên tai"
      },
      {
        "num": 2,
        "text": "better environment",
        "pos": "right",
        "type": "noun",
        "vi": "Cải thiện môi trường sống và thanh lọc không khí"
      },
      {
        "num": 3,
        "text": "a source of food",
        "pos": "bottom",
        "type": "noun",
        "vi": "Cung cấp nguồn thực phẩm và dược liệu dồi dào"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do you think planting trees should be an extracurricular activity at school?",
        "vi": "Bạn có nghĩ rằng trồng cây nên là một hoạt động ngoại khóa ở trường không?",
        "a": "Yes, absolutely. Tree-planting days help students **connect with nature, understand environmental protection**, and develop teamwork skills."
      },
      {
        "q": "What else can individuals do to protect the environment?",
        "vi": "Mỗi cá nhân có thể làm gì khác để bảo vệ môi trường?",
        "a": "People can **reduce single-use plastic, use public transport**, and save electricity and water in their daily habits."
      },
      {
        "q": "What should the government do to increase green spaces?",
        "vi": "Chính phủ nên làm gì để tăng diện tích không gian xanh?",
        "a": "The government should **invest in urban parks, protect natural forests with strict laws**, and require new housing projects to plant green gardens."
      }
    ]
  },
  {
    "id": "b-topic-28",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 28",
    "title": "Reading fiction is more enjoyable than watching movies.",
    "center": "Reading fiction",
    "branches": [
      {
        "num": 1,
        "text": "improve imagination",
        "pos": "top",
        "type": "verb",
        "vi": "Kích thích và phát triển trí tưởng tượng phong phú"
      },
      {
        "num": 2,
        "text": "provide more information",
        "pos": "right",
        "type": "verb",
        "vi": "Cung cấp chi tiết và nội tâm nhân vật sâu sắc hơn"
      },
      {
        "num": 3,
        "text": "learn more languages",
        "pos": "bottom",
        "type": "verb",
        "vi": "Mở rộng vốn từ vựng và nâng cao trình độ ngôn ngữ"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What are the disadvantages of reading fiction?",
        "vi": "Những bất lợi của việc đọc tiểu thuyết là gì?",
        "a": "Reading fiction takes **a lot of time and patience**. Also, reading for hours in poor lighting can cause **eyestrain and lack of physical exercise**."
      },
      {
        "q": "What types of fiction are popular among teenagers in your country? Why?",
        "vi": "Thể loại tiểu thuyết nào phổ biến với thanh thiếu niên ở nước bạn? Tại sao?",
        "a": "Teenagers love **fantasy stories, detective fiction, and romantic novels** because these genres have **thrilling plots, magical adventures, and relatable emotions**."
      },
      {
        "q": "Should fiction writing be a compulsory subject in your country?",
        "vi": "Viết truyện hư cấu có nên là một môn học bắt buộc ở nước bạn không?",
        "a": "No, it shouldn't be compulsory for all students. However, schools can **offer creative writing workshops as optional electives** for students who have a passion for literature."
      }
    ]
  },
  {
    "id": "b-topic-29",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 29",
    "title": "There are some advantages of electric cars.",
    "center": "Electric cars",
    "branches": [
      {
        "num": 1,
        "text": "reduce pollution",
        "pos": "top",
        "type": "verb",
        "vi": "Cắt giảm khí thải và bảo vệ môi trường"
      },
      {
        "num": 2,
        "text": "save natural resources",
        "pos": "right",
        "type": "verb",
        "vi": "Tiết kiệm nguồn tài nguyên thiên nhiên và nhiên liệu hóa thạch"
      },
      {
        "num": 3,
        "text": "save money",
        "pos": "bottom",
        "type": "verb",
        "vi": "Tiết kiệm chi phí vận hành và bảo dưỡng"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What are the disadvantages of electric cars?",
        "vi": "Những nhược điểm của xe ô tô điện là gì?",
        "a": "The main drawbacks are **high initial purchase prices, limited driving range per charge, and a shortage of charging stations** in rural areas."
      },
      {
        "q": "Should companies give electric cars to employees?",
        "vi": "Các công ty có nên trang bị xe điện cho nhân viên không?",
        "a": "Yes, if the company budget allows. Providing electric vehicles **promotes a green corporate image and reduces company transport expenses** in the long term."
      },
      {
        "q": "What should the government do to develop electric cars?",
        "vi": "Chính phủ nên làm gì để phát triển phương tiện xe điện?",
        "a": "Governments should **reduce import taxes on electric vehicles and install fast charging stations** along national highways."
      }
    ]
  },
  {
    "id": "b-topic-30",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 30",
    "title": "There are some advantages of working individually.",
    "center": "Working individually",
    "branches": [
      {
        "num": 1,
        "text": "have flexibility",
        "pos": "top",
        "type": "verb",
        "vi": "Có sự linh hoạt tối đa về thời gian và phương pháp"
      },
      {
        "num": 2,
        "text": "enjoy all of success",
        "pos": "right",
        "type": "verb",
        "vi": "Hưởng trọn vẹn thành quả và sự công nhận"
      },
      {
        "num": 3,
        "text": "encounter fewer conflicts",
        "pos": "bottom",
        "type": "verb",
        "vi": "Tránh được bất đồng và xung đột ý kiến"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What are the disadvantages of working individually?",
        "vi": "Những nhược điểm của việc làm việc độc lập là gì?",
        "a": "Solo workers often face **feelings of isolation, heavy workloads, and lack of immediate feedback** when solving complex problems."
      },
      {
        "q": "Who usually works individually?",
        "vi": "Ai là những người thường làm việc một mình?",
        "a": "**Freelancers, writers, graphic designers, and software coders** usually work individually because their jobs require deep personal focus."
      },
      {
        "q": "Why do people like to work individually?",
        "vi": "Tại sao nhiều người thích làm việc một mình?",
        "a": "Because they enjoy **full control over their time and decisions**, and they don't have to deal with lazy teammates or office politics."
      }
    ]
  },
  {
    "id": "b-topic-31",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 31",
    "title": "University education is beneficial to students in a number of ways.",
    "center": "University education",
    "branches": [
      {
        "num": 1,
        "text": "academic education",
        "pos": "top",
        "type": "noun",
        "vi": "Tiếp thu nền tảng kiến thức học thuật chuyên sâu"
      },
      {
        "num": 2,
        "text": "job opportunities",
        "pos": "right",
        "type": "noun",
        "vi": "Mở rộng cơ hội việc làm và mức thu nhập cao"
      },
      {
        "num": 3,
        "text": "social skills",
        "pos": "bottom",
        "type": "noun",
        "vi": "Rèn luyện các kỹ năng mềm và kỹ năng xã hội"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What do you think about university entrance exams in Vietnam?",
        "vi": "Bạn nghĩ gì về kỳ thi tuyển sinh đại học ở Việt Nam?",
        "a": "The entrance exam is **very competitive and stressful for high school seniors**. However, it ensures **fair competition based on student abilities**."
      },
      {
        "q": "What do you think education in Vietnam will be like in the future?",
        "vi": "Bạn nghĩ giáo dục ở Việt Nam trong tương lai sẽ như thế nào?",
        "a": "I believe future education will **rely heavily on artificial intelligence, digital classrooms, and practical project-based learning**."
      },
      {
        "q": "University is the only way to success. Do you agree?",
        "vi": "Đại học là con đường duy nhất dẫn đến thành công. Bạn có đồng ý không?",
        "a": "No, I disagree. Many successful entrepreneurs and skilled technicians achieve great success through **hands-on experience and vocational training** without university."
      }
    ]
  },
  {
    "id": "b-topic-32",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 32",
    "title": "Young people should be encouraged to play musical instruments.",
    "center": "Playing musical instruments",
    "branches": [
      {
        "num": 1,
        "text": "reduce stress",
        "pos": "top",
        "type": "verb",
        "vi": "Giảm căng thẳng và cân bằng cảm xúc"
      },
      {
        "num": 2,
        "text": "manage time better",
        "pos": "right",
        "type": "verb",
        "vi": "Rèn luyện tính kỷ luật và quản lý thời gian tốt hơn"
      },
      {
        "num": 3,
        "text": "improve connections",
        "pos": "bottom",
        "type": "verb",
        "vi": "Tăng cường kết nối xã hội và tự tin giao tiếp"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do you think music should be a necessary subject in school? Why or why not?",
        "vi": "Bạn có nghĩ rằng âm nhạc nên là môn học bắt buộc ở trường không? Tại sao?",
        "a": "Yes, absolutely. Music **stimulates brain development, nurtures creativity**, and provides healthy emotional relaxation alongside heavy academic subjects."
      },
      {
        "q": "What are some popular musical instruments in your country?",
        "vi": "Những nhạc cụ nào phổ biến ở đất nước của bạn?",
        "a": "Modern instruments like **the guitar, piano, and violin** are very popular. Besides, traditional instruments like **đàn tranh and đàn bầu** are also cherished."
      },
      {
        "q": "What are some kinds of popular traditional music in your country?",
        "vi": "Những thể loại âm nhạc truyền thống nào phổ biến ở nước bạn?",
        "a": "Vietnam has unique traditional music genres such as **Quan họ folk singing, Ca trù, and Đờn ca tài tử** in the southern region."
      }
    ]
  },
  {
    "id": "b-topic-33",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 33",
    "title": "Doing exercise is good for people’s health.",
    "center": "Doing exercise",
    "branches": [
      {
        "num": 1,
        "text": "keep fit",
        "pos": "top",
        "type": "verb",
        "vi": "Giữ gìn vóc dáng cân đối và săn chắc"
      },
      {
        "num": 2,
        "text": "prevent diseases",
        "pos": "right",
        "type": "verb",
        "vi": "Phòng chống các bệnh tim mạch và mãn tính"
      },
      {
        "num": 3,
        "text": "improve people’s mood",
        "pos": "bottom",
        "type": "verb",
        "vi": "Cải thiện tâm trạng và giải tỏa căng thẳng"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Where do people in your area usually exercise?",
        "vi": "Mọi người ở khu vực bạn sống thường tập thể dục ở đâu?",
        "a": "People usually exercise in **public parks, along lakeside paths, or at commercial gym fitness centers** in the early morning and late afternoon."
      },
      {
        "q": "What is the most popular sport where you live?",
        "vi": "Môn thể thao phổ biến nhất ở nơi bạn sống là gì?",
        "a": "**Football and badminton** are the most popular sports. Men love playing football on artificial turf pitches, while badminton is played everywhere by all ages."
      },
      {
        "q": "Should physical exercise be included in schools?",
        "vi": "Thể dục thể thao có nên được đưa vào trường học không?",
        "a": "Yes, definitely. Physical education classes help children **stay active, develop healthy bone structure, and prevent childhood obesity**."
      }
    ]
  },
  {
    "id": "b-topic-34",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 34",
    "title": "Travelling abroad should be encouraged among young people.",
    "center": "Travelling abroad",
    "branches": [
      {
        "num": 1,
        "text": "facilitate adaptation",
        "pos": "top",
        "type": "verb",
        "vi": "Rèn luyện khả năng thích ứng với môi trường mới"
      },
      {
        "num": 2,
        "text": "develop cultural sensitivity",
        "pos": "right",
        "type": "verb",
        "vi": "Phát triển sự hiểu biết và tôn trọng sự đa dạng văn hóa"
      },
      {
        "num": 3,
        "text": "boost confidence",
        "pos": "bottom",
        "type": "verb",
        "vi": "Gia tăng sự tự tin và độc lập"
      },
      {
        "num": 4,
        "text": "[your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What should a person do to prepare for a trip to another country?",
        "vi": "Một người nên chuẩn bị những gì trước khi đi du lịch nước ngoài?",
        "a": "Before travelling abroad, it's very important to check passports and visas carefully. Also, travelers should exchange local currency, research the weather, and learn a few basic local greetings."
      },
      {
        "q": "What challenges can a person face when traveling abroad alone?",
        "vi": "Một người có thể gặp phải những thử thách nào khi đi du lịch nước ngoài một mình?",
        "a": "Solo travellers often face language barriers, which makes asking for directions quite difficult. Besides, they might feel lonely or face high safety risks if they fall sick in an unfamiliar place."
      },
      {
        "q": "How have traveling habits changed over the last ten years?",
        "vi": "Thói quen du lịch đã thay đổi như thế nào trong mười năm qua?",
        "a": "Over the past decade, people rely heavily on smartphones for booking flights and navigating streets. In addition, more young people now prefer eco-tourism and self-guided trips instead of rigid package tours."
      }
    ]
  },
  {
    "id": "b-topic-35",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 35",
    "title": "Visiting a foreign country is very beneficial to students.",
    "center": "Visiting a foreign country",
    "branches": [
      {
        "num": 1,
        "text": "increase knowledge",
        "pos": "top",
        "type": "verb",
        "vi": "Mở rộng vốn kiến thức thực tế"
      },
      {
        "num": 2,
        "text": "make new friends",
        "pos": "right",
        "type": "verb",
        "vi": "Kết giao bạn bè quốc tế mới"
      },
      {
        "num": 3,
        "text": "have good memories",
        "pos": "bottom",
        "type": "verb",
        "vi": "Tạo dựng những kỷ niệm đáng nhớ"
      },
      {
        "num": 4,
        "text": "[your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do people in your country often travel abroad?",
        "vi": "Người dân ở nước bạn có thường đi du lịch nước ngoài không?",
        "a": "Yes, it's becoming very common nowadays, especially among middle-class families and young people. Popular destinations include nearby Southeast Asian countries like Thailand and Singapore because flights are cheap."
      },
      {
        "q": "What are the disadvantages of traveling abroad?",
        "vi": "Những bất lợi của việc đi du lịch nước ngoài là gì?",
        "a": "Travelling abroad can be quite costly because of flights and hotels. Furthermore, travelers might suffer from jet lag, food poisoning, or language difficulties when communicating with local citizens."
      },
      {
        "q": "What should people prepare before traveling abroad?",
        "vi": "Mọi người nên chuẩn bị những gì trước khi đi du lịch nước ngoài?",
        "a": "People should check their passport validity, apply for visas, and purchase overseas health insurance. It's also wise to book accommodations early and research local customs."
      }
    ]
  },
  {
    "id": "b-topic-36",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 36",
    "title": "Working in groups benefits students a lot at school.",
    "center": "Working in groups",
    "branches": [
      {
        "num": 1,
        "text": "improve communication skills",
        "pos": "top",
        "type": "verb",
        "vi": "Cải thiện kỹ năng giao tiếp và thuyết phục"
      },
      {
        "num": 2,
        "text": "become active",
        "pos": "right",
        "type": "verb",
        "vi": "Trở nên năng động và tích cực hơn"
      },
      {
        "num": 3,
        "text": "learn better at school",
        "pos": "bottom",
        "type": "verb",
        "vi": "Học tập hiệu quả và tiếp thu bài tốt hơn"
      },
      {
        "num": 4,
        "text": "[your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What are some qualities of a good leader?",
        "vi": "Một số phẩm chất của một người lãnh đạo giỏi là gì?",
        "a": "A good leader should possess clear communication, fairness, and great patience. More importantly, they should know how to motivate teammates and listen carefully to everyone's feedback."
      },
      {
        "q": "What are some qualities of a good team?",
        "vi": "Một số phẩm chất của một tập thể nhóm tốt là gì?",
        "a": "A strong team needs mutual trust, respect, and clear division of tasks. When all members cooperate closely toward a shared goal, they can overcome any difficulties."
      },
      {
        "q": "Should students get non-academic training at school? Give an example.",
        "vi": "Học sinh có nên được đào tạo các kỹ năng phi học thuật tại trường không? Cho ví dụ.",
        "a": "Yes, absolutely. Non-academic training like time management and first aid is essential. For instance, learning basic financial literacy teaches teenagers how to budget pocket money wisely."
      }
    ]
  },
  {
    "id": "b-topic-37",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 37",
    "title": "Face-to-face communication brings many benefits to people.",
    "center": "Face-to-face communication",
    "branches": [
      {
        "num": 1,
        "text": "direct expressions",
        "pos": "top",
        "type": "noun",
        "vi": "Biểu cảm trực diện qua nét mặt và cử chỉ"
      },
      {
        "num": 2,
        "text": "closeness",
        "pos": "right",
        "type": "noun",
        "vi": "Cảm giác gần gũi và gắn kết tình cảm"
      },
      {
        "num": 3,
        "text": "immediate feedback",
        "pos": "bottom",
        "type": "noun",
        "vi": "Nhận được phản hồi tức thì và chính xác"
      },
      {
        "num": 4,
        "text": "[your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What is the role of non-verbal communication in communication?",
        "vi": "Vai trò của giao tiếp phi ngôn ngữ trong giao tiếp là gì?",
        "a": "Non-verbal communication plays a huge role because gestures and tone of voice show real emotions. Sometimes, a warm smile or nod can deliver messages more powerfully than words."
      },
      {
        "q": "How is communication today different from 10 years ago?",
        "vi": "Giao tiếp ngày nay khác với 10 năm trước như thế nào?",
        "a": "A decade ago, people met in cafes or made voice calls more often. Today, people rely heavily on video calls, emojis, and instant messaging apps like Messenger or Zalo."
      },
      {
        "q": "Does technology affect how people communicate?",
        "vi": "Công nghệ có ảnh hưởng đến cách con người giao tiếp không?",
        "a": "Yes, absolutely. Technology makes staying connected across long distances fast and cheap, but it can also make young people less confident when talking directly in person."
      }
    ]
  },
  {
    "id": "b-topic-38",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 38",
    "title": "Working from home has a lot of benefits.",
    "center": "Working from home",
    "branches": [
      {
        "num": 1,
        "text": "save time",
        "pos": "top",
        "type": "verb",
        "vi": "Tiết kiệm đáng kể thời gian đi lại"
      },
      {
        "num": 2,
        "text": "increase productivity",
        "pos": "right",
        "type": "verb",
        "vi": "Nâng cao năng suất và hiệu quả công việc"
      },
      {
        "num": 3,
        "text": "reduce working stress",
        "pos": "bottom",
        "type": "verb",
        "vi": "Giảm bớt áp lực và căng thẳng công sở"
      },
      {
        "num": 4,
        "text": "[your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What do you think are the drawbacks of working from home?",
        "vi": "Bạn nghĩ những bất lợi của việc làm việc tại nhà là gì?",
        "a": "Working from home can lead to feelings of loneliness due to less face-to-face contact. Furthermore, it's easy to get distracted by household chores, television, or noisy neighbors."
      },
      {
        "q": "Has the number of people working from home increased? Why?",
        "vi": "Số lượng người làm việc tại nhà có gia tăng không? Tại sao?",
        "a": "Yes, it has grown tremendously since the pandemic. Many companies realized that cloud software and video apps allow staff to deliver great work without renting expensive central office spaces."
      },
      {
        "q": "What is the most important factor to work effectively when working from home?",
        "vi": "Yếu tố quan trọng nhất để làm việc hiệu quả khi ở nhà là gì?",
        "a": "In my opinion, high self-discipline is the most crucial factor. Workers need clear daily schedules and must resist checking social media during designated work hours."
      }
    ]
  },
  {
    "id": "b-topic-39",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 39",
    "title": "Facebook is a useful tool to learn.",
    "center": "Facebook for learning",
    "branches": [
      {
        "num": 1,
        "text": "Way of entertainment",
        "pos": "top",
        "type": "noun",
        "vi": "Hình thức giải trí giúp việc học bớt khô khan"
      },
      {
        "num": 2,
        "text": "Way to learn",
        "pos": "right",
        "type": "noun",
        "vi": "Phương thức học tập cộng đồng thuận tiện"
      },
      {
        "num": 3,
        "text": "rich source of information",
        "pos": "bottom",
        "type": "noun",
        "vi": "Nguồn tài liệu và thông tin học thuật vô cùng phong phú"
      },
      {
        "num": 4,
        "text": "[your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How can Facebook help improve learning for students?",
        "vi": "Facebook có thể giúp cải thiện việc học của học sinh như thế nào?",
        "a": "Facebook allows students to join subject groups, exchange mock test papers, and watch educational livestreams. It also helps students practice foreign languages with native speakers in international groups."
      },
      {
        "q": "What are some educational resources that people can find on Facebook?",
        "vi": "Một số tài nguyên giáo dục mà mọi người có thể tìm thấy trên Facebook là gì?",
        "a": "Users can easily find free PDF textbooks, video lectures, vocabulary infographics, and test preparation podcasts. Many experienced teachers also organize free exam coaching livestreams."
      },
      {
        "q": "Can Facebook distract people from studying? Why or why not?",
        "vi": "Facebook có thể làm mọi người xao nhãng khỏi việc học không? Tại sao?",
        "a": "Yes, definitely. Constant push notifications, viral reels, and gossip videos tempt users easily. If students lack self-control, they might waste hours scrolling instead of doing homework."
      }
    ]
  },
  {
    "id": "b-topic-40",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 40",
    "title": "Camping is good for students.",
    "center": "Camping",
    "branches": [
      {
        "num": 1,
        "text": "fresh air",
        "pos": "top",
        "type": "noun",
        "vi": "Hít thở bầu không khí trong lành ngoài trời"
      },
      {
        "num": 2,
        "text": "nature discovery",
        "pos": "right",
        "type": "noun",
        "vi": "Khám phá vẻ đẹp kỳ thú của thế giới tự nhiên"
      },
      {
        "num": 3,
        "text": "camping skills",
        "pos": "bottom",
        "type": "noun",
        "vi": "Rèn luyện các kỹ năng sinh tồn và cắm trại thực tế"
      },
      {
        "num": 4,
        "text": "[your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do people in your country go camping? Why or why not?",
        "vi": "Người dân ở nước bạn có đi cắm trại không? Tại sao / tại sao không?",
        "a": "Yes, camping has become extremely popular over recent years. After tiring work weeks, city families and youth love travelling to green outskirts like Ba Vi or Da Lat to unwind."
      },
      {
        "q": "What should people prepare when going camping?",
        "vi": "Mọi người nên chuẩn bị những gì khi đi cắm trại?",
        "a": "Campers must pack a durable tent, sleeping bags, insect repellent, clean drinking water, and a first-aid kit. Furthermore, warm clothing and portable power banks are essential."
      },
      {
        "q": "What should be done to encourage people to protect the environment after camping?",
        "vi": "Nên làm gì để khuyến khích mọi người bảo vệ môi trường sau khi cắm trại?",
        "a": "Campground managers should set up plenty of trash bins and post clear rules. Also, educating campers on the 'Leave No Trace' principle and fining litterers heavily will keep nature pristine."
      }
    ]
  },
  {
    "id": "b-topic-41",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 41",
    "title": "Technology has a lot of benefits for students.",
    "center": "Technology",
    "branches": [
      {
        "num": 1,
        "text": "Improve knowledge",
        "pos": "top",
        "type": "verb",
        "vi": "Nâng cao và cập nhật tri thức hiện đại"
      },
      {
        "num": 2,
        "text": "provide learning source",
        "pos": "right",
        "type": "verb",
        "vi": "Cung cấp nguồn tài liệu học tập vô tận"
      },
      {
        "num": 3,
        "text": "reduce the cost of study",
        "pos": "bottom",
        "type": "verb",
        "vi": "Tiết kiệm đáng kể chi phí học tập"
      },
      {
        "num": 4,
        "text": "[your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How can students use technology effectively in their studies?",
        "vi": "Học sinh có thể sử dụng công nghệ một cách hiệu quả trong việc học bằng cách nào?",
        "a": "Students should use educational apps to organize study schedules, watch video tutorials for difficult topics, and practice with online quiz tools like Quizlet instead of wasting time gaming."
      },
      {
        "q": "What challenges do students face when using technology for learning?",
        "vi": "Học sinh đối mặt với những thách thức nào khi sử dụng công nghệ để học tập?",
        "a": "The biggest challenge is digital distraction from social media and online games. In addition, staring at computer screens for many hours can cause eye strain and poor posture."
      },
      {
        "q": "Will technology completely replace traditional learning methods in the future?",
        "vi": "Liệu công nghệ có thay thế hoàn toàn các phương pháp học tập truyền thống trong tương lai không?",
        "a": "No, I don't think so. While computers can deliver lessons, human teachers are irreplaceable because they provide emotional encouragement, moral guidance, and real-life role models for children."
      }
    ]
  },
  {
    "id": "b-topic-42",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 42",
    "title": "Strict discipline at school brings about numerous benefits for students.",
    "center": "Strict discipline",
    "branches": [
      {
        "num": 1,
        "text": "improve academic performance",
        "pos": "top",
        "type": "verb",
        "vi": "Cải thiện kết quả học tập và thi cử"
      },
      {
        "num": 2,
        "text": "teach work ethics",
        "pos": "right",
        "type": "verb",
        "vi": "Dạy tính tự giác và đạo đức làm việc chuẩn mực"
      },
      {
        "num": 3,
        "text": "keep the learning environment safe",
        "pos": "bottom",
        "type": "verb",
        "vi": "Bảo đảm môi trường học đường an toàn, lành mạnh"
      },
      {
        "num": 4,
        "text": "[your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What are the drawbacks of strict discipline in class?",
        "vi": "Những bất lợi của kỷ luật quá khắt khe trong lớp học là gì?",
        "a": "Excessive discipline can make students feel suffocated and anxious. If punishments are too harsh, it might suppress students' creativity and make them afraid of asking questions."
      },
      {
        "q": "What should the teachers do to maintain discipline in class?",
        "vi": "Giáo viên nên làm gì để duy trì kỷ luật trong lớp học?",
        "a": "Teachers should set transparent rules from day one and treat all students fairly. Instead of only shouting or punishing, praising good behavior motivates students much better."
      },
      {
        "q": "What is considered to be more important for teachers: love or respect from students?",
        "vi": "Điều gì được coi là quan trọng hơn đối với người thầy: tình thương hay sự tôn trọng từ học sinh?",
        "a": "Both are important, but respect is slightly more essential for classroom order. However, true respect naturally blossoms when teachers show genuine love, care, and dedication to their students."
      }
    ]
  },
  {
    "id": "b-topic-43",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 43",
    "title": "Learning a new skill is beneficial.",
    "center": "Learning a new skill",
    "branches": [
      {
        "num": 1,
        "text": "improve brain function",
        "pos": "top",
        "type": "verb",
        "vi": "Kích thích và cải thiện chức năng não bộ"
      },
      {
        "num": 2,
        "text": "live a more meaningful life",
        "pos": "right",
        "type": "verb",
        "vi": "Sống một cuộc đời ý nghĩa và giàu cảm hứng hơn"
      },
      {
        "num": 3,
        "text": "challenge oneself",
        "pos": "bottom",
        "type": "verb",
        "vi": "Thử thách bản thân và vượt qua vùng an toàn"
      },
      {
        "num": 4,
        "text": "[your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do you think learning new skills is important for work?",
        "vi": "Bạn có nghĩ rằng việc học các kỹ năng mới là quan trọng đối với công việc không?",
        "a": "Yes, absolutely. In today's fast-moving job market, automation and AI are changing industries quickly. Workers must continually upskill to stay valuable and get promoted."
      },
      {
        "q": "Do you believe it's better to take courses or learn new skills by yourself?",
        "vi": "Bạn tin rằng nên tham gia các khóa học hay tự học kỹ năng mới thì tốt hơn?",
        "a": "I think it depends on the skill. For complex areas like surgery or piloting, structured courses with mentors are essential. But for digital marketing or coding, self-study using free online videos can be faster and cheaper."
      },
      {
        "q": "What are the benefits of learning new skills?",
        "vi": "Những lợi ích của việc học kỹ năng mới là gì?",
        "a": "Learning new skills expands job opportunities, boosts our self-confidence, and keeps our minds active. It also lets us meet inspiring people who share similar passions."
      }
    ]
  },
  {
    "id": "b-topic-44",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 44",
    "title": "Travelling in a group is beneficial for students.",
    "center": "Travelling in a group",
    "branches": [
      {
        "num": 1,
        "text": "opportunities to learn new things",
        "pos": "top",
        "type": "noun",
        "vi": "Cơ hội phong phú để học hỏi nhiều điều mới lạ"
      },
      {
        "num": 2,
        "text": "cost-saving and safety",
        "pos": "right",
        "type": "noun",
        "vi": "Tiết kiệm chi phí và bảo đảm an toàn tối đa"
      },
      {
        "num": 3,
        "text": "teamwork and social skills",
        "pos": "bottom",
        "type": "noun",
        "vi": "Nâng cao kỹ năng làm việc nhóm và giao tiếp xã hội"
      },
      {
        "num": 4,
        "text": "[your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do you think group travel is better than solo travel for students? Why?",
        "vi": "Bạn có nghĩ du lịch theo nhóm tốt hơn du lịch một mình đối với sinh viên không? Tại sao?",
        "a": "Yes, I believe group travel is generally better for young students because it's much safer, cheaper, and more joyful. Sharing unforgettable moments with close friends creates lifelong memories."
      },
      {
        "q": "What are some difficulties students may face when travelling together?",
        "vi": "Những khó khăn mà sinh viên có thể gặp phải khi đi du lịch cùng nhau là gì?",
        "a": "The most common issue is conflicting opinions regarding where to eat or visit. Also, personality clashes, late-comers, or unequal sharing of chores can cause arguments."
      },
      {
        "q": "How can students prepare to make the most of a group trip?",
        "vi": "Sinh viên có thể chuẩn bị như thế nào để có một chuyến đi nhóm trọn vẹn nhất?",
        "a": "They should hold a planning meeting beforehand to agree on a clear budget, detailed schedule, and designated tasks. Open communication and mutual respect will ensure a wonderful trip."
      }
    ]
  },
  {
    "id": "b-topic-45",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 45",
    "title": "Taking part in extracurricular activities brings many benefits to students.",
    "center": "Extracurricular activities",
    "branches": [
      {
        "num": 1,
        "text": "social connection",
        "pos": "top",
        "type": "noun",
        "vi": "Mở rộng kết nối xã hội và mối quan hệ bạn bè"
      },
      {
        "num": 2,
        "text": "time management",
        "pos": "right",
        "type": "noun",
        "vi": "Rèn luyện kỹ năng quản lý và phân bổ thời gian"
      },
      {
        "num": 3,
        "text": "balance their life",
        "pos": "bottom",
        "type": "verb",
        "vi": "Cân bằng cuộc sống và giảm bớt căng thẳng học hành"
      },
      {
        "num": 4,
        "text": "[your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What kind of extracurricular activities do students in your country usually join?",
        "vi": "Học sinh, sinh viên ở nước bạn thường tham gia những loại hoạt động ngoại khóa nào?",
        "a": "In my country, students often join charity clubs, English speaking clubs, green volunteer campaigns, and sports teams like football or badminton. Many also take part in cultural dance troupes."
      },
      {
        "q": "Do you think these activities are more important than academic study?",
        "vi": "Bạn có nghĩ rằng các hoạt động này quan trọng hơn việc học chính khóa không?",
        "a": "No, I believe both are equally essential. Academic knowledge provides foundational qualifications, while extracurricular activities equip youth with vital communication, teamwork, and leadership skills."
      },
      {
        "q": "How can schools encourage more students to take part in extracurricular activities?",
        "vi": "Nhà trường có thể làm gì để khuyến khích nhiều học sinh tham gia hoạt động ngoại khóa hơn?",
        "a": "Schools can award extra credit points for active club participation and provide decent funding for student events. Moreover, inviting inspiring alumni to talk about the benefits will motivate teenagers."
      }
    ]
  },
  {
    "id": "b-topic-46",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 46",
    "title": "Playing team sports brings many benefits.",
    "center": "Team sports",
    "branches": [
      {
        "num": 1,
        "text": "keep fit",
        "pos": "top",
        "type": "verb",
        "vi": "Giữ gìn vóc dáng và nâng cao sức khỏe thể chất"
      },
      {
        "num": 2,
        "text": "make friends",
        "pos": "right",
        "type": "verb",
        "vi": "Giao lưu và kết bạn cùng chung niềm đam mê"
      },
      {
        "num": 3,
        "text": "learn new skills",
        "pos": "bottom",
        "type": "verb",
        "vi": "Học hỏi các kỹ năng chiến thuật và làm việc nhóm"
      },
      {
        "num": 4,
        "text": "[your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What are some popular team sports in your country?",
        "vi": "Những môn thể thao đồng đội nào phổ biến ở nước bạn?",
        "a": "Football is undoubtedly the king of sports in my country, followed by volleyball, basketball, and badminton doubles. You can see people playing football on pitches every evening."
      },
      {
        "q": "Do you think children should be encouraged to play team sports? Why or why not?",
        "vi": "Bạn có nghĩ trẻ em nên được khuyến khích chơi các môn thể thao đồng đội không? Tại sao?",
        "a": "Yes, absolutely. Team sports keep children away from smartphone screens and couch-potato habits. They also teach kids how to collaborate, handle defeat gracefully, and respect peers."
      },
      {
        "q": "How can people be encouraged to do exercise regularly?",
        "vi": "Làm thế nào để khuyến khích mọi người tập thể dục đều đặn hơn?",
        "a": "Local authorities should build more free public exercise parks with outdoor gym machines. Also, organizing community running races and fitness challenges will inspire everyone to stay active."
      }
    ]
  },
  {
    "id": "b-topic-47",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 47",
    "title": "Many people believe that setting goals plays an important role in life.",
    "center": "Setting goals",
    "branches": [
      {
        "num": 1,
        "text": "measurable progress",
        "pos": "top",
        "type": "noun",
        "vi": "Đo lường được sự tiến bộ và đánh giá lộ trình"
      },
      {
        "num": 2,
        "text": "self-motivation",
        "pos": "right",
        "type": "noun",
        "vi": "Thúc đẩy động lực tự thân và lòng kiên trì"
      },
      {
        "num": 3,
        "text": "planning for the future",
        "pos": "bottom",
        "type": "noun",
        "vi": "Hoạch định tương lai vững chắc và chủ động"
      },
      {
        "num": 4,
        "text": "[your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do you think short-term or long-term goals are more useful? Why?",
        "vi": "Bạn nghĩ rằng mục tiêu ngắn hạn hay dài hạn hữu ích hơn? Tại sao?",
        "a": "I think both are mutually supportive. Long-term goals give us a big vision and ultimate direction, but short-term daily goals are more actionable and prevent us from feeling overwhelmed."
      },
      {
        "q": "What can happen if someone lives without any goals?",
        "vi": "Điều gì có thể xảy ra nếu một người sống mà không có mục tiêu nào?",
        "a": "Without goals, people often feel lost, unmotivated, and bored with life. They might waste precious time on meaningless habits and struggle to make progress in their studies or careers."
      },
      {
        "q": "Should schools teach students how to set and achieve goals?",
        "vi": "Nhà trường có nên dạy học sinh cách thiết lập và hoàn thành mục tiêu không?",
        "a": "Yes, absolutely. Teaching methods like SMART goal-setting early helps students manage study schedules, overcome procrastination, and build self-reliance for their adult lives."
      }
    ]
  },
  {
    "id": "d-topic-07",
    "category": "drawbacks",
    "categoryName": "Nhóm Bất Lợi",
    "topicCode": "ĐỀ SỐ 07",
    "title": "There are a lot of disadvantages to keeping animals in zoos.",
    "center": "Keeping animals in zoos",
    "branches": [
      {
        "num": 1,
        "text": "lack of space",
        "pos": "top",
        "type": "noun",
        "vi": "Thiếu không gian sống tự nhiên"
      },
      {
        "num": 2,
        "text": "lack of survival skills",
        "pos": "right",
        "type": "noun",
        "vi": "Mất dần kỹ năng sinh tồn tự nhiên"
      },
      {
        "num": 3,
        "text": "loss of freedom",
        "pos": "bottom",
        "type": "noun",
        "vi": "Mất tự do, bị giam giữ"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What kinds of animals are usually kept in zoos?",
        "vi": "Những loài động vật nào thường được nuôi nhốt trong sở thú?",
        "a": "Zoos usually keep <strong>wild animals such as tigers, lions, elephants, and monkeys</strong>. They also have <strong>birds, reptiles, and sea creatures</strong>."
      },
      {
        "q": "What are the benefits of keeping animals in zoos?",
        "vi": "Những lợi ích của việc giữ động vật trong sở thú là gì?",
        "a": "Zoos can <strong>protect endangered animals from extinction</strong>. They also <strong>educate children about wildlife and nature conservation</strong>."
      },
      {
        "q": "What can people do to protect wildlife species?",
        "vi": "Con người có thể làm gì để bảo vệ các loài động vật hoang dã?",
        "a": "People should <strong>stop buying illegal wildlife products</strong>. Governments should also <strong>protect natural forests and punish illegal hunters strictly</strong>."
      }
    ]
  },
  {
    "id": "d-topic-08",
    "category": "drawbacks",
    "categoryName": "Nhóm Bất Lợi",
    "topicCode": "ĐỀ SỐ 08",
    "title": "There are several negative effects of online communication.",
    "center": "Online communication",
    "branches": [
      {
        "num": 1,
        "text": "reduce face-to-face interaction",
        "pos": "top",
        "type": "verb",
        "vi": "Làm giảm tương tác trực tiếp"
      },
      {
        "num": 2,
        "text": "lead to conflict",
        "pos": "right",
        "type": "verb",
        "vi": "Dễ dẫn đến hiểu lầm, xung đột"
      },
      {
        "num": 3,
        "text": "get distracted easily",
        "pos": "bottom",
        "type": "verb",
        "vi": "Dễ bị xao nhãng khỏi công việc/học tập"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What kind of modern communication technology do you use most often?",
        "vi": "Bạn thường sử dụng công nghệ giao tiếp hiện đại nào nhất?",
        "a": "I mostly use <strong>messaging apps on my smartphone like Zalo and Messenger</strong>. They help me <strong>send text messages and make free video calls</strong> easily."
      },
      {
        "q": "Do you think technology will completely replace face-to-face communication in the future?",
        "vi": "Liệu công nghệ có thay thế hoàn toàn giao tiếp trực tiếp trong tương lai không?",
        "a": "No, I do not think so. Face-to-face communication is <strong>more personal and emotional</strong>. People still need <strong>direct meetings to build true trust and deep friendships</strong>."
      },
      {
        "q": "How can people avoid problems caused by online communication?",
        "vi": "Mọi người có thể tránh những rắc rối do giao tiếp trực tuyến gây ra bằng cách nào?",
        "a": "People should <strong>write clear and polite messages</strong>. If an argument happens, they should <strong>call directly or meet in person to resolve it calmly</strong>."
      }
    ]
  },
  {
    "id": "d-topic-09",
    "category": "drawbacks",
    "categoryName": "Nhóm Bất Lợi",
    "topicCode": "ĐỀ SỐ 09",
    "title": "There are several drawbacks of internships.",
    "center": "Internships",
    "branches": [
      {
        "num": 1,
        "text": "unpaid or low-paid work",
        "pos": "top",
        "type": "noun",
        "vi": "Công việc không lương hoặc lương rất thấp"
      },
      {
        "num": 2,
        "text": "heavy workload and pressure",
        "pos": "right",
        "type": "noun",
        "vi": "Khối lượng công việc lớn và nhiều áp lực"
      },
      {
        "num": 3,
        "text": "limited guidance",
        "pos": "bottom",
        "type": "noun",
        "vi": "Ít nhận được sự hướng dẫn chu đáo"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do you think students should be required to complete an internship before graduation? Why?",
        "vi": "Có nên bắt buộc sinh viên hoàn thành kỳ thực tập trước khi tốt nghiệp không?",
        "a": "Yes, I think so. An internship helps students <strong>gain practical work experience and apply theoretical knowledge</strong>. It also prepares them for <strong>future professional employment</strong>."
      },
      {
        "q": "How do internships influence students’ future job opportunities?",
        "vi": "Kỳ thực tập ảnh hưởng như thế nào đến cơ hội việc làm sau này của sinh viên?",
        "a": "Internships can <strong>make students' CVs look more impressive</strong>. Moreover, good interns often <strong>receive official job offers from companies</strong> right after graduation."
      },
      {
        "q": "What can universities do to help students have better internship experiences?",
        "vi": "Các trường đại học có thể làm gì để giúp sinh viên có trải nghiệm thực tập tốt hơn?",
        "a": "Universities should <strong>partner with reputable companies</strong>. They should also <strong>provide career workshops to prepare students with essential interview and workplace skills</strong>."
      }
    ]
  },
  {
    "id": "c-topic-07",
    "category": "causes",
    "categoryName": "Nhóm Nguyên Nhân / Lý Do",
    "topicCode": "ĐỀ SỐ 07",
    "title": "There are several reasons why responsibility is important.",
    "center": "Responsibility",
    "branches": [
      {
        "num": 1,
        "text": "improve teamwork skills",
        "pos": "top",
        "type": "verb",
        "vi": "Nâng cao kỹ năng làm việc nhóm"
      },
      {
        "num": 2,
        "text": "earn trust from others",
        "pos": "right",
        "type": "verb",
        "vi": "Giành được sự tin cậy từ người khác"
      },
      {
        "num": 3,
        "text": "achieve better results",
        "pos": "bottom",
        "type": "verb",
        "vi": "Đạt được kết quả và thành tích tốt hơn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What are some responsibilities that young people should have?",
        "vi": "Những trách nhiệm mà người trẻ nên có là gì?",
        "a": "Young people should <strong>study seriously and respect their parents</strong>. In addition, they should <strong>obey the laws and contribute positively to community activities</strong>."
      },
      {
        "q": "Do you think people today are more or less responsible than in the past? Why?",
        "vi": "Bạn nghĩ người ngày nay có trách nhiệm hơn hay ít hơn trước đây?",
        "a": "I think people today are <strong>equally responsible</strong>. Many young people are <strong>very active in environmental protection and social projects</strong> to help others."
      },
      {
        "q": "How can parents or schools teach children to become more responsible?",
        "vi": "Cha mẹ hoặc nhà trường có thể dạy trẻ trở nên có trách nhiệm hơn bằng cách nào?",
        "a": "Parents can <strong>give children daily household chores</strong>. Schools should also <strong>encourage group projects so children learn to finish their own parts</strong>."
      }
    ]
  },
  {
    "id": "c-topic-08",
    "category": "causes",
    "categoryName": "Nhóm Nguyên Nhân / Lý Do",
    "topicCode": "ĐỀ SỐ 08",
    "title": "There are several reasons why training workshops are important in life.",
    "center": "Training workshops",
    "branches": [
      {
        "num": 1,
        "text": "update knowledge",
        "pos": "top",
        "type": "verb",
        "vi": "Cập nhật những kiến thức mới"
      },
      {
        "num": 2,
        "text": "develop new professional skills",
        "pos": "right",
        "type": "verb",
        "vi": "Phát triển thêm các kỹ năng chuyên môn"
      },
      {
        "num": 3,
        "text": "expand social networks",
        "pos": "bottom",
        "type": "verb",
        "vi": "Mở rộng các mối quan hệ xã hội và nghề nghiệp"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What kinds of workshops are popular in your area?",
        "vi": "Những loại hội thảo nào đang phổ biến ở khu vực của bạn?",
        "a": "<strong>Language workshops and digital marketing seminars</strong> are very popular in my city. Many students and young workers attend them to <strong>upgrade their skills for better jobs</strong>."
      },
      {
        "q": "Why do some people prefer online workshops to face-to-face ones?",
        "vi": "Tại sao một số người thích các hội thảo trực tuyến hơn gặp mặt trực tiếp?",
        "a": "They prefer online workshops because they are <strong>flexible and save travel time</strong>. Participants can <strong>join from home and review recorded lessons anytime</strong>."
      },
      {
        "q": "How can companies encourage their employees to join training workshops?",
        "vi": "Các công ty có thể khuyến khích nhân viên tham gia các buổi đào tạo bằng cách nào?",
        "a": "Companies should <strong>pay for workshop fees and organize training during working hours</strong>. They can also <strong>offer bonuses or promotion opportunities</strong> to active learners."
      }
    ]
  },
  {
    "id": "c-topic-09",
    "category": "causes",
    "categoryName": "Nhóm Nguyên Nhân / Lý Do",
    "topicCode": "ĐỀ SỐ 09",
    "title": "There are several reasons why decision-making skills are important.",
    "center": "Decision-making skills",
    "branches": [
      {
        "num": 1,
        "text": "solve problems effectively",
        "pos": "top",
        "type": "verb",
        "vi": "Giải quyết các vấn đề một cách hiệu quả"
      },
      {
        "num": 2,
        "text": "improve personal responsibility",
        "pos": "right",
        "type": "verb",
        "vi": "Nâng cao tinh thần trách nhiệm của bản thân"
      },
      {
        "num": 3,
        "text": "save time",
        "pos": "bottom",
        "type": "verb",
        "vi": "Tiết kiệm thời gian và hạn chế sai lầm"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Who do you think should learn decision-making skills?",
        "vi": "Theo bạn những ai nên học kỹ năng ra quyết định?",
        "a": "I think <strong>everyone should learn decision-making skills</strong>. Students and young professionals need them to <strong>choose career paths and make wise daily choices</strong>."
      },
      {
        "q": "What can happen if a person doesn’t have good decision-making skills?",
        "vi": "Điều gì có thể xảy ra nếu một người không có kỹ năng ra quyết định tốt?",
        "a": "They may <strong>make poor choices and face stressful problems</strong>. This can <strong>waste their precious time and hurt their study or career progress</strong>."
      },
      {
        "q": "How can people learn or develop decision-making skills?",
        "vi": "Mọi người có thể rèn luyện hoặc phát triển kỹ năng ra quyết định bằng cách nào?",
        "a": "People can <strong>learn from past mistakes and ask experienced mentors for advice</strong>. Practicing <strong>evaluating pros and cons before choosing</strong> is also very helpful."
      }
    ]
  },
  {
    "id": "c-topic-10",
    "category": "causes",
    "categoryName": "Nhóm Nguyên Nhân / Lý Do",
    "topicCode": "ĐỀ SỐ 10",
    "title": "Maintaining calmness is important for effective communication.",
    "center": "Maintaining calmness",
    "branches": [
      {
        "num": 1,
        "text": "promote active listening",
        "pos": "top",
        "type": "verb",
        "vi": "Thúc đẩy việc chú tâm lắng nghe người khác"
      },
      {
        "num": 2,
        "text": "solve conflicts",
        "pos": "right",
        "type": "verb",
        "vi": "Giúp tháo gỡ và giải quyết các mâu thuẫn"
      },
      {
        "num": 3,
        "text": "help build understanding",
        "pos": "bottom",
        "type": "verb",
        "vi": "Xây dựng sự thấu hiểu lẫn nhau"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What other factors are important for effective communication?",
        "vi": "Những yếu tố nào khác cũng quan trọng để giao tiếp hiệu quả?",
        "a": "I think <strong>polite body language and clear speaking</strong> are equally important. People should also <strong>respect different points of view</strong>."
      },
      {
        "q": "Why do you think some people find it difficult to stay calm in conversations?",
        "vi": "Tại sao một số người lại thấy khó giữ bình tĩnh trong các cuộc trò chuyện?",
        "a": "Some people <strong>get angry easily under heavy stress or pressure</strong>. In addition, when disagreements happen, they may <strong>react emotionally without thinking carefully first</strong>."
      },
      {
        "q": "Do you think people should always stay calm when communicating? Why or why not?",
        "vi": "Bạn có nghĩ mọi người lúc nào cũng nên giữ bình tĩnh khi giao tiếp không? Tại sao?",
        "a": "Yes, I think so. Staying calm helps people <strong>express ideas clearly and avoid hurtful words</strong>. It also <strong>protects long-term relationships from being damaged</strong>."
      }
    ]
  },
  {
    "id": "w-topic-10",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức",
    "topicCode": "ĐỀ SỐ 10",
    "title": "There are several solutions to reduce obesity.",
    "center": "Reduce obesity",
    "branches": [
      {
        "num": 1,
        "text": "cook at home",
        "pos": "top",
        "type": "verb",
        "vi": "Tự nấu ăn lành mạnh tại nhà"
      },
      {
        "num": 2,
        "text": "limit fast food consumption",
        "pos": "right",
        "type": "verb",
        "vi": "Hạn chế ăn thức ăn nhanh"
      },
      {
        "num": 3,
        "text": "do more physical exercise",
        "pos": "bottom",
        "type": "verb",
        "vi": "Tập thể dục thể thao nhiều hơn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What types of fast food are popular in your country?",
        "vi": "Những loại đồ ăn nhanh nào phổ biến ở nước bạn?",
        "a": "<strong>Fried chicken, hamburgers, pizza, and milk tea</strong> are very popular in Vietnam, especially among teenagers and young students."
      },
      {
        "q": "Why do many people choose to eat fast food?",
        "vi": "Tại sao nhiều người lại chọn ăn đồ ăn nhanh?",
        "a": "They choose fast food because it is <strong>quick, tasty, and very convenient for busy schedules</strong>. Many fast-food restaurants also <strong>have cozy places to hang out</strong>."
      },
      {
        "q": "What can governments do to encourage people to live a healthier lifestyle?",
        "vi": "Chính phủ có thể làm gì để khuyến khích người dân sống lành mạnh hơn?",
        "a": "Governments should <strong>build more free public parks and outdoor sports equipment</strong>. They can also <strong>run public campaigns about healthy eating and tax sugary drinks</strong>."
      }
    ]
  },
  {
    "id": "w-topic-11",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức",
    "topicCode": "ĐỀ SỐ 11",
    "title": "There are several ways to make the world a better place.",
    "center": "Make the world a better place",
    "branches": [
      {
        "num": 1,
        "text": "reduce pollution",
        "pos": "top",
        "type": "verb",
        "vi": "Giảm thiểu ô nhiễm môi trường"
      },
      {
        "num": 2,
        "text": "do volunteer work",
        "pos": "right",
        "type": "verb",
        "vi": "Tham gia công việc tình nguyện"
      },
      {
        "num": 3,
        "text": "follow laws and regulations",
        "pos": "bottom",
        "type": "verb",
        "vi": "Tuân thủ luật pháp và các quy định"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What environmental problems are most serious in your country?",
        "vi": "Vấn đề môi trường nào nghiêm trọng nhất ở nước bạn?",
        "a": "I think <strong>air pollution and plastic waste are the most serious problems</strong>. In big cities, <strong>heavy traffic emissions affect people's health directly</strong>."
      },
      {
        "q": "Do you think individuals or the government should take more responsibility for improving society?",
        "vi": "Cá nhân hay chính phủ nên chịu nhiều trách nhiệm hơn trong việc cải thiện xã hội?",
        "a": "I think <strong>both should share the responsibility equally</strong>. Governments can <strong>enact strict laws</strong>, while individuals must <strong>obey rules and take green daily actions</strong>."
      },
      {
        "q": "How can young people help create a better future for the world?",
        "vi": "Người trẻ có thể giúp tạo ra một tương lai tốt đẹp hơn cho thế giới bằng cách nào?",
        "a": "Young people can <strong>study hard, master new technologies, and protect the environment</strong>. They can also <strong>spread kindness and help disadvantaged people in society</strong>."
      }
    ]
  },
  {
    "id": "w-topic-12",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức",
    "topicCode": "ĐỀ SỐ 12",
    "title": "Technology has influenced people’s working habits in many ways.",
    "center": "Technology and working habits",
    "branches": [
      {
        "num": 1,
        "text": "offer flexible working styles",
        "pos": "top",
        "type": "verb",
        "vi": "Mang lại các hình thức làm việc linh hoạt như làm việc từ xa"
      },
      {
        "num": 2,
        "text": "support communication",
        "pos": "right",
        "type": "verb",
        "vi": "Hỗ trợ việc giao tiếp, họp trực tuyến dễ dàng"
      },
      {
        "num": 3,
        "text": "increase efficiency",
        "pos": "bottom",
        "type": "verb",
        "vi": "Nâng cao năng suất và hiệu quả công việc"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How has technology made work easier for people nowadays?",
        "vi": "Công nghệ đã giúp công việc của con người dễ dàng hơn như thế nào ngày nay?",
        "a": "Technology allows people to <strong>automate boring tasks, share documents instantly, and work from anywhere</strong>. Therefore, work becomes <strong>faster and much more convenient</strong>."
      },
      {
        "q": "What skills do workers need to use technology effectively?",
        "vi": "Người lao động cần những kỹ năng gì để sử dụng công nghệ hiệu quả?",
        "a": "Workers need <strong>basic computer skills, digital communication skills, and data security awareness</strong>. They also need <strong>adaptability to learn new software tools continuously</strong>."
      },
      {
        "q": "Do you think technology will improve working habits even more in the future?",
        "vi": "Bạn có nghĩ công nghệ sẽ còn cải thiện thói quen làm việc nhiều hơn nữa trong tương lai?",
        "a": "Yes, I believe so. <strong>AI tools and virtual offices</strong> will help people work even smarter. However, workers must also <strong>learn to balance screen time and real-life health</strong>."
      }
    ]
  },
  {
    "id": "d-topic-10",
    "category": "drawbacks",
    "categoryName": "Nhóm Bất Lợi",
    "topicCode": "ĐỀ SỐ 10",
    "title": "There are some drawbacks of using private cars in big cities.",
    "center": "Private cars",
    "branches": [
      {
        "num": 1,
        "text": "cause traffic jams",
        "pos": "top",
        "type": "verb",
        "vi": "Gây ùn tắc giao thông nghiêm trọng"
      },
      {
        "num": 2,
        "text": "pollute the environment",
        "pos": "right",
        "type": "verb",
        "vi": "Gây ô nhiễm môi trường và không khí"
      },
      {
        "num": 3,
        "text": "waste money",
        "pos": "bottom",
        "type": "verb",
        "vi": "Tốn kém chi phí, lãng phí tiền bạc"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Why do people often use private cars?",
        "vi": "Tại sao mọi người thường thích sử dụng xe ô tô cá nhân?",
        "a": "Many people prefer private cars because they are **comfortable and convenient**. Drivers don't need to **wait in bad weather** and can travel whenever they want."
      },
      {
        "q": "What means of public transportation should be developed in the area that you live in?",
        "vi": "Phương tiện giao thông công cộng nào nên được phát triển ở khu vực bạn sống?",
        "a": "I think the city should **develop modern metro trains and electric buses**. These systems can **carry many passengers quickly** and help reduce air pollution."
      },
      {
        "q": "Do you think public transportation should be free?",
        "vi": "Bạn có nghĩ rằng phương tiện công cộng nên được miễn phí không?",
        "a": "Yes, I think so. Free public transit will **encourage more citizens to leave their cars at home**. This can **reduce traffic jams and save money for low-income workers**."
      }
    ]
  },
  {
    "id": "d-topic-11",
    "category": "drawbacks",
    "categoryName": "Nhóm Bất Lợi",
    "topicCode": "ĐỀ SỐ 11",
    "title": "There are many drawbacks of cohabitation.",
    "center": "Cohabitation",
    "branches": [
      {
        "num": 1,
        "text": "higher rate of separation",
        "pos": "top",
        "type": "noun",
        "vi": "Tỷ lệ chia tay và tan vỡ cao hơn"
      },
      {
        "num": 2,
        "text": "more financial issues",
        "pos": "right",
        "type": "noun",
        "vi": "Nhiều khúc mắc và bất đồng về tài chính"
      },
      {
        "num": 3,
        "text": "more tension",
        "pos": "bottom",
        "type": "noun",
        "vi": "Nhiều áp lực và căng thẳng tâm lý"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What do you think about young people getting married nowadays?",
        "vi": "Bạn nghĩ gì về việc giới trẻ kết hôn ngày nay?",
        "a": "I notice that young people tend to **get married later than previous generations**. They want to **focus on education, build a stable career**, and achieve financial independence first."
      },
      {
        "q": "Do you think Western values influence young people's views on marriage in Vietnam?",
        "vi": "Bạn có nghĩ các giá trị phương Tây ảnh hưởng đến quan điểm hôn nhân của giới trẻ Việt Nam?",
        "a": "Yes, Western culture encourages young Vietnamese to **value personal freedom and independence**. As a result, more people **accept living alone or cohabitation** before marriage."
      },
      {
        "q": "Why is the divorce rate increasing?",
        "vi": "Tại sao tỷ lệ ly hôn ngày càng gia tăng?",
        "a": "The divorce rate is rising because of **heavy financial pressure, busy lifestyles, and lack of communication**. Spouses often **argue over money and don't spend enough quality time together**."
      }
    ]
  },
  {
    "id": "d-topic-12",
    "category": "drawbacks",
    "categoryName": "Nhóm Bất Lợi",
    "topicCode": "ĐỀ SỐ 12",
    "title": "Social media has some disadvantages.",
    "center": "Social media",
    "branches": [
      {
        "num": 1,
        "text": "get distracted easily",
        "pos": "top",
        "type": "verb",
        "vi": "Dễ bị xao nhãng học tập và công việc"
      },
      {
        "num": 2,
        "text": "lack face-to-face interaction",
        "pos": "right",
        "type": "verb",
        "vi": "Thiếu sự tương tác và gắn kết trực tiếp"
      },
      {
        "num": 3,
        "text": "leak personal information",
        "pos": "bottom",
        "type": "verb",
        "vi": "Dễ bị rò rỉ và lộ thông tin cá nhân"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do you think social media is important for young people today?",
        "vi": "Bạn có nghĩ rằng mạng xã hội quan trọng với giới trẻ ngày nay không?",
        "a": "Yes, I think it is very important. Social media helps young people **stay connected with friends, search for study materials, and update daily news quickly**."
      },
      {
        "q": "Which social media platforms are the most popular nowadays?",
        "vi": "Nền tảng mạng xã hội nào phổ biến nhất hiện nay?",
        "a": "Platforms like **Facebook, TikTok, and Instagram** are the most popular. Young people love TikTok for **entertaining short videos** and Instagram for **sharing beautiful photos**."
      },
      {
        "q": "Should children be supervised when they use social media? Why or why not?",
        "vi": "Trẻ em có nên được giám sát khi dùng mạng xã hội không? Tại sao?",
        "a": "Yes, absolutely. Parents should monitor their kids to **protect them from online scams, violent content, and cyberbullying**."
      }
    ]
  },
  {
    "id": "w-topic-13",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức",
    "topicCode": "ĐỀ SỐ 13",
    "title": "There are some funny ways to learn English.",
    "center": "Learn English",
    "branches": [
      {
        "num": 1,
        "text": "games",
        "pos": "top",
        "type": "noun",
        "vi": "Chơi các trò chơi ngôn ngữ"
      },
      {
        "num": 2,
        "text": "english clubs",
        "pos": "right",
        "type": "noun",
        "vi": "Tham gia các câu lạc bộ tiếng Anh"
      },
      {
        "num": 3,
        "text": "songs",
        "pos": "bottom",
        "type": "noun",
        "vi": "Học tiếng Anh qua các bài hát"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Why is playing games useful for learning English?",
        "vi": "Tại sao chơi trò chơi lại hữu ích cho việc học tiếng Anh?",
        "a": "Playing games makes learning **fun and low-stress**. It stimulates the brain, creates healthy competition, and helps players **remember vocabulary much longer**."
      },
      {
        "q": "Does learning English through music help improve English skills?",
        "vi": "Học tiếng Anh qua âm nhạc có giúp cải thiện kỹ năng không?",
        "a": "Yes, absolutely. Music helps improve **listening comprehension and natural pronunciation**. By singing along, learners can **mimic native accents and intonation easily**."
      },
      {
        "q": "Do children find it easier to learn English than adults?",
        "vi": "Trẻ em có học tiếng Anh dễ hơn người lớn không?",
        "a": "Yes, I think so. Children learn through **play, imitation, and curiosity without fear of making mistakes**. Their brains absorb new sounds and pronunciation **much more naturally**."
      }
    ]
  },
  {
    "id": "w-topic-14",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức",
    "topicCode": "ĐỀ SỐ 14",
    "title": "There are many ways to create healthy eating habits.",
    "center": "Healthy eating habits",
    "branches": [
      {
        "num": 1,
        "text": "eat more vegetables",
        "pos": "top",
        "type": "verb",
        "vi": "Ăn nhiều rau xanh và trái cây tươi"
      },
      {
        "num": 2,
        "text": "cook at home more regularly",
        "pos": "right",
        "type": "verb",
        "vi": "Tự nấu ăn tại nhà thường xuyên hơn"
      },
      {
        "num": 3,
        "text": "eat less fast food",
        "pos": "bottom",
        "type": "verb",
        "vi": "Hạn chế đồ ăn nhanh và thực phẩm chế biến sẵn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Why is it important to build healthy eating habits?",
        "vi": "Tại sao việc xây dựng thói quen ăn uống lành mạnh lại quan trọng?",
        "a": "A healthy diet **provides sustained energy, keeps the body fit, and strengthens immunity**. It effectively **prevents dangerous chronic diseases** like diabetes and heart problems."
      },
      {
        "q": "In your opinion, how has eating behavior in your area changed compared to the past?",
        "vi": "Theo bạn, thói quen ăn uống ở nơi bạn sống đã thay đổi như thế nào so với trước đây?",
        "a": "In the past, people mainly ate **home-cooked meals with fresh local vegetables**. Nowadays, busy lifestyles make many people **rely heavily on food delivery and fast food chains**."
      },
      {
        "q": "How can we promote healthy eating habits?",
        "vi": "Chúng ta có thể thúc đẩy thói quen ăn uống lành mạnh bằng cách nào?",
        "a": "Schools and media should **organize nutritional awareness campaigns**. Additionally, supermarkets can **offer discounts on fresh vegetables and healthy organic foods**."
      }
    ]
  },
  {
    "id": "w-topic-15",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức",
    "topicCode": "ĐỀ SỐ 15",
    "title": "There are some ways to reduce crime rates.",
    "center": "Reduce crime rates",
    "branches": [
      {
        "num": 1,
        "text": "improve education and training opportunities",
        "pos": "top",
        "type": "verb",
        "vi": "Nâng cao chất lượng giáo dục và đào tạo nghề"
      },
      {
        "num": 2,
        "text": "install surveillance cameras in public places",
        "pos": "right",
        "type": "verb",
        "vi": "Lắp đặt camera an ninh tại các khu vực công cộng"
      },
      {
        "num": 3,
        "text": "send criminals to prison",
        "pos": "bottom",
        "type": "verb",
        "vi": "Áp dụng hình phạt nghiêm khắc và cải tạo phạm nhân"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Have you ever encountered a criminal in person?",
        "vi": "Bạn đã bao giờ trực tiếp gặp phải tội phạm chưa?",
        "a": "Fortunately, I have never had a dangerous encounter. However, I once **witnessed a bag snatcher on a crowded street**, which made me much more cautious in public."
      },
      {
        "q": "What is the most common type of crime in your city?",
        "vi": "Loại tội phạm phổ biến nhất tại thành phố của bạn là gì?",
        "a": "In my city, **petty theft, pickpocketing, and online financial scams** are the most common. Scammers frequently use **fake phone calls and links to steal bank accounts**."
      },
      {
        "q": "Do you consider your country to be a safe place to live?",
        "vi": "Bạn có coi đất nước của mình là một nơi an toàn để sinh sống không?",
        "a": "Yes, definitely. Vietnam is a **very peaceful country with strict gun control laws**. People can **walk outside at night without worrying about violent crime**."
      }
    ]
  },
  {
    "id": "c-topic-11",
    "category": "causes",
    "categoryName": "Nhóm Nguyên Nhân",
    "topicCode": "ĐỀ SỐ 11",
    "title": "There are some causes of overpopulation.",
    "center": "Overpopulation",
    "branches": [
      {
        "num": 1,
        "text": "decline in death rate",
        "pos": "top",
        "type": "noun",
        "vi": "Tỷ lệ tử vong giảm mạnh"
      },
      {
        "num": 2,
        "text": "lack of family planning",
        "pos": "right",
        "type": "noun",
        "vi": "Thiếu kiến thức kế hoạch hóa gia đình"
      },
      {
        "num": 3,
        "text": "better health care system",
        "pos": "bottom",
        "type": "noun",
        "vi": "Hệ thống chăm sóc y tế ngày càng hoàn thiện"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What are some negative effects of overpopulation?",
        "vi": "Những tác động tiêu cực của việc bùng nổ dân số là gì?",
        "a": "Overpopulation leads to **severe traffic jams, housing shortages, pollution, and high unemployment**. It also puts enormous pressure on **water and healthcare systems**."
      },
      {
        "q": "What can be done to solve overpopulation?",
        "vi": "Có thể làm gì để giải quyết vấn đề bùng nổ dân số?",
        "a": "Governments should **invest in sex education, provide free birth control methods**, and encourage couples to have smaller families."
      },
      {
        "q": "Do developing countries suffer more from overpopulation than developed ones?",
        "vi": "Các nước đang phát triển có chịu ảnh hưởng nặng nề hơn các nước phát triển không?",
        "a": "Yes, definitely. Developing countries have **limited financial budgets and weaker public infrastructure**, making it harder to provide enough food, hospitals, and schools."
      }
    ]
  },
  {
    "id": "c-topic-12",
    "category": "causes",
    "categoryName": "Nhóm Nguyên Nhân",
    "topicCode": "ĐỀ SỐ 12",
    "title": "There are several reasons for divorce.",
    "center": "Divorce",
    "branches": [
      {
        "num": 1,
        "text": "lack of responsibility",
        "pos": "top",
        "type": "noun",
        "vi": "Thiếu tinh thần trách nhiệm với gia đình"
      },
      {
        "num": 2,
        "text": "financial burden",
        "pos": "right",
        "type": "noun",
        "vi": "Gánh nặng và áp lực tài chính"
      },
      {
        "num": 3,
        "text": "communication problems",
        "pos": "bottom",
        "type": "noun",
        "vi": "Bất đồng và thiếu giao tiếp thấu hiểu"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What are some advantages of getting married?",
        "vi": "Những ưu điểm của việc kết hôn là gì?",
        "a": "Marriage offers **lifelong companionship, emotional comfort, and mutual financial support**. Raising children together also provides a **stable and loving home environment**."
      },
      {
        "q": "How can people maintain a happy marriage?",
        "vi": "Làm thế nào để duy trì một cuộc hôn nhân hạnh phúc?",
        "a": "Spouses should **practice active listening, respect each other's differences, and share chores**. Spending **regular quality time on dates** also keeps love alive."
      },
      {
        "q": "Some people say young people today don’t want to get married. What do you think about this?",
        "vi": "Nhiều người nói giới trẻ ngày nay không muốn kết hôn. Bạn nghĩ gì về điều này?",
        "a": "I think it is partly true. High living costs and career demands make many young people **fear the burdens of marriage and prioritize personal freedom**."
      }
    ]
  },
  {
    "id": "c-topic-13",
    "category": "causes",
    "categoryName": "Nhóm Nguyên Nhân",
    "topicCode": "ĐỀ SỐ 13",
    "title": "Higher education should be free for everyone.",
    "center": "Free higher education",
    "branches": [
      {
        "num": 1,
        "text": "an equal chance for everyone",
        "pos": "top",
        "type": "noun",
        "vi": "Tạo cơ hội học tập bình đẳng cho mọi tầng lớp"
      },
      {
        "num": 2,
        "text": "a safer world",
        "pos": "right",
        "type": "noun",
        "vi": "Xây dựng một xã hội văn minh và an toàn hơn"
      },
      {
        "num": 3,
        "text": "solutions to unemployment",
        "pos": "bottom",
        "type": "noun",
        "vi": "Giải pháp hữu hiệu giúp giảm tỷ lệ thất nghiệp"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do you think it is reasonable to apply free higher education in Vietnam?",
        "vi": "Bạn có nghĩ rằng việc áp dụng miễn phí đại học ở Việt Nam là hợp lý không?",
        "a": "Currently, full free tuition is difficult because of **limited state budgets**. However, the government can **provide substantial scholarships and low-interest student loans** for needy learners."
      },
      {
        "q": "“University is the only way to success”. Do you agree?",
        "vi": "“Đại học là con đường duy nhất dẫn đến thành công”. Bạn có đồng ý không?",
        "a": "No, I disagree. While university is valuable, many people achieve great success through **vocational careers, entrepreneurship, and practical hands-on experience**."
      },
      {
        "q": "Should lower education be free for everyone as well?",
        "vi": "Các bậc học thấp hơn có nên được miễn phí cho mọi người không?",
        "a": "Yes, absolutely. Primary and secondary schooling are **fundamental human rights**. Universal free school ensures that **all children become literate and active citizens**."
      }
    ]
  },
  {
    "id": "c-topic-14",
    "category": "causes",
    "categoryName": "Nhóm Nguyên Nhân",
    "topicCode": "ĐỀ SỐ 14",
    "title": "Childhood is the most important time of a person’s life.",
    "center": "Childhood",
    "branches": [
      {
        "num": 1,
        "text": "develop physical health",
        "pos": "top",
        "type": "verb",
        "vi": "Phát triển thể chất và nền tảng sức khỏe"
      },
      {
        "num": 2,
        "text": "form personality",
        "pos": "right",
        "type": "verb",
        "vi": "Hình thành nhân cách, tính cách và đạo đức"
      },
      {
        "num": 3,
        "text": "learn things fast",
        "pos": "bottom",
        "type": "verb",
        "vi": "Khả năng tiếp thu và học hỏi nhanh nhất"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How does childhood influence a person's future health?",
        "vi": "Tuổi thơ ảnh hưởng như thế nào đến sức khỏe tương lai của một người?",
        "a": "A healthy childhood with **wholesome food and sports builds a strong immune system**. Conversely, early malnutrition or lack of exercise leads to **chronic diseases in adulthood**."
      },
      {
        "q": "In what ways does a child's personality develop during early years?",
        "vi": "Nhân cách của một đứa trẻ phát triển theo những cách nào trong những năm đầu đời?",
        "a": "Children develop their character through **family interaction, playing with peers, and imitating parents' actions**. Warm encouragement helps them become **confident and caring individuals**."
      },
      {
        "q": "Why do children tend to learn new things more quickly than adults?",
        "vi": "Tại sao trẻ em có xu hướng học những điều mới nhanh hơn người lớn?",
        "a": "Children have **curious minds, highly flexible brains, and no fear of making mistakes**. They absorb new information like sponges through **daily play and exploration**."
      }
    ]
  },
  {
    "id": "c-topic-15",
    "category": "causes",
    "categoryName": "Nhóm Nguyên Nhân",
    "topicCode": "ĐỀ SỐ 15",
    "title": "Traditional music should be kept.",
    "center": "Traditional music",
    "branches": [
      {
        "num": 1,
        "text": "cultural values",
        "pos": "top",
        "type": "noun",
        "vi": "Lưu giữ bản sắc và giá trị văn hóa độc đáo"
      },
      {
        "num": 2,
        "text": "historical values",
        "pos": "right",
        "type": "noun",
        "vi": "Bảo tồn các chứng tích và giá trị lịch sử hào hùng"
      },
      {
        "num": 3,
        "text": "educational values",
        "pos": "bottom",
        "type": "noun",
        "vi": "Giá trị giáo dục đạo đức và tình yêu quê hương"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What role does traditional music play in your country’s culture?",
        "vi": "Âm nhạc truyền thống đóng vai trò gì trong văn hóa đất nước bạn?",
        "a": "Traditional music is the **spiritual soul of Vietnamese culture**. It is performed during **traditional festivals, village rituals, and lunar new year celebrations**."
      },
      {
        "q": "How can we promote traditional music among younger generations?",
        "vi": "Làm thế nào để quảng bá âm nhạc truyền thống cho thế hệ trẻ?",
        "a": "Schools should **include traditional instruments in music classes**. Also, modern musicians can **remix folk melodies with contemporary pop music** to attract young listeners."
      },
      {
        "q": "Do you think traditional music is losing its popularity? Why or why not?",
        "vi": "Bạn có nghĩ rằng âm nhạc truyền thống đang mất dần sự phổ biến không? Tại sao?",
        "a": "Yes, unfortunately. Many young people prefer **modern pop, rock, and EDM**. However, cultural preservation efforts are helping **revive interest in recent years**."
      }
    ]
  }
];


// Linking Flashcards Pool
const FLASHCARDS_DATA = [
    { cat: 'Mở bài', front: 'There are some benefits of [topic].', back: 'Có một số lợi ích của... (Mở bài dạng Lợi ích)', ex: 'There are some benefits of teamwork in modern workplaces.' },
    { cat: 'Mở bài', front: 'There are some drawbacks of [topic].', back: 'Có một số nhược điểm/bất lợi của... (Mở bài dạng Bất lợi)', ex: 'There are some drawbacks of living in big cities.' },
    { cat: 'Mở bài', front: 'There are several causes of [topic].', back: 'Có một số nguyên nhân dẫn đến... (Mở bài dạng Nguyên nhân)', ex: 'There are several causes of youth violence.' },
    { cat: 'Mở bài', front: 'There are some reasons why [S+V]...', back: 'Có một số lý do tại sao... (Mở bài dạng Lý do)', ex: 'There are some reasons why women are encouraged to become leaders.' },
    { cat: 'Mở bài', front: 'There are some ways for [O] to [V]...', back: 'Có một số cách để [ai đó] [làm gì] (Mở bài dạng Cách thức)', ex: 'There are some ways for students to save money.' },
    { cat: 'Mở bài', front: 'There are several factors to consider when...', back: 'Có một số yếu tố cần cân nhắc khi... (Mở bài dạng Yếu tố)', ex: 'There are several factors to consider when applying for a job.' },
    { cat: 'Thân bài - Nhánh 1', front: 'One major advantage / factor is that...', back: 'Một ưu điểm / yếu tố lớn là...', ex: 'One major advantage is that online learning is flexible.' },
    { cat: 'Thân bài - Nhánh 2', front: 'Another advantage / reason is that...', back: 'Một ưu điểm / lý do khác là...', ex: 'Another advantage is that soft skills help people work better.' },
    { cat: 'Thân bài - Nhánh 3', front: 'One more good point / important factor is that...', back: 'Thêm một điểm tốt / yếu tố quan trọng nữa là...', ex: 'One more good point is that online learning is money-saving.' },
    { cat: 'Giải thích lý do', front: 'This is because...', back: 'Điều này là bởi vì...', ex: 'This is because students can study anytime and anywhere.' },
    { cat: 'Giải thích lý do', front: 'This means that...', back: 'Điều này có nghĩa là...', ex: 'This means that employees do not need to commute in traffic.' },
    { cat: 'Đưa ra ví dụ', front: 'For example, / For instance,', back: 'Ví dụ như, chẳng hạn như,', ex: 'For example, team members need to share their ideas.' },
    { cat: 'Đưa ra ví dụ', front: 'To be specific,', back: 'Cụ thể là,', ex: 'To be specific, they can handle many tasks at the same time.' },
    { cat: 'Nêu kết quả', front: 'Therefore, / As a result,', back: 'Vì vậy, do đó, kết quả là,', ex: 'Therefore, they can communicate more effectively.' },
    { cat: 'Nêu kết quả', front: 'This helps [O] to [V]...', back: 'Điều này giúp [ai đó] làm gì...', ex: 'This helps them save a lot of money on transport.' },
    { cat: 'Kết bài', front: 'In short, [Chủ đề] has several clear benefits.', back: 'Tóm lại, [Chủ đề] có một số lợi ích rõ ràng.', ex: 'In short, teamwork has several clear benefits, as mentioned above.' },
    { cat: 'Câu hỏi mở rộng', front: 'Now, I will answer some follow-up questions.', back: 'Bây giờ, tôi xin phép trả lời các câu hỏi mở rộng.', ex: 'Now, I will answer some follow-up questions: Number 1...' }
];

// App State
const state = {
    student: {
        name: '',
        classCode: '',
        isTeacher: false
    },
    theme: localStorage.getItem('vstep_sp3_theme') || 'light',
    audioEnabled: true,
    speechRate: 1.0,
    selectedVoiceURI: null,
    currentSimTopic: ALL_TOPICS_POOL[0],
    simTimer: {
        phase: 'ready',
        timeLeft: 60,
        totalTime: 60,
        interval: null,
        isPaused: false
    },
    audioRecorder: {
        mediaRecorder: null,
        audioChunks: [],
        audioBlob: null,
        audioUrl: null
    },
    cardIndex: 0
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    initTheme();
    initVoices();
    initNavigation();
    initExamSimulator();
    initFlashcards();
    renderAllMindmaps();
    initTopicCompletion();
});

// Danh sách học viên các lớp được cấp quyền truy cập
const CLASS_STUDENTS = {
    "CB206": [
        "Văn Như Anh", "Nguyễn Thị Vân Anh", "Nguyễn Thị Hồng Duyên", "Nguyễn Thị Thúy Hồng",
        "Trương Ngọc Nhi", "Nguyễn Phạm Như Quỳnh", "Trần Lê Quỳnh", "Thị Mỹ Tâm", "Ông Lê Thành",
        "Trần Nguyễn Thanh Thảo", "Phan Nhật Thiện", "Nguyễn Mỹ Tiên", "Trần Thị Cẩm Tiên",
        "Võ Trần Bảo Tính", "Trương Thanh Toàn", "Phạm Ngọc Trâm", "Nguyễn Võ Bảo Trân"
    ],
    "CB210": [
        "Nguyễn Võ Thành Đạt", "Lê Huỳnh Thanh Duy", "Nguyễn Cao Kỳ Duyên", "Đào Ngọc Hân", 
        "Trần Văn Hữu", "Trần Văn Kim Khoa", "Nguyễn Thanh Nâng", "Huỳnh Kỳ Nguyên", 
        "Võ Thị Kim Nguyên", "Võ Hùng Sanh", "Tiền Thị Thanh Thảo", "Trần Thị Thanh Thảo", "Đặng Thị Kim Thoa", 
        "Trần Thị Tiên Tiên", "Lê Kim Tuyền"
    ],
    "CB211": [
        "Hồ Anh Quân", "Lê Thành Nghiệp", "Lê Khánh Lâm", "Huỳnh Thị Ngọc Thắm", 
        "Mai Trần Xuân Mai", "Lê Thị Uyển Nhi", "Nguyễn Thụy Thanh Trúc"
    ],
    "CB213": [
        "Nguyễn Quốc Anh", "Hoàng Hợp Minh Châu", "Đặng Châu Gia Huy", "Trần Minh Tuệ Mẩn", 
        "Đặng Thị Trúc Măng", "Trương Thị Kha My", "Ngô Diễm My", "Chiêm Chúc Ngân", 
        "Huỳnh Thị Yến Nhi", "Phạm Nguyễn Tâm Như", "Phạm Nhựt Tiến", "Lê Thị Tú Trinh", 
        "Trần Ngọc Vinh"
    ],
    "ONB103": [
        "Nguyễn Thị Duy", "Phạm Trần Mỹ Hân", "Trịnh Thị Thu Hiền", "Nguyễn Hoàng Kha",
        "Phạm Thị Út Lua", "Lê Huỳnh Diễm My", "Nguyễn Thị Ngọc Mỹ", "Huỳnh Thị Kim Ngân",
        "Trần Thị Kim Ngân", "Nguyễn Thị Tiểu Phụng", "Trần Yến Phụng", "Phạm Ngọc Thạch",
        "Cao Thị Thu Trang", "Nguyễn Thị Thanh Tuyền", "Trần Phạm Phương Uyên", "Trần Ngô Mỹ Vy"
    ],
    "CB219": [
        "Lưu Thị Vân Anh", "Nguyễn Tuấn Anh", "Trần Thị Huỳnh Duy", "Duy Thị Quỳnh Hân",
        "Trần Thị Xuân Hoa", "Nguyễn Phạm Khang", "Đặng Văn Khánh", "Chim Nhật Luân",
        "Lư Vĩnh Phúc", "Nguyễn Chí Thiện", "Trần Thị Ngọc Thơ", "Huỳnh Yến Trang",
        "Thị Thu Trinh", "Nguyễn Thị Mỹ Xuyên", "Nguyễn Như Ý"
    ],
    "B212": [
        "Nguyễn Duy Hồng Anh", "Nguyễn Ngọc Minh Anh", "Nguyễn Lê Mỹ Hân", "Nguyễn Hồng Minh Huy",
        "Nguyễn Quốc Khải", "Đoàn Nguyễn Đình Khang", "Lê Nguyễn Gia Khánh", "Nguyễn Hữu Khánh", 
        "Hồ Thị Ngọc Lan", "Trần Thị Hồng Lỉnh", "Võ Thị Triệu Minh", "Hứa Đình Nghi", 
        "Võ Thị Bảo Ngọc", "Lê Tiến Phát", "Nguyễn Hoàng Thông", "Nguyễn Kim Tiền", 
        "Lê Thị Bảo Trân", "Võ Thị Diễm Trinh", "Nguyễn Tấn Trung", "Nguyễn Tiến Trung", 
        "Trần Thị Ánh Tuyết", "Đặng Nguyễn Khánh Uyên", "Nguyễn Thị Chúc Yến"
    ],
    "B2": [
        "Gia Tuệ"
    ]
};

// Chuẩn hóa chuỗi so sánh họ tên
function normalizeStr(str) {
    return (str || '')
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[đĐ]/g, 'd')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();
}

// Authentication & Access Control
function initAuth() {
    const modal = document.getElementById('welcome-modal');
    const startBtn = document.getElementById('start-btn');
    const nameInput = document.getElementById('student-name');
    const classInput = document.getElementById('student-class');
    const errorMsg = document.getElementById('login-error');
    const displayName = document.getElementById('display-name');
    const userProfile = document.getElementById('user-profile');
    const userRoleLabel = userProfile ? userProfile.querySelector('.info span') : null;
    const userAvatar = userProfile ? userProfile.querySelector('.avatar') : null;

    // Luôn luôn hiển thị modal đăng nhập mỗi khi tải lại trang / refresh
    state.student.name = '';
    state.student.classCode = '';
    state.student.isTeacher = false;
    
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.remove('hidden');
    }
    if (userProfile) {
        userProfile.classList.add('hidden');
    }
    if (nameInput) nameInput.value = '';
    if (classInput) classInput.value = '';
    if (errorMsg) errorMsg.style.display = 'none';

    // Cho phép nhấn vào profile để đăng xuất hoặc đổi tài khoản
    if (userProfile) {
        userProfile.style.cursor = 'pointer';
        userProfile.title = 'Nhấn để đổi tài khoản hoặc đăng xuất';
        userProfile.onclick = () => {
            if (confirm('Bạn có muốn đổi tài khoản hoặc đăng nhập lại không?')) {
                location.reload();
            }
        };
    }

    function handleLogin() {
        const nameVal = nameInput ? nameInput.value.trim() : '';
        const classVal = classInput ? classInput.value.trim() : '';

        if (!nameVal || !classVal) {
            if (errorMsg) {
                errorMsg.textContent = 'Vui lòng nhập đầy đủ Họ tên và Mã lớp!';
                errorMsg.style.display = 'block';
            }
            if (!nameVal && nameInput) nameInput.focus();
            else if (!classVal && classInput) classInput.focus();
            return;
        }

        let formattedClass = classVal.toUpperCase().replace(/\s+/g, '');
        // Tự động nhận diện CB21O tương đương CB210
        if (formattedClass === 'CB21O') {
            formattedClass = 'CB210';
        }

        const normName = normalizeStr(nameVal);

        // 1. Kiểm tra tài khoản Giáo viên (tên PTMN, mã lớp GV)
        const isTeacher = 
            (formattedClass === 'GV' || formattedClass === 'GV2026') ||
            normName === 'ptmn' ||
            normName.includes('ptmn') ||
            normName.includes('co nguyet') ||
            normName.includes('minh nguyet') ||
            normName.includes('pham thi minh nguyet');

        let finalName = '';
        let finalClass = '';

        if (isTeacher) {
            finalName = (normName === 'ptmn' || !nameVal) ? 'Cô Nguyệt (PTMN)' : nameVal;
            finalClass = formattedClass || 'GV';
            state.student.isTeacher = true;
        } else {
            // 2. Kiểm tra học viên thuộc các lớp được cấp phép
            const allowedClasses = ['CB206', 'CB210', 'CB211', 'CB213', 'ONB103', 'CB219', 'B212', 'B2'];
            if (!allowedClasses.includes(formattedClass)) {
                if (errorMsg) {
                    errorMsg.textContent = 'Mã lớp không hợp lệ! Web chỉ nhận các lớp CB206, CB210, CB211, CB213, ONB103, CB219, B212, B2 hoặc Giáo viên (PTMN / GV).';
                    errorMsg.style.display = 'block';
                }
                if (classInput) classInput.focus();
                return;
            }

            const roster = CLASS_STUDENTS[formattedClass];
            const matchedStudent = roster.find(s => {
                const normS = normalizeStr(s);
                return normS === normName || normName.endsWith(' ' + normS) || normS.endsWith(' ' + normName);
            });

            if (!matchedStudent) {
                if (errorMsg) {
                    errorMsg.textContent = `Họ và tên không thuộc danh sách lớp ${formattedClass}. Vui lòng kiểm tra lại chính tả!`;
                    errorMsg.style.display = 'block';
                }
                if (nameInput) nameInput.focus();
                return;
            }

            finalName = (formattedClass === 'B2' && nameVal.trim().length > matchedStudent.length) ? nameVal.trim() : matchedStudent;
            finalClass = formattedClass;
            state.student.isTeacher = false;
        }

        if (errorMsg) errorMsg.style.display = 'none';

        state.student.name = finalName;
        state.student.classCode = finalClass;

        const logData = `${finalName} - Lớp: ${finalClass}`;
        const trackingUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdnmu4S5vco1TBcNBUGaeEAlbpan_w4aO9JMLIqbafBKABh4g/formResponse';

        try {
            const entry = document.getElementById('entry_388968236');
            const form = document.getElementById('google-form') || document.getElementById('tracking-form');
            if (entry && form) {
                entry.value = logData;
                form.submit();
            }
        } catch (e) {
            console.warn('Iframe attendance submit warning:', e);
        }

        try {
            const formData = new FormData();
            formData.append('entry.388968236', logData);
            fetch(trackingUrl, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            }).catch(e => console.warn('Fetch tracking warning:', e));
        } catch (e) {
            console.warn('Fetch init warning:', e);
        }

        if (modal) modal.style.display = 'none';
        if (displayName) displayName.innerText = finalName + ' (' + finalClass + ')';
        if (userRoleLabel) userRoleLabel.innerText = state.student.isTeacher ? 'Giáo viên' : 'Học viên';
        if (userAvatar && state.student.isTeacher) {
            userAvatar.innerHTML = '<i class="fa-solid fa-chalkboard-user"></i>';
        }
        if (userProfile) userProfile.classList.remove('hidden');

        showToast(`Chào mừng ${finalName} - Lớp ${finalClass} đến với bài học Speaking Part 03! 🚀`);
        if (window.confetti) {
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        }
    }

    if (startBtn) {
        startBtn.onclick = handleLogin;
    }

    // Hỗ trợ phím Enter để đăng nhập nhanh
    if (nameInput) {
        nameInput.onkeypress = (e) => {
            if (e.key === 'Enter') {
                if (classInput && !classInput.value.trim()) {
                    classInput.focus();
                } else {
                    handleLogin();
                }
            }
        };
    }
    if (classInput) {
        classInput.onkeypress = (e) => {
            if (e.key === 'Enter') {
                handleLogin();
            }
        };
    }
}

// Theme
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    if (state.theme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-theme');
            state.theme = isDark ? 'dark' : 'light';
            localStorage.setItem('vstep_sp3_theme', state.theme);
            themeBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        });
    }
}

// Voices & Speech
function initVoices() {
    const voiceSelect = document.getElementById('voice-select');
    const speedSelect = document.getElementById('speed-select');

    function populateVoices() {
        if (!('speechSynthesis' in window)) return;
        const voices = window.speechSynthesis.getVoices();
        if (!voiceSelect) return;
        voiceSelect.innerHTML = '<option value="">🌿 Giọng tự nhiên...</option>';
        voices.filter(v => v.lang.startsWith('en')).forEach(v => {
            const opt = document.createElement('option');
            opt.value = v.voiceURI;
            opt.textContent = v.name + ' (' + v.lang + ')';
            if (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('David')) {
                opt.selected = true;
                state.selectedVoiceURI = v.voiceURI;
            }
            voiceSelect.appendChild(opt);
        });
    }

    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = populateVoices;
        populateVoices();
    }

    if (voiceSelect) {
        voiceSelect.addEventListener('change', (e) => {
            state.selectedVoiceURI = e.target.value;
        });
    }

    if (speedSelect) {
        speedSelect.addEventListener('change', (e) => {
            state.speechRate = parseFloat(e.target.value) || 1.0;
        });
    }
}

// Navigation
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const topTitle = document.getElementById('top-title');
    const mobileToggle = document.getElementById('mobile-toggle');
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');

    window.switchTab = function(targetId) {
        navItems.forEach(i => {
            if (i.getAttribute('data-target') === targetId) {
                i.classList.add('active');
            } else {
                i.classList.remove('active');
            }
        });

        document.querySelectorAll('.tab-pane').forEach(p => {
            p.classList.remove('active');
            p.style.display = '';
        });
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
            targetPane.classList.add('active');
            targetPane.classList.remove('hidden');
            targetPane.style.display = '';
            if (targetId === 'flower-garden' && window.FlowerGarden) {
                window.FlowerGarden.render();
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        const activeItem = document.querySelector(`.nav-item[data-target="${targetId}"]`);
        if (activeItem && topTitle) {
            const titleText = activeItem.querySelector('span') ? activeItem.querySelector('span').innerText : targetId;
            topTitle.innerText = titleText;
        }

        if (sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            if (backdrop) backdrop.classList.remove('open');
        }
    };

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            if (!targetId) return;
            window.switchTab(targetId);
        });
    });

    if (mobileToggle && sidebar && backdrop) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.add('open');
            backdrop.classList.add('open');
        });
        backdrop.addEventListener('click', () => {
            sidebar.classList.remove('open');
            backdrop.classList.remove('open');
        });
    }
}

// Subtab switcher
window.switchSubTab = function(btn, panelId) {
    const parentPane = btn.closest('.tab-pane') || document;
    parentPane.querySelectorAll('.cat-subtab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    parentPane.querySelectorAll('.sub-tab-panel').forEach(p => p.classList.remove('active'));
    const targetPanel = document.getElementById(panelId);
    if (targetPanel) targetPanel.classList.add('active');
};

// Text-to-Speech
window.speakText = function(text, btn) {
    if (!('speechSynthesis' in window)) {
        alert('Trình duyệt của bạn không hỗ trợ tính năng đọc âm thanh!');
        return;
    }
    window.speechSynthesis.cancel();
    if (!text) return;

    // Automatically strip any HTML tags before speech synthesis
    const cleanSpeechText = text.replace(/<[^>]*>/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
    utterance.lang = 'en-US';
    utterance.rate = state.speechRate || 1.0;

    if (state.selectedVoiceURI) {
        const voices = window.speechSynthesis.getVoices();
        const found = voices.find(v => v.voiceURI === state.selectedVoiceURI);
        if (found) utterance.voice = found;
    }

    if (btn) {
        btn.classList.add('speaking');
        utterance.onend = () => btn.classList.remove('speaking');
        utterance.onerror = () => btn.classList.remove('speaking');
    }

    window.speechSynthesis.speak(utterance);
};

window.copyText = function(text) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        showToast('Đã sao chép vào bộ nhớ tạm!');
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Đã sao chép vào bộ nhớ tạm!');
    });
};


window.showOverviewMindmapDetail = function(branchNum) {
    const detailBox = document.getElementById('overview-mm-detail');
    if (!detailBox) return;
    
    const details = {
        1: {
            title: 'Nhánh 1 (Top): Flexible (Tính từ)',
            en: 'One major benefit of online learning is that it is flexible.',
            vi: 'Một lợi ích lớn của việc học trực tuyến là nó rất linh hoạt (về thời gian và địa điểm học tập).',
            expand: 'Because students can study anywhere and at any time they want without traveling.'
        },
        2: {
            title: 'Nhánh 2 (Right): Convenient (Tính từ)',
            en: 'Another benefit is that it is convenient for everyone.',
            vi: 'Một lợi ích khác là việc học trực tuyến rất thuận tiện cho tất cả mọi người.',
            expand: 'Because they just need an internet-connected smartphone or laptop to join classes.'
        },
        3: {
            title: 'Nhánh 3 (Bottom): Money-saving (Tính từ)',
            en: 'One more benefit of online learning is that it is money-saving.',
            vi: 'Thêm một lợi ích nữa là học online giúp tiết kiệm tiền học tập và đi lại.',
            expand: 'In other words, students can save money on bus tickets, meals, and books.'
        },
        4: {
            title: 'Nhánh 4 (Left): [Your own idea] - Easy to review (Tự do)',
            en: 'In addition, students can review the lessons easily.',
            vi: 'Ngoài ra, học sinh có thể xem lại bài học một cách dễ dàng.',
            expand: 'For example, they can watch the lesson videos again whenever they do not understand a part.'
        }
    };
    
    const data = details[branchNum];
    if (!data) return;
    
    detailBox.innerHTML = `
        <div style="background: var(--bg-card); border-left: 4px solid var(--primary); padding: 1.25rem; border-radius: 12px; box-shadow: var(--shadow-sm); margin-top: 1.25rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.5rem;">
                <strong style="color: var(--primary); font-size: 1.05rem;">${data.title}</strong>
                <button class="btn-pill-tts" onclick="speakText('${data.en} ${data.expand}')"><i class="fa-solid fa-volume-high"></i> Nghe</button>
            </div>
            <p style="font-size: 1.05rem; font-weight: 600; color: var(--text-main); margin-bottom: 0.4rem;">${data.en}</p>
            <p style="font-size: 0.95rem; color: var(--text-light); margin-bottom: 0.6rem;">${data.vi}</p>
            <div style="font-size: 0.95rem; color: var(--primary-dark); background: rgba(79, 70, 229, 0.08); padding: 0.5rem 0.85rem; border-radius: 8px;">
                <strong>Câu mở rộng:</strong> ${data.expand}
            </div>
        </div>
    `;
    detailBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

window.toggleTranslation = function(targetId, btn) {
    const el = document.getElementById(targetId);
    if (!el) return;
    const isHidden = el.style.display === 'none' || getComputedStyle(el).display === 'none';
    el.style.display = isHidden ? 'block' : 'none';
    if (btn) {
        if (isHidden) {
            btn.classList.add('active');
            btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Ẩn bản dịch tiếng Việt';
            // Smoothly scroll translation drawer into view if needed
            setTimeout(() => {
                const rect = el.getBoundingClientRect();
                if (rect.bottom > window.innerHeight) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 80);
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '<i class="fa-solid fa-language"></i> Xem bản dịch tiếng Việt';
        }
    }
};

// Interactive Mindmaps
function renderAllMindmaps() {
    document.querySelectorAll('.mindmap-branch-card').forEach(card => {
        card.addEventListener('click', () => {
            const exp = card.querySelector('.branch-expand-content');
            if (exp) {
                const isOpen = exp.style.display === 'block';
                exp.style.display = isOpen ? 'none' : 'block';
                card.classList.toggle('active', !isOpen);
            }
        });
    });
}

// Exam Simulator & Recorder
function initExamSimulator() {
    const topicSelect = document.getElementById('sim-topic-select');
    const randomBtn = document.getElementById('sim-random-btn');
    const startBtn = document.getElementById('sim-start-btn');
    const pauseBtn = document.getElementById('sim-pause-btn');
    const resetBtn = document.getElementById('sim-reset-btn');
    const timeDisplay = document.getElementById('sim-time-display');
    const phasePill = document.getElementById('sim-phase-pill');
    const circleProg = document.getElementById('sim-circle-progress');
    const promptContainer = document.getElementById('sim-prompt-display');
    const recStatus = document.getElementById('sim-rec-status');
    const playerAudio = document.getElementById('sim-audio-player');
    const downloadAudioBtn = document.getElementById('sim-download-audio-btn');

    if (topicSelect) {
        topicSelect.innerHTML = '';
        ALL_TOPICS_POOL.forEach((t, i) => {
            const opt = document.createElement('option');
            opt.value = t.id;
            opt.textContent = '[' + t.categoryName + ' - ' + (t.topicCode || '') + '] ' + t.title;
            topicSelect.appendChild(opt);
        });

        topicSelect.addEventListener('change', () => {
            const found = ALL_TOPICS_POOL.find(t => t.id === topicSelect.value);
            if (found) loadSimTopic(found);
        });
    }

    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            const randIdx = Math.floor(Math.random() * ALL_TOPICS_POOL.length);
            const randTopic = ALL_TOPICS_POOL[randIdx];
            if (topicSelect) topicSelect.value = randTopic.id;
            loadSimTopic(randTopic);
            showToast('Đã chọn ngẫu nhiên chủ đề mới!');
        });
    }

    function loadSimTopic(topic) {
        state.currentSimTopic = topic;
        if (!promptContainer) return;

        const centerTitle = topic.center || topic.central || topic.title || '';
        const branches = topic.branches || [];
        const b1 = branches[0] || { text: '', vi: '', type: 'verb' };
        const b2 = branches[1] || { text: '', vi: '', type: 'verb' };
        const b3 = branches[2] || { text: '', vi: '', type: 'verb' };

        const tagMap = {
            'verb': 'Động từ',
            'adj': 'Tính từ',
            'noun': 'Danh từ',
            'clause': 'Mệnh đề',
            'free': 'Tự do'
        };

        const b1Tag = tagMap[b1.type] || 'Ý chính';
        const b2Tag = tagMap[b2.type] || 'Ý chính';
        const b3Tag = tagMap[b3.type] || 'Ý chính';

        const fuCards = (topic.followups || []).map((f, idx) => {
            const qClean = (f.q || '').replace(/'/g, "\\'");
            return `
                <div class="followup-card" style="background:var(--bg-subtle, #f8fafc); border:1px solid var(--border); border-radius:10px; padding:1.15rem 1.35rem; margin-bottom:1rem;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.75rem;">
                        <div style="flex:1;">
                            <div style="font-weight:700; font-size:0.98rem; color:var(--text-main); line-height:1.75;">
                                <span style="background:var(--primary); color:#ffffff; font-size:0.75rem; font-weight:700; padding:0.18rem 0.55rem; border-radius:4px; margin-right:0.45rem;">CÂU ${idx + 1}</span>
                                ${f.q}
                            </div>
                            <div style="font-size:0.88rem; color:var(--text-muted); margin-top:0.45rem; line-height:1.7;">↳ Dịch: ${f.vi || f.qVi || ''}</div>
                        </div>
                        <button class="practice-act-btn" onclick="speakText('${qClean}', this)" style="padding:0.25rem 0.65rem; font-size:0.8rem; flex-shrink:0;">
                            <i class="fa-solid fa-volume-high"></i> Nghe câu hỏi
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        promptContainer.innerHTML = `
            <div style="background: var(--bg-subtle); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 1.25rem 1.5rem; margin-bottom: 1.25rem;">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--primary); text-transform: uppercase;">${topic.categoryName || ''}</span>
                <h3 style="font-size: 1.25rem; margin: 0.35rem 0 0.5rem; color: var(--text-main);">${topic.title || ''}</h3>
                ${topic.titleVi ? `<div style="font-size: 0.92rem; color: var(--text-muted); font-style: italic;">${topic.titleVi}</div>` : ''}
            </div>

            <!-- Mindmap Box Chuẩn VSTEP 4 Hướng -->
            <div class="mindmap-vstep-container" style="background:var(--bg-card); border:1.5px solid var(--border); border-radius:12px; box-shadow:none; padding:1.25rem 0.85rem; margin:0.85rem 0;">
                <div class="mindmap-cross-grid">
                    <div class="grid-top">
                        <div class="mm-node-card">
                            <div class="mm-node-badge">1</div>
                            <div class="mm-node-title">${b1.text || ''}</div>
                            <div class="mm-node-vi">${b1.vi || ''}</div>
                            <span class="mm-node-type-tag tag-${b1.type || 'verb'}">${b1Tag}</span>
                        </div>
                    </div>
                    <div class="grid-left">
                        <div class="mm-node-card" style="border-style:dashed; border-color:var(--amber);">
                            <div class="mm-node-badge" style="background:var(--amber);">4</div>
                            <div class="mm-node-title">[Your own idea]</div>
                            <div class="mm-node-vi">Ý kiến riêng của bạn</div>
                            <span class="mm-node-type-tag tag-free">Tự do</span>
                        </div>
                    </div>
                    <div class="grid-center">
                        <div class="mm-hub-box">
                            <span class="mm-hub-label">Chủ đề</span>
                            ${centerTitle}
                        </div>
                    </div>
                    <div class="grid-right">
                        <div class="mm-node-card">
                            <div class="mm-node-badge">2</div>
                            <div class="mm-node-title">${b2.text || ''}</div>
                            <div class="mm-node-vi">${b2.vi || ''}</div>
                            <span class="mm-node-type-tag tag-${b2.type || 'verb'}">${b2Tag}</span>
                        </div>
                    </div>
                    <div class="grid-bottom">
                        <div class="mm-node-card">
                            <div class="mm-node-badge">3</div>
                            <div class="mm-node-title">${b3.text || ''}</div>
                            <div class="mm-node-vi">${b3.vi || ''}</div>
                            <span class="mm-node-type-tag tag-${b3.type || 'verb'}">${b3Tag}</span>
                        </div>
                    </div>
                </div>

                <!-- Câu hỏi mở rộng đi cùng sơ đồ tư duy (KHÔNG CÓ ĐÁP ÁN SẴN) -->
                <div class="mindmap-followups-section" style="margin-top:2rem; border-top:1.5px dashed var(--border); padding-top:1.25rem;">
                    <div class="mindmap-followups-header" style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;">
                        <i class="fa-solid fa-comments" style="color:var(--primary);"></i>
                        <span>CÂU HỎI MỞ RỘNG (FOLLOW-UP QUESTIONS):</span>
                    </div>
                    <div class="mindmap-fu-list">
                        ${fuCards}
                    </div>
                </div>
            </div>
        `;
    }

    if (ALL_TOPICS_POOL.length > 0) loadSimTopic(ALL_TOPICS_POOL[0]);

    // Timer Controls
    const CIRCUMFERENCE = 565;
    function updateTimerUI() {
        const mins = Math.floor(state.simTimer.timeLeft / 60);
        const secs = state.simTimer.timeLeft % 60;
        if (timeDisplay) timeDisplay.innerText = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');

        if (circleProg) {
            const offset = CIRCUMFERENCE - (state.simTimer.timeLeft / state.simTimer.totalTime) * CIRCUMFERENCE;
            circleProg.style.strokeDashoffset = offset;
        }
    }

    function playBeep(freq = 600, duration = 300) {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            osc.start();
            osc.stop(ctx.currentTime + duration / 1000);
        } catch (e) {}
    }

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            if (state.simTimer.phase === 'ready' || state.simTimer.phase === 'done') {
                state.simTimer.phase = 'prep';
                state.simTimer.timeLeft = 60;
                state.simTimer.totalTime = 60;
                if (phasePill) {
                    phasePill.className = 'phase-pill prep';
                    phasePill.innerText = 'Chuẩn bị (1 phút)';
                }
                if (circleProg) circleProg.style.stroke = 'var(--amber)';
                playBeep(440, 400);
                startInterval();
                startBtn.innerHTML = '<i class="fa-solid fa-forward-step"></i> Bỏ qua chuẩn bị';
            } else if (state.simTimer.phase === 'prep') {
                switchToSpeaking();
            }
        });
    }

    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            if (!state.simTimer.interval) return;
            state.simTimer.isPaused = !state.simTimer.isPaused;
            pauseBtn.innerHTML = state.simTimer.isPaused ? '<i class="fa-solid fa-play"></i> Tiếp tục' : '<i class="fa-solid fa-pause"></i> Tạm dừng';
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            clearInterval(state.simTimer.interval);
            state.simTimer.interval = null;
            state.simTimer.phase = 'ready';
            state.simTimer.timeLeft = 60;
            state.simTimer.totalTime = 60;
            state.simTimer.isPaused = false;
            if (phasePill) {
                phasePill.className = 'phase-pill ready';
                phasePill.innerText = 'Sẵn sàng';
            }
            if (circleProg) {
                circleProg.style.stroke = 'var(--primary)';
                circleProg.style.strokeDashoffset = 0;
            }
            if (startBtn) startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Bắt đầu làm bài';
            if (pauseBtn) pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Tạm dừng';
            stopRecording();
            updateTimerUI();
        });
    }

    function startInterval() {
        if (state.simTimer.interval) clearInterval(state.simTimer.interval);
        state.simTimer.interval = setInterval(() => {
            if (state.simTimer.isPaused) return;

            if (state.simTimer.timeLeft > 0) {
                state.simTimer.timeLeft--;
                updateTimerUI();
            } else {
                if (state.simTimer.phase === 'prep') {
                    switchToSpeaking();
                } else if (state.simTimer.phase === 'speaking') {
                    finishExam();
                }
            }
        }, 1000);
    }

    function switchToSpeaking() {
        state.simTimer.phase = 'speaking';
        state.simTimer.timeLeft = 240;
        state.simTimer.totalTime = 240;
        if (phasePill) {
            phasePill.className = 'phase-pill speaking';
            phasePill.innerText = 'Đang trình bày (4 phút)';
        }
        if (circleProg) circleProg.style.stroke = 'var(--emerald)';
        playBeep(880, 800);
        showToast('Hết giờ chuẩn bị! Bắt đầu 4 phút nói.');
        startRecording();
        if (startBtn) startBtn.innerHTML = '<i class="fa-solid fa-check"></i> Nộp bài sớm';
    }

    function finishExam() {
        clearInterval(state.simTimer.interval);
        state.simTimer.interval = null;
        state.simTimer.phase = 'done';
        if (phasePill) {
            phasePill.className = 'phase-pill done';
            phasePill.innerText = 'Hoàn thành';
        }
        if (circleProg) circleProg.style.stroke = 'var(--rose)';
        playBeep(523, 1000);
        stopRecording();
        showToast('Đã hết giờ làm bài!');
        if (window.confetti) {
            confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        }
    }

    // Audio Recorder
    function startRecording() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            if (recStatus) recStatus.innerText = 'Trình duyệt không hỗ trợ micro thu âm.';
            return;
        }

        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            state.audioRecorder.mediaRecorder = new MediaRecorder(stream);
            state.audioRecorder.audioChunks = [];

            state.audioRecorder.mediaRecorder.ondataavailable = e => {
                if (e.data.size > 0) state.audioRecorder.audioChunks.push(e.data);
            };

            state.audioRecorder.mediaRecorder.onstop = () => {
                state.audioRecorder.audioBlob = new Blob(state.audioRecorder.audioChunks, { type: 'audio/webm' });
                state.audioRecorder.audioUrl = URL.createObjectURL(state.audioRecorder.audioBlob);
                if (playerAudio) {
                    playerAudio.src = state.audioRecorder.audioUrl;
                    playerAudio.style.display = 'block';
                }
                if (downloadAudioBtn) {
                    downloadAudioBtn.style.display = 'inline-flex';
                    downloadAudioBtn.onclick = () => {
                        const a = document.createElement('a');
                        a.href = state.audioRecorder.audioUrl;
                        a.download = 'SpeakingPart3_' + (state.student.name || 'Student') + '.webm';
                        a.click();
                    };
                }
                if (recStatus) recStatus.innerHTML = '<i class="fa-solid fa-circle-check" style="color:var(--emerald);"></i> Đã lưu file ghi âm bài nói!';
            };

            state.audioRecorder.mediaRecorder.start();
            if (recStatus) recStatus.innerHTML = '<div class="recording-dot"></div> Đang ghi âm bài nói qua Micro...';
        }).catch(err => {
            console.error('Mic access error:', err);
            if (recStatus) recStatus.innerText = 'Không thể kết nối Micro (Vui lòng cấp quyền)';
        });
    }

    function stopRecording() {
        if (state.audioRecorder.mediaRecorder && state.audioRecorder.mediaRecorder.state === 'recording') {
            state.audioRecorder.mediaRecorder.stop();
        }
    }
}

// Flashcards
function initFlashcards() {
    const cardEl = document.getElementById('flashcard-box');
    const prevBtn = document.getElementById('card-prev-btn');
    const nextBtn = document.getElementById('card-next-btn');
    const shuffleBtn = document.getElementById('card-shuffle-btn');
    const speakBtn = document.getElementById('card-speak-btn');
    const counterEl = document.getElementById('card-counter');

    const catBadge = document.getElementById('card-cat-badge');
    const frontText = document.getElementById('card-front-text');
    const backText = document.getElementById('card-back-text');
    const backEx = document.getElementById('card-back-example');

    function updateCard() {
        if (FLASHCARDS_DATA.length === 0) return;
        const cur = FLASHCARDS_DATA[state.cardIndex];
        if (cardEl) cardEl.classList.remove('flipped');
        if (catBadge) catBadge.innerText = cur.cat;
        if (frontText) frontText.innerText = cur.front;
        if (backText) backText.innerText = cur.back;
        if (backEx) backEx.innerText = 'Ví dụ: ' + cur.ex;
        if (counterEl) counterEl.innerText = (state.cardIndex + 1) + ' / ' + FLASHCARDS_DATA.length;
    }

    if (cardEl) {
        cardEl.addEventListener('click', () => cardEl.classList.toggle('flipped'));
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            state.cardIndex = (state.cardIndex - 1 + FLASHCARDS_DATA.length) % FLASHCARDS_DATA.length;
            updateCard();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            state.cardIndex = (state.cardIndex + 1) % FLASHCARDS_DATA.length;
            updateCard();
        });
    }

    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', () => {
            for (let i = FLASHCARDS_DATA.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [FLASHCARDS_DATA[i], FLASHCARDS_DATA[j]] = [FLASHCARDS_DATA[j], FLASHCARDS_DATA[i]];
            }
            state.cardIndex = 0;
            updateCard();
            showToast('Đã xáo trộn danh sách thẻ!');
        });
    }

    if (speakBtn) {
        speakBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const cur = FLASHCARDS_DATA[state.cardIndex];
            speakText(cur.front);
        });
    }

    updateCard();
}

// Toast
function showToast(msg) {
    const existing = document.querySelector('.toast-msg');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = '<i class="fa-solid fa-circle-check" style="color:#10b981;"></i> ' + msg;
    document.body.appendChild(toast);
    setTimeout(() => {
        if (toast && toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3000);
}


// ==========================================================================
// TOPIC COMPLETION TRACKER & PROGRESS BACKUP/RESTORE SYSTEM
// ==========================================================================
const ALL_PRACTICE_TOPIC_IDS = [
    'b-topic-01', 'b-topic-02', 'b-topic-03', 'b-topic-04', 'b-topic-05',
    'b-topic-06', 'b-topic-07', 'b-topic-08', 'b-topic-09', 'b-topic-10',
    'b-topic-11', 'b-topic-12', 'b-topic-13', 'b-topic-14', 'b-topic-15',
    'b-topic-16', 'b-topic-17', 'b-topic-18', 'b-topic-19',
    'd-topic-01', 'd-topic-02', 'd-topic-03', 'd-topic-04', 'd-topic-05', 'd-topic-06',
    'd-topic-07', 'd-topic-08', 'd-topic-09',
    'c-topic-01', 'c-topic-02', 'c-topic-03', 'c-topic-04', 'c-topic-05', 'c-topic-06',
    'c-topic-07', 'c-topic-08', 'c-topic-09', 'c-topic-10',
    'w-topic-01', 'w-topic-02', 'w-topic-03', 'w-topic-04', 'w-topic-05',
    'w-topic-06', 'w-topic-07', 'w-topic-08', 'w-topic-09',
    'w-topic-10', 'w-topic-11', 'w-topic-12',
    'q-topic-01', 'q-topic-02', 'q-topic-03', 'q-topic-04', 'q-topic-05', 'q-topic-06',
    'f-topic-01', 'f-topic-02', 'f-topic-03'
];

const GROUP_CONFIG = {
    'b': { name: 'Nhóm Lợi Ích', total: 15 },
    'd': { name: 'Nhóm Bất Lợi', total: 6 },
    'c': { name: 'Nhóm Nguyên Nhân', total: 6 },
    'w': { name: 'Nhóm Cách Thức', total: 9 },
    'q': { name: 'Nhóm Đặc Điểm', total: 6 },
    'f': { name: 'Nhóm Yếu Tố', total: 3 }
};

function getCompletedTopics() {
    try {
        const raw = localStorage.getItem('vstep_sp3_completed_topics');
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
            const validSet = new Set(ALL_PRACTICE_TOPIC_IDS);
            return parsed.filter(id => validSet.has(id));
        }
    } catch (e) {
        console.warn('Could not read completed topics from localStorage', e);
    }
    return [];
}

function saveCompletedTopics(topicsArray) {
    try {
        const unique = Array.from(new Set(topicsArray)).filter(id => ALL_PRACTICE_TOPIC_IDS.includes(id));
        localStorage.setItem('vstep_sp3_completed_topics', JSON.stringify(unique));
        const sName = localStorage.getItem('vstep_student_name');
        if (sName) {
            const safeKey = 'vstep_sp3_completed_' + sName.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
            localStorage.setItem(safeKey, JSON.stringify(unique));
        }
    } catch (e) {
        console.warn('Could not save completed topics to localStorage', e);
    }
}

function getTopicDisplayName(tid) {
    const card = document.getElementById('card-' + tid);
    if (card) {
        const badge = card.querySelector('.practice-code-badge');
        if (badge) return badge.innerText.trim();
    }
    return tid;
}

window.toggleTopicComplete = function(tid, event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    const current = getCompletedTopics();
    const idx = current.indexOf(tid);
    const dispName = getTopicDisplayName(tid);

    if (idx > -1) {
        current.splice(idx, 1);
        saveCompletedTopics(current);
        showToast('Đã bỏ đánh dấu: ' + dispName);
    } else {
        current.push(tid);
        saveCompletedTopics(current);
        showToast('Đã hoàn thành: ' + dispName + ' 🎉');
    }

    renderTopicCompletionUI();
};

window.renderTopicCompletionUI = function() {
    const completedList = getCompletedTopics();
    const completedSet = new Set(completedList);

    // 1. Update each topic card & complete button
    ALL_PRACTICE_TOPIC_IDS.forEach(tid => {
        const card = document.getElementById('card-' + tid);
        if (!card) return;

        const isDone = completedSet.has(tid);
        card.classList.toggle('topic-completed', isDone);

        // Update button
        const btn = document.getElementById('btn-comp-' + tid) || card.querySelector('.btn-complete-topic');
        if (btn) {
            btn.classList.toggle('is-completed', isDone);
            if (isDone) {
                btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span class="complete-btn-label">Đã hoàn thành</span>';
                btn.title = 'Nhấn để hủy đánh dấu hoàn thành';
            } else {
                btn.innerHTML = '<i class="fa-regular fa-circle-check"></i> <span class="complete-btn-label">Chưa học</span>';
                btn.title = 'Đánh dấu đã hoàn thành đề này';
            }
        }

        // Update completed tag next to badge in card top
        const cardTop = card.querySelector('.practice-card-top');
        if (cardTop) {
            let tag = cardTop.querySelector('.topic-completed-tag');
            if (isDone) {
                if (!tag) {
                    tag = document.createElement('span');
                    tag.className = 'topic-completed-tag';
                    tag.innerHTML = '<i class="fa-solid fa-check"></i> ĐÃ HOÀN THÀNH';
                    const badge = cardTop.querySelector('.practice-code-badge');
                    if (badge && badge.nextSibling) {
                        cardTop.insertBefore(tag, badge.nextSibling);
                    } else {
                        cardTop.appendChild(tag);
                    }
                }
            } else {
                if (tag) tag.remove();
            }
        }
    });

    // 2. Update Group Counters & Ratios
    Object.keys(GROUP_CONFIG).forEach(grp => {
        const total = GROUP_CONFIG[grp].total;
        const grpDone = completedList.filter(id => id.startsWith(grp + '-')).length;
        const grpPct = Math.round((grpDone / total) * 100);

        // Sidebar badge
        const navBadge = document.getElementById('nav-count-' + grp);
        if (navBadge) navBadge.innerText = `${grpDone}/${total}`;

        // Practice section header pill
        const progText = document.getElementById('group-prog-text-' + grp);
        if (progText) progText.innerText = `${grpDone}/${total} hoàn thành`;

        // Filter counts
        const doneCnt = document.getElementById(`filter-cnt-${grp}-done`);
        if (doneCnt) doneCnt.innerText = grpDone;
        const leftCnt = document.getElementById(`filter-cnt-${grp}-left`);
        if (leftCnt) leftCnt.innerText = total - grpDone;

        // Overview dashboard group card
        const pdRatio = document.getElementById('pd-ratio-' + grp);
        if (pdRatio) pdRatio.innerText = `${grpDone}/${total}`;
        const pdFill = document.getElementById('pd-fill-' + grp);
        if (pdFill) pdFill.style.width = `${grpPct}%`;
    });

    // 3. Update Overall Progress (Overview Dashboard & Sidebar Widget)
    const totalDone = completedList.length;
    const totalAll = ALL_PRACTICE_TOPIC_IDS.length;
    const totalPct = Math.round((totalDone / totalAll) * 100);

    // Overview Dashboard
    const pdDoneCount = document.getElementById('pd-done-count');
    if (pdDoneCount) pdDoneCount.innerText = totalDone;
    const pdDonePercent = document.getElementById('pd-done-percent');
    if (pdDonePercent) pdDonePercent.innerText = `${totalPct}% Hoàn thành`;
    const pdBarFill = document.getElementById('pd-bar-fill');
    if (pdBarFill) pdBarFill.style.width = `${totalPct}%`;

    // Sidebar Widget
    const spwPercent = document.getElementById('sidebar-prog-percent');
    if (spwPercent) spwPercent.innerText = `${totalPct}%`;
    const spwFill = document.getElementById('sidebar-prog-fill');
    if (spwFill) spwFill.style.width = `${totalPct}%`;
    const spwRatio = document.getElementById('sidebar-prog-ratio');
    if (spwRatio) spwRatio.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${totalDone}/${totalAll} đề`;

    // Modal stats
    const modalTopics = document.getElementById('backup-stat-topics');
    if (modalTopics) modalTopics.innerText = `${totalDone} / ${totalAll} đề (${totalPct}%)`;
    const modalUser = document.getElementById('backup-stat-user');
    if (modalUser) modalUser.innerText = localStorage.getItem('vstep_student_name') || 'Guest';

    // Update backup code preview textarea if present
    const codeArea = document.getElementById('backup-code-textarea');
    if (codeArea) {
        try {
            codeArea.value = JSON.stringify(getBackupPayload(), null, 2);
        } catch(e) {}
    }
};

window.filterGroupTopics = function(groupPrefix, mode, btn) {
    const header = btn.closest('.practice-section-header');
    if (header) {
        header.querySelectorAll('.filter-tab-btn').forEach(b => b.classList.remove('active'));
    }
    btn.classList.add('active');

    const completedSet = new Set(getCompletedTopics());
    ALL_PRACTICE_TOPIC_IDS.forEach(tid => {
        if (!tid.startsWith(groupPrefix + '-')) return;
        const card = document.getElementById('card-' + tid);
        if (!card) return;

        const isDone = completedSet.has(tid);
        if (mode === 'all') {
            card.style.display = '';
        } else if (mode === 'completed') {
            card.style.display = isDone ? '' : 'none';
        } else if (mode === 'incomplete') {
            card.style.display = !isDone ? '' : 'none';
        }
    });
};

// ==========================================================================
// BACKUP & RESTORE MODAL SYSTEM
// ==========================================================================
window.getBackupPayload = function() {
    const completed = getCompletedTopics();
    const studentName = localStorage.getItem('vstep_student_name') || 'Học viên';
    const systemData = {};
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && (k.startsWith('flower_') || k.startsWith('vstep_'))) {
                systemData[k] = localStorage.getItem(k);
            }
        }
    } catch(e) {}

    return {
        app: "VSTEP Speaking Part 3 - B1 Online",
        author: "English with Miss Nguyet",
        version: "1.0",
        exportDate: new Date().toISOString(),
        studentName: studentName,
        completedTopics: completed,
        totalCompleted: completed.length,
        totalTopics: ALL_PRACTICE_TOPIC_IDS.length,
        systemData: systemData
    };
};

window.openBackupModal = function(initialTab = 'export') {
    const overlay = document.getElementById('backup-modal-overlay');
    if (!overlay) return;
    overlay.style.display = 'flex';
    switchBackupTab(initialTab);
    renderTopicCompletionUI();
};

window.closeBackupModal = function() {
    const overlay = document.getElementById('backup-modal-overlay');
    if (overlay) overlay.style.display = 'none';
};

window.switchBackupTab = function(tabName) {
    const tabExportBtn = document.getElementById('tab-btn-export');
    const tabImportBtn = document.getElementById('tab-btn-import');
    const contentExport = document.getElementById('backup-content-export');
    const contentImport = document.getElementById('backup-content-import');

    if (tabName === 'export') {
        if (tabExportBtn) tabExportBtn.classList.add('active');
        if (tabImportBtn) tabImportBtn.classList.remove('active');
        if (contentExport) contentExport.classList.add('active');
        if (contentImport) contentImport.classList.remove('active');
        const codeArea = document.getElementById('backup-code-textarea');
        if (codeArea) codeArea.value = JSON.stringify(getBackupPayload(), null, 2);
    } else {
        if (tabImportBtn) tabImportBtn.classList.add('active');
        if (tabExportBtn) tabExportBtn.classList.remove('active');
        if (contentImport) contentImport.classList.add('active');
        if (contentExport) contentExport.classList.remove('active');
    }
};

window.downloadBackupFile = function() {
    const payload = getBackupPayload();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    const now = new Date();
    const dateStr = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `tien_do_speaking_b1_${dateStr}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    showToast('Đã tải file sao lưu về máy thành công! 📥');
};

window.copyBackupCode = function() {
    const payload = getBackupPayload();
    const codeStr = JSON.stringify(payload, null, 2);
    const codeArea = document.getElementById('backup-code-textarea');
    if (codeArea) {
        codeArea.value = codeStr;
        codeArea.select();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(codeStr).then(() => {
            showToast('Đã sao chép mã sao lưu vào bộ nhớ tạm! 📋');
        }).catch(() => {
            showToast('Vui lòng copy thủ công từ khung mã.');
        });
    } else {
        showToast('Vui lòng copy thủ công từ khung mã.');
    }
};

window.handleBackupFileUpload = function(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const parsed = JSON.parse(e.target.result);
            applyBackupPayload(parsed);
            event.target.value = '';
        } catch (err) {
            alert('Lỗi đọc file: File tải lên không đúng định dạng JSON hoặc bị hỏng.\n' + err.message);
        }
    };
    reader.readAsText(file);
};

window.restoreFromCode = function() {
    const codeArea = document.getElementById('restore-code-textarea');
    if (!codeArea || !codeArea.value.trim()) {
        alert('Vui lòng dán chuỗi mã sao lưu JSON vào khung trước khi khôi phục!');
        return;
    }
    try {
        const parsed = JSON.parse(codeArea.value.trim());
        applyBackupPayload(parsed);
        codeArea.value = '';
    } catch (err) {
        alert('Lỗi mã sao lưu: Chuỗi dán vào không hợp lệ hoặc thiếu thông tin.\n' + err.message);
    }
};

window.applyBackupPayload = function(payload) {
    if (!payload || typeof payload !== 'object') {
        throw new Error('Dữ liệu không đúng định dạng đối tượng JSON.');
    }
    if (!Array.isArray(payload.completedTopics)) {
        throw new Error('Không tìm thấy danh sách chủ đề hoàn thành (completedTopics) trong dữ liệu.');
    }

    // 1. Restore completed topics
    saveCompletedTopics(payload.completedTopics);

    // 2. Restore student name if valid
    if (payload.studentName && payload.studentName !== 'Học viên' && payload.studentName !== 'Guest') {
        localStorage.setItem('vstep_student_name', payload.studentName);
        const nameEl = document.getElementById('display-name');
        if (nameEl) nameEl.innerText = payload.studentName;
    }

    // 3. Restore system data (flower garden, etc.) if provided
    if (payload.systemData && typeof payload.systemData === 'object') {
        Object.entries(payload.systemData).forEach(([k, val]) => {
            if (val !== null && val !== undefined) {
                try {
                    localStorage.setItem(k, typeof val === 'string' ? val : JSON.stringify(val));
                } catch(e) {}
            }
        });
    }

    // 4. Update UI live
    renderTopicCompletionUI();
    if (window.FlowerGarden && typeof window.FlowerGarden.render === 'function') {
        try { window.FlowerGarden.render(); } catch(e) {}
    }

    showToast(`Đã khôi phục thành công ${payload.completedTopics.length} chủ đề đã học! 🎉`);
    setTimeout(() => {
        closeBackupModal();
    }, 1200);
};

window.resetProgress = function() {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ đánh dấu tiến độ học tập không?\n(Gợi ý: Bạn nên tải file sao lưu trước khi xóa để có thể khôi phục lại khi cần).')) {
        saveCompletedTopics([]);
        renderTopicCompletionUI();
        showToast('Đã đặt lại tiến độ học tập!');
    }
};

function initTopicCompletion() {
    // Render UI initially
    renderTopicCompletionUI();

    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeBackupModal();
    });
}
