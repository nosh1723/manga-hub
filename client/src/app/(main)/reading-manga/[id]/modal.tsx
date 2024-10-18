import { Chapter } from "@/models/manga";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

type Props = {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    chapters: Array<Chapter>,
    currentChapterIndex: number | undefined
}

const SpringModal = ({ isOpen, setIsOpen, chapters, currentChapterIndex }: Props) => {
    const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

    
    const handleScrollToChapter = () => {
        const chapterElement = chapterRefs.current[currentChapterIndex!];
        if (chapterElement) {
          chapterElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
    }
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        onAnimationComplete={handleScrollToChapter}
                        className="bg-gradient-to-br from-[--dark-cus-900] to-slate-900 text-white p-3 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
                    >
                        <div className="max-h-80 overflow-y-auto scroll-smooth custom-scrollbar-v2">
                            <div className="flex flex-col gap-1">
                                {chapters && chapters.map((chapter, index: number) => (
                                    <div key={'modal-chapter' + chapter.id} ref={(el) => { chapterRefs.current[index] = el; }}>
                                        <Link
                                            href={'/reading-manga/' + chapter.id}
                                            className={`overflow-hidden block px-2 rounded-sm hover:bg-violet-600 ${currentChapterIndex === index ? 'bg-violet-600' : 'bg-transparent'}`}
                                        >Chap. {chapter.attributes.chapter}{chapter.attributes.title ? ": " + chapter.attributes.title : ""}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SpringModal