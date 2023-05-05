import {useEffect, useState} from 'react'
import Image from 'next/image'
import {Tab} from '@headlessui/react'
import clsx from 'clsx'

import {Container} from '@/components/Container'
import backgroundImage from '@/images/background-features.jpg'
import screenshotExpenses from '@/images/screenshots/expenses.png'
import screenshotPayroll from '@/images/screenshots/payroll.png'
import screenshotReporting from '@/images/screenshots/reporting.png'
import screenshotVatReturns from '@/images/screenshots/vat-returns.png'
// import writing from '@/images/screenshots/writing.mp4'

const features = [
    {
        title: 'Writing Assistant',
        description:
            "With our writing assistant, you'll never have to worry about spelling or grammar again.",
        image: "https://file-newi.oss-cn-qingdao.aliyuncs.com/writing.mp4",
    },
    {
        title: 'Code Assistant',
        description:
            "Our code assistant will help you write code that's easier to read, easier to maintain, and easier to debug.",
        image: "https://file-newi.oss-cn-qingdao.aliyuncs.com/code.mp4",
    },
    {
        title: 'Instant Access',
        description:
            "With our instant access feature, you'll have instant access to all of your prompt, all of the time.",
        image: "https://file-newi.oss-cn-qingdao.aliyuncs.com/code.mp4",
    }
]

export function PrimaryFeatures() {
    let [tabOrientation, setTabOrientation] = useState('horizontal')

    useEffect(() => {
        let lgMediaQuery = window.matchMedia('(min-width: 1024px)')

        function onMediaQueryChange({matches}) {
            setTabOrientation(matches ? 'vertical' : 'horizontal')
        }

        onMediaQueryChange(lgMediaQuery)
        lgMediaQuery.addEventListener('change', onMediaQueryChange)

        return () => {
            lgMediaQuery.removeEventListener('change', onMediaQueryChange)
        }
    }, [])

    return (
        <section
            id="features"
            aria-label="Features for running your books"
            className="relative overflow-hidden bg-gray-900 pb-28 pt-20 sm:py-32"
        >
            <Image
                className="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
                // src={backgroundImage}
                alt=""
                width={2245}
                height={1636}
                unoptimized
            />
            <Container className="relative">
                <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
                    <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
                        Everything you need to run your books.
                    </h2>
                    <p className="mt-6 text-lg tracking-tight text-blue-100">
                        Well everything you need if you aren’t that picky about minor
                        details like tax compliance.
                    </p>
                </div>
                <Tab.Group
                    as="div"
                    className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
                    vertical={tabOrientation === 'vertical'}
                >
                    {({selectedIndex}) => (
                        <>
                            <div
                                className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                                <Tab.List
                                    className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                                    {features.map((feature, featureIndex) => (
                                        <div
                                            key={feature.title}
                                            className={clsx(
                                                'group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6',
                                                selectedIndex === featureIndex
                                                    ? 'bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10'
                                                    : 'hover:bg-white/10 lg:hover:bg-white/5'
                                            )}
                                        >
                                            <h3>
                                                <Tab
                                                    className={clsx(
                                                        'font-display text-lg [&:not(:focus-visible)]:focus:outline-none',
                                                        selectedIndex === featureIndex
                                                            ? 'text-blue-600 lg:text-white'
                                                            : 'text-blue-100 hover:text-white lg:text-white'
                                                    )}
                                                >
                                                    <span
                                                        className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none"/>
                                                    {feature.title}
                                                </Tab>
                                            </h3>
                                            <p
                                                className={clsx(
                                                    'mt-2 hidden text-sm lg:block',
                                                    selectedIndex === featureIndex
                                                        ? 'text-white'
                                                        : 'text-blue-100 group-hover:text-white'
                                                )}
                                            >
                                                {feature.description}
                                            </p>
                                        </div>
                                    ))}
                                </Tab.List>
                            </div>
                            <Tab.Panels className="lg:col-span-7">
                                {features.map((feature) => (
                                    <Tab.Panel key={feature.title} unmount={false}>
                                        <div className="relative sm:px-6 lg:hidden">
                                            <div
                                                className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl"/>
                                            <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                                                {feature.description}
                                            </p>
                                        </div>
                                        <div
                                            className="mt-10 w-[45rem] overflow-hidden rounded-xl  sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                                            <video className="w-10/12 h-1/6" controls>
                                                <source src={feature.image} type="video/mp4"/>
                                                Your browser does not support the video tag.
                                            </video>
                                            {/*<Image*/}
                                            {/*  className="w-full"*/}
                                            {/*  src={feature.image}*/}
                                            {/*  alt=""*/}
                                            {/*  priority*/}
                                            {/*  sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"*/}
                                            {/*/>*/}
                                        </div>
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </>
                    )}
                </Tab.Group>
            </Container>
        </section>
    )
}
