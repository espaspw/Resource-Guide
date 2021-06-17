# Chinese IME (Input Method Editor)
## Explanation
There’s two main methods to write chinese. A phonetic-based method and a shape-based method. A pronunciation-based, used in PRC, requires no extra effort to learn alongside the learning the pinyin system. Stroke-based methods require a few weeks to learn the rules and practice, but in exchange: are Chinese-language-variant neutral, are easy to type characters without prior knowledge of their reading (eg. an image with no text), reinforces character writing memory (tends to atrophy due to typing), and may support character variants depending on the method. Both are roughly equally fast when you reading/production are relatively quick, and you can set a shortcut to switch between traditional and simplified. 

## Types of Stroke-based Systems
- **[Cangjie (倉頡)](https://en.wikipedia.org/wiki/Cangjie_input_method)**- Unintuitive codes, complicated rules, traditional-focused but simplified support was added later. Used in Hong Kong and Taiwan. Typically three to five keypresses per characters
- **[Sucheng (速成)](https://en.wikipedia.org/wiki/Simplified_Cangjie)** or Quick/Simplified Cangjie - Same as Cangjie but with the only the first and last codes. Likely the most used input method by natives in Hong Kong and Taiwan, especially on phones.
- **[Zhengma (郑码)](https://www.chinese-forums.com/forums/topic/44073-zhengma-chinese-input-method/)** - Created post-Cangjie and designed to be logical and consistent. Designed to support both simplified and traditional, and even supports character variant. Typically four keypresses per character.
- **[Wubi (五笔字型)](https://en.wikipedia.org/wiki/Wubi_method)** - Shares a history Zhengma, designed to be more logical and consistent than Cangjie. Simplified-focused but also supports traditional. Typically four keypresses per character.

- **[Boshiamy](https://en.wikipedia.org/wiki/Boshiamy_method)** - Proprietary. Supposedly the fastest method.
- **[Dayi](https://en.wikipedia.org/wiki/Dayi_method)** - Similar to Cangjie but shift key usage to expand the number keys to support more components.
- **Wubihua** - `Incomplete` Not to be confused with Wubi.
- **Sijiao** - `Incomplete`

I recommend Wubi if for general use or Zhengma. More detailed descriptions and Advice by Gareth can be found [here](https://pastebin.com/g84ir1VW).

## Software
### Phonetic-based
Typically input methods do not support tone discrimination on default, but some methods do have the option to enable it. For Mandarin there are Pinyin and Zhuyin methods. For Cantonese, some methods support Jyutping, Yale, or both. 

- **System installed [ZH]**
    - [Windows](https://www.howtogeek.com/howto/12578/add-keyboard-languages-to-xp-vista-and-windows-7/) - For Windows 7, you want to find “Chinese Simplified (PRC) → Microsoft Pinyin New Experience Input St.” You can switch between Traditional and Simplified, and even assign that to a shortcut key. On [Windows 10](https://pinyinjoe.com/windows-10/windows-10-pinyin-setup.htm), you can simply add Pinyin via `Settings -> Time & Language -> Region & Language -> Add a language`.
    - [Mac](http://www.languagegeek.com/keyboard_general/mac_installation1.html)
    - [Linux](http://www.pinyinjoe.com/linux/ubuntu-10-chinese-input-pinyin-chewing.htm)
- **[Rime](http://rime.im/) [CA][ZH]** - Multi-OS Support. Allows for installed dictionaries.
- **[Google Input](https://www.google.com/intl/zh-CN/ime/pinyin/) [ZH]** - Supports both simplified and traditional. I imagine it has better character recognition but need an opinion of someone who has used this.
- **CAP [CA]** - `Dead?` Multi-OS support, Yale or Similar to Rime in terms of dictionary. 
- **[CPIME](http://www.cpime.hk/p/cantonese-pinyin-input-software.html?lang=en)** Jyutping and Yale phonetic input for Cantonese.
- **[FHL Taigi-Hakka IME](http://taigi.fhl.net/TaigiIME/)**

### Shape-based
You can use Zdic to lookup codes for Cangjie, Wubi, and Zhengma.

- **System installed** Windows supports Cangjie, Sucheng, and Zhengma (pre-Win8).
- **[Rime](http://rime.im/) [倉頡][五笔][郑码]** - Due to its support of custom dictionaries. You can add Wubi and Zhengma
- **[Sogou](https://pinyin.sogou.com/)** - Has a modes for Mandarin Pinyin, Wubi, and both input and displays the Wubi codes. Though it supports continuous typing, typos will match to nearest character.
- **[FreeWB](http://www.freewb.org/)** [五笔] - Use to be the best Wubi input method. Not sure about now, but if you don’t trust Sougou as a company here is your alternative.

## Linux
Unlike the Apple and Windows systems where it’s a two part process, Linux distributions separate the input system into three parts: **keymapping**, **input method frameworks**, and **IME**. 

**Keymapping** (xev and xmodmap) remaps keyboard signals to other keys or commands (so quite hardware specific), useful for when your keyboard is a different layout from a standard US keyboard for example. 

An **input method framework** is the intermediary for input method editors (IMEs), of which there are two popular ones for linux: **iBus**, **fcitx**, etc. 

Finally the **IME** is a specific implementation of a keyboard for specific to the language. You can have several IMEs for a single language.

I’d recommend installing **fcitx** and installing either the **Google Pinyin IME** or **Rime.io IME**. **iBus** and **fcitx** are setup so that you swap between a main and secondary IME. You can toggle between two of them with a keyboard shortcut. When you’ve toggled on the secondary IME, you can the cycle between all the extra IMEs that you have installed (if you have more than two).
