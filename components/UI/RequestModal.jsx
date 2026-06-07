"use client";

import { useActionState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X, Check } from "lucide-react";

import Button from "@/components/UI/Button";
import { submitRequest } from "@/app/actions";

const TYPE_OPTIONS = [
  { id: "message", label: "Сообщение" },
  { id: "purchase", label: "Покупка" },
  { id: "consultation", label: "Консультация" },
];

/**
 * Универсальное модальное окно заявки/обратной связи.
 *
 * props:
 *  - open, onClose
 *  - title, subtitle, badge — тексты шапки
 *  - defaultType — тип заявки ("purchase" | "consultation" | "message")
 *  - allowTypeSelect — показывать ли выбор типа обращения
 *  - presetComment — предзаполненный комментарий
 *  - submitText — текст кнопки
 */
const RequestModal = ({
  open,
  onClose,
  title = "Оставить заявку",
  subtitle = "Менеджер свяжется с вами в ближайшее время.",
  badge = "Заявка",
  defaultType = "message",
  allowTypeSelect = false,
  presetComment = "",
  submitText = "Отправить заявку",
}) => {
  const [state, formAction, isPending] = useActionState(submitRequest, {
    ok: false,
  });

  // Закрываем окно автоматически через короткую паузу после успеха
  useEffect(() => {
    if (state?.ok) {
      const timer = setTimeout(() => onClose(), 1800);
      return () => clearTimeout(timer);
    }
  }, [state, onClose]);

  return (
    <Dialog open={open} onClose={onClose} className="relative z-[120]">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="fixed inset-0 overflow-y-auto p-3 sm:p-5">
        <div className="flex min-h-full items-end justify-center sm:items-center">
          <DialogPanel className="relative w-full max-w-xl overflow-hidden rounded-t-4xl bg-white shadow-2xl sm:rounded-4xl">
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-dark10 text-dark transition hover:bg-accent hover:text-white"
              aria-label="Закрыть форму"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="max-h-[calc(100dvh-24px)] overflow-y-auto p-5 sm:max-h-[calc(100dvh-40px)] sm:p-7">
              {state?.ok ? (
                <div className="flex flex-col items-center gap-4 py-10 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Check className="h-8 w-8" />
                  </span>

                  <h3 className="text-2xl font-medium text-dark">
                    Заявка отправлена
                  </h3>

                  <p className="max-w-sm text-sm leading-relaxed text-dark60">
                    Спасибо! Менеджер свяжется с вами в ближайшее время.
                  </p>
                </div>
              ) : (
                <>
                  <div className="pr-12">
                    <span className="mb-4 inline-flex rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                      {badge}
                    </span>

                    <DialogTitle className="text-2xl font-medium leading-tight text-dark sm:text-3xl">
                      {title}
                    </DialogTitle>

                    <p className="mt-3 text-sm leading-relaxed text-dark60">
                      {subtitle}
                    </p>
                  </div>

                  <form action={formAction} className="mt-6 grid gap-3">
                    {allowTypeSelect ? (
                      <fieldset className="grid gap-2">
                        <span className="text-sm text-dark60">Тип обращения</span>

                        <div className="flex flex-wrap gap-2">
                          {TYPE_OPTIONS.map((option, index) => (
                            <label
                              key={option.id}
                              className="cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="type"
                                value={option.id}
                                defaultChecked={
                                  defaultType
                                    ? option.id === defaultType
                                    : index === 0
                                }
                                className="peer sr-only"
                              />
                              <span className="inline-flex rounded-full border border-dark/15 bg-white px-4 py-2 text-sm text-dark transition peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white hover:border-accent/40">
                                {option.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    ) : (
                      <input type="hidden" name="type" value={defaultType} />
                    )}

                    <label className="grid gap-2">
                      <span className="text-sm text-dark60">Ваше имя</span>

                      <input
                        type="text"
                        name="name"
                        placeholder="Иван"
                        required
                        className="h-12 rounded-2xl border border-dark/10 bg-white px-4 text-dark outline-none transition focus:border-accent"
                      />
                    </label>

                    <label className="grid gap-2">
                      <span className="text-sm text-dark60">Телефон</span>

                      <input
                        type="tel"
                        name="phone"
                        placeholder="+7 ___ ___-__-__"
                        required
                        className="h-12 rounded-2xl border border-dark/10 bg-white px-4 text-dark outline-none transition focus:border-accent"
                      />
                    </label>

                    <label className="grid gap-2">
                      <span className="text-sm text-dark60">Комментарий</span>

                      <textarea
                        name="comment"
                        rows={3}
                        defaultValue={presetComment}
                        placeholder="Ваш вопрос или пожелание"
                        className="resize-none rounded-2xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none transition focus:border-accent"
                      />
                    </label>

                    {state?.error ? (
                      <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                        {state.error}
                      </p>
                    ) : null}

                    <div className="mt-3">
                      <Button
                        type="submit"
                        text={submitText}
                        variant="accent"
                        size="md"
                        fullWidth
                        isLoading={isPending}
                      />
                    </div>

                    <p className="text-center text-xs leading-relaxed text-dark50">
                      Нажимая кнопку, вы соглашаетесь на обработку контактных данных.
                    </p>
                  </form>
                </>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default RequestModal;
