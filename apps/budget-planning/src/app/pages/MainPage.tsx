import { Disclosure, Menu, Popover, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { FoodExpenses } from './FoodExpenses';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Step = 'START' | 'EAT' | 'HOME';

export const MainPage = () => {
  const [step, setStep] = useState<Step>('START');

  return (
    <>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Plan your budget
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {step === 'START' && <div>Start</div>}
            {step === 'EAT' && <FoodExpenses />}
            {step === 'HOME' && <div>Home</div>}

            <button onClick={() => setStep('EAT')}>Start</button>
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
};
