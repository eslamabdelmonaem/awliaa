import { Form, FormInstance, Select } from 'antd';
import { useStepperContext } from '../../contexts/StepperContext';
import { useTranslation } from 'react-i18next';
import useGetCountries from '@component/hooks/useGetCountries';
import useGetCities from '@component/hooks/useGetCities';
import useAddPersonalInfo from '@component/hooks/useAddPersonalInfo';
import { useAuth } from '@component/contexts/AuthContext';

export type UserResidence = {
  nationality: string;
  country: string;
  city: string;
};
export default function GeneralInformation({ form }: { form: FormInstance }) {
  const { updateStepData, currentStep, setCurrentStep } = useStepperContext();
  const { token } = useAuth();
  const handleSuccess = () => {
    setCurrentStep(currentStep + 1);
  };
  const { personalInfoMutation } = useAddPersonalInfo(handleSuccess, token);
  const { t: translate, i18n } = useTranslation('common');
  const selectedCountryId = Form.useWatch('country', form);
  const { countries } = useGetCountries(token);
  const { cities } = useGetCities(selectedCountryId, token);
  const onFinish = async (values: UserResidence) => {
    const selectedCountry = countries?.find((country) => country.id.toString() === values.country);
    const selectedCity = cities?.find((city) => city.id.toString() === values.city);
    const countryName = selectedCountry ? selectedCountry.name_en : '';
    const cityName = selectedCity ? selectedCity.name_en : '';
    const userPersonalData = {
      nationality: values.nationality,
      country: countryName,
      city: cityName,
    };
    updateStepData(userPersonalData);

    personalInfoMutation.mutateAsync(userPersonalData);
  };
  return (
    <Form onFinish={onFinish} requiredMark="optional" form={form} layout="vertical" className="form-container">
      <div className="form-item-wrapper w-[100%]">
        <Form.Item
          label={translate('nationality')}
          name="nationality"
          rules={[{ required: true, message: translate('please select your nationality') }]}
          className="user-info-select w-[50%]">
          <Select
            showSearch
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toString()
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toString().toLowerCase())
            }
            placeholder={translate('nationality')}>
            <Select.Option value="sample">Sample</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={translate('residence country')}
          name="country"
          className="user-info-select w-[50%]"
          rules={[{ required: true, message: translate('please select country') }]}>
          <Select
            direction={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            showSearch
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toString()
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toString().toLowerCase())
            }
            placeholder={translate('residence country')}>
            {countries &&
              countries.map((country) => (
                <Select.Option
                  key={country.code}
                  value={country.id}
                  label={i18n.language === 'ar' ? country.name_ar : country.name_en}>
                  {i18n.language === 'ar' ? country.name_ar : country.name_en}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </div>
      <Form.Item
        rules={[{ required: true, message: translate('please select city') }]}
        label={translate('residence city')}
        name="city"
        className="user-info-select w-[50%]">
        <Select
          direction={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          showSearch
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '')
              .toString()
              .toLowerCase()
              .localeCompare((optionB?.label ?? '').toString().toLowerCase())
          }
          placeholder={translate('residence city')}>
          {cities &&
            cities.map((city) => (
              <Select.Option
                key={city.code}
                value={city.id}
                label={i18n.language === 'ar' ? city.name_ar : city.name_en}>
                {i18n.language === 'ar' ? city.name_ar : city.name_en}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
    </Form>
  );
}
