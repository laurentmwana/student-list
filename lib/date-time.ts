export const ago = (
    dateParse?: string | Date | number,
    options: {
        short?: boolean;
        withSuffix?: boolean;
        fullText?: boolean;
    } = {},
): string | null => {
    if (!dateParse) {
        return null;
    }

    const { short = true, withSuffix = true, fullText = false } = options;
    const date = new Date(dateParse);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 0) {
        return 'dans le futur';
    }

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    const suffix = withSuffix ? (fullText ? ' ago' : '') : '';

    const fullLabels = {
        seconds: 'secondes',
        minutes: 'minutes',
        hours: 'heures',
        days: 'jours',
        weeks: 'semaines',
        months: 'mois',
        years: 'ans',
    };

    const shortLabels = {
        seconds: 's',
        minutes: 'min',
        hours: 'h',
        days: 'j',
        weeks: 'sem',
        months: 'mois',
        years: 'an',
    };

    const labels = short ? shortLabels : fullLabels;

    const getUnitLabel = (
        value: number,
        unit: keyof typeof fullLabels,
    ): string => {
        if (!fullText) return labels[unit];

        if (unit === 'months' || unit === 'years') {
            return labels[unit];
        }

        return value > 1 ? labels[unit] : labels[unit].replace(/s$/, '');
    };

    if (diffInSeconds < 60) {
        const value = diffInSeconds;
        const unit = getUnitLabel(value, 'seconds');
        return fullText
            ? `il y a ${value} ${unit}`
            : `${value}${unit}${suffix}`;
    }

    if (minutes < 60) {
        const value = minutes;
        const unit = getUnitLabel(value, 'minutes');
        return fullText
            ? `il y a ${value} ${unit}`
            : `${value}${unit}${suffix}`;
    }

    if (hours < 24) {
        const value = hours;
        const unit = getUnitLabel(value, 'hours');
        return fullText
            ? `il y a ${value} ${unit}`
            : `${value}${unit}${suffix}`;
    }

    if (days < 7) {
        const value = days;
        const unit = getUnitLabel(value, 'days');
        return fullText
            ? `il y a ${value} ${unit}`
            : `${value}${unit}${suffix}`;
    }

    if (weeks < 4) {
        const value = weeks;
        const unit = getUnitLabel(value, 'weeks');
        return fullText
            ? `il y a ${value} ${unit}`
            : `${value}${unit}${suffix}`;
    }

    if (months < 12) {
        const value = months;
        const unit = getUnitLabel(value, 'months');
        return fullText
            ? `il y a ${value} ${unit}`
            : `${value}${unit}${suffix}`;
    }

    const value = years;
    const unit = getUnitLabel(value, 'years');
    return fullText ? `il y a ${value} ${unit}` : `${value}${unit}${suffix}`;
};

export const formatDate = (
    dateString: string | Date,
    locale: string = 'fr-FR',
    options?: Intl.DateTimeFormatOptions,
): string => {
    const date =
        typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString(locale, options);
};

export const formatTime = (
    dateString: string | Date,
    locale: string = 'fr-FR',
): string => {
    const date =
        typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const formatDateTime = (
    dateString: string | Date,
    locale: string = 'fr-FR',
    options?: Intl.DateTimeFormatOptions,
): string => {
    const date =
        typeof dateString === 'string' ? new Date(dateString) : dateString;

    const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    return date.toLocaleDateString(locale, options || defaultOptions);
};

export const parseToDateString = (dateString: string | Date): string => {
    const instance =
        typeof dateString === 'string' ? new Date(dateString) : dateString;

    const year = instance.getFullYear();
    const month = String(instance.getMonth() + 1).padStart(2, '0');
    const day = String(instance.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};

export const isYesterday = (date: Date): boolean => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
    );
};

export const getRelativeDateLabel = (
    date: Date | string,
    locale: string = 'fr-FR',
): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isToday(dateObj)) {
        return locale === 'fr-FR' ? "Aujourd'hui" : 'Today';
    }

    if (isYesterday(dateObj)) {
        return locale === 'fr-FR' ? 'Hier' : 'Yesterday';
    }

    return formatDate(dateObj, locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// Version simplifiée qui utilise le paramètre locale
export const formatMessageTime = (
    date: Date | string,
    locale: string = 'fr-FR',
): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
    });
};
