"use client";

import { useState } from "react";

import Button from "@/components/UI/Button";
import RequestModal from "@/components/UI/RequestModal";

// Кнопка, открывающая модалку обратной связи (как «Сообщение» в футере).
const MessageButton = ({
  text = "Связаться",
  variant = "accent",
  size = "md",
  className = "",
  fullWidth = false,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        text={text}
        variant={variant}
        size={size}
        className={className}
        fullWidth={fullWidth}
        onClick={() => setOpen(true)}
      />

      <RequestModal
        open={open}
        onClose={() => setOpen(false)}
        badge="Обратная связь"
        title="Оставить сообщение"
        subtitle="Напишите нам — менеджер свяжется с вами по указанному телефону."
        defaultType="message"
        allowTypeSelect
        submitText="Отправить сообщение"
      />
    </>
  );
};

export default MessageButton;
