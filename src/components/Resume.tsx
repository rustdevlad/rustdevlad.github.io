"use client"
import { Download, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

export default function Resume() {
    const resumeRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isHtml2pdfReady, setIsHtml2pdfReady] = useState(false);

    useEffect(() => {
        import('html2pdf.js').then(() => {
            setIsHtml2pdfReady(true);
        });
    }, []);

    const handleDownloadPDF = async () => {
        if (!resumeRef.current || !isHtml2pdfReady) return;

        setIsGenerating(true);

        try {
            const html2pdfModule = await import('html2pdf.js');
            const html2pdf = html2pdfModule.default || html2pdfModule;

            const element = resumeRef.current;

            const opt = {
                margin: 10,
                filename: 'Vladislav_Podolyako_Resume.pdf',
                image: { type: 'jpeg' as const, quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    letterRendering: true,
                },
                jsPDF: {
                    unit: 'mm' as const,
                    format: 'a4' as const,
                    orientation: 'portrait' as const
                }
            };

            await html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Actions */}
                <div className="mb-6 flex justify-between items-center">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Назад к Портфолио</span>
                    </Link>

                    <button
                        onClick={handleDownloadPDF}
                        disabled={isGenerating || !isHtml2pdfReady}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Generating...</span>
                            </>
                        ) : (
                            <>
                                <Download className="w-4 h-4" />
                                <span>Скачать резюме PDF</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Resume Content */}
                <div
                    ref={resumeRef}
                    className="shadow-lg"
                    style={{
                        width: '210mm',
                        minHeight: '297mm',
                        margin: '0 auto',
                        backgroundColor: '#ffffff',
                        color: '#111827'
                    }}
                >
                    {/* Header */}
                    <div style={{ borderBottom: '4px solid #1f2937', padding: '2rem' }}>
                        <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
                            Владислав Подоляко
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#4b5563' }}>
                            Full Stack разработчик
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', padding: '2rem' }}>
                        {/* Left Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Personal Info */}
                            <div>
                                <h2 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid #d1d5db' }}>
                                    Личная информация
                                </h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#374151' }}>
                                    <span style={{ fontSize: '0.875rem' }}>✉</span>
                                    <span style={{ wordBreak: 'break-all' }}>christian.vlad.felpy@gmail.com</span>
                                </div>
                            </div>

                            {/* Skills */}
                            <div>
                                <h2 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid #d1d5db' }}>
                                    Навыки
                                </h2>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <tbody>
                                        {[
                                            { name: 'HTML/CSS', level: 90 },
                                            { name: 'React/Vue', level: 75 },
                                            { name: 'Tailwind CSS', level: 80 },
                                            { name: 'Git/GitHub', level: 85 },
                                            { name: 'JavaScript', level: 70 },
                                            { name: 'Веб-оптимизация', level: 85 },
                                            { name: 'Адаптивный дизайн', level: 80 },
                                            { name: 'Командная работа', level: 70 },
                                            { name: 'Cross-Browser', level: 85 },
                                            { name: 'TypeScript', level: 40 },
                                        ].map((skill) => (
                                            <tr key={skill.name}>
                                                <td style={{ paddingBottom: '8px', verticalAlign: 'top' }}>
                                                    <div style={{ fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                                                        {skill.name}
                                                    </div>
                                                    <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '6px', position: 'relative' }}>
                                                        <div
                                                            style={{
                                                                backgroundColor: '#1f2937',
                                                                height: '6px',
                                                                borderRadius: '9999px',
                                                                width: `${skill.level}%`,
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0
                                                            }}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Summary */}
                            <div>
                                <h2 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid #d1d5db' }}>
                                    Краткое содержание
                                </h2>
                                <p style={{ fontSize: '0.75rem', color: '#374151', lineHeight: '1.625', textAlign: 'justify' }}>
                                    Динамичный полнофункциональный разработчик с более чем годовым опытом создания привлекательных и адаптивных веб-приложений, посвятивший себя улучшению пользовательского опыта с помощью инновационных решений. Владение JavaScript и NextJS в сочетании с упором на адаптивный дизайн позволяет создавать визуально привлекательные и функциональные интерфейсы. Активно участвует в проектах с открытым исходным кодом, демонстрируя приверженность совместной разработке и постоянному совершенствованию. Стремится внести свой вклад в творческую командную среду, которая ценит инновации и автономность, одновременно решая сложные задачи и совершенствуя технические навыки в рамках важных проектов.
                                </p>
                            </div>

                            {/* Work Experience */}
                            <div>
                                <h2 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid #d1d5db' }}>
                                    Опыт работы
                                </h2>

                                {/* Job 1 */}
                                <div style={{ marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>
                                        Разработчик C# Full Stack, IT Lux (частичная занятость)
                                    </h3>
                                    <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                                        Октябрь 2023 г. - Июнь 2024 г.
                                    </p>
                                    <div style={{ fontSize: '0.75rem', color: '#374151', marginLeft: '0.5rem' }}>
                                        <p style={{ marginBottom: '0.125rem' }}>• Разработал бэкэнд и фронтэнд функции для настольного приложения голосового помощника с использованием C# и .NET.</p>
                                        <p style={{ marginBottom: '0.125rem' }}>• Интегрированное распознавание речи с использованием Vosk API для моделирования голоса и обработки команд.</p>
                                        <p style={{ marginBottom: '0.125rem' }}>• Разработал и реализовал компоненты пользовательского интерфейса для настольного приложения.</p>
                                        <p style={{ marginBottom: '0.125rem' }}>• Работал с базой данных PostgreSQL для хранения данных и логики приложения.</p>
                                        <p style={{ marginBottom: '0.125rem' }}>• Участвовал в планировании функций, отладке и оптимизации кода.</p>
                                        <p style={{ marginBottom: '0.125rem' }}>• Сотрудничал с командой по тестированию и улучшению производительности и стабильности приложения.</p>
                                    </div>
                                </div>

                                {/* Job 2 */}
                                <div>
                                    <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>
                                        Разработчик C# Full Stack, Оскемен Водоканал (Полная занятость)
                                    </h3>
                                    <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                                        Август 2024 г. - Январь 2025 г.
                                    </p>
                                    <div style={{ fontSize: '0.75rem', color: '#374151', marginLeft: '0.5rem' }}>
                                        <p style={{ marginBottom: '0.125rem' }}>• Разработал и поддерживал полнофункциональное приложение на C# для управления потреблением воды в масштабах города.</p>
                                        <p style={{ marginBottom: '0.125rem' }}>• Работал с внутренним API и базой данных PostgreSQL, в которой хранились большие объемы данных о клиентах и счетах.</p>
                                        <p style={{ marginBottom: '0.125rem' }}>• Исправлены критические ошибки и переработан устаревший код для повышения производительности и надежности системы.</p>
                                        <p style={{ marginBottom: '0.125rem' }}>• Внедрены улучшения в бизнес-логику для расчета потребления холодной и горячей воды для каждого дома.</p>
                                        <p style={{ marginBottom: '0.125rem' }}>• Помогал в тестировании, отладке и развертывании обновлений приложений.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Education */}
                            <div>
                                <h2 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid #d1d5db' }}>
                                    Образование
                                </h2>
                                <div>
                                    <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>
                                        Высший колледж Казахстанского-Американского Свободного Университета, ИТ (программист-разработчик)
                                    </h3>
                                    <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                        Сентябрь 2021 г. - Июнь 2024 г.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}